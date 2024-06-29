"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/app/providers";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { PullOutOfSession } from "@/lib/session";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { OrdersTable } from "../OrdersTable";
import { MessageCard } from "../MessageCard";

export function ProfilePage() {
  const { user } = useAuth();
  const [user_favorite, SetUserFavorite] = useState([]);
  const [liked_products, SetLikedProducts] = useState({});
  const [change_name, SetChangeName] = useState(user ? user.name : change_name);
  const [change_phone_number, SetChangePhoneNumber] = useState(
    user && user.phone_number != "null" ? user.phone_number : ""
  );
  const [change_delivery_address, SetDeliveryAddress] = useState(
    user && user.delivery_address != "null" ? user.delivery_address : ""
  );

  useEffect(() => {
    const GetFavorites = async () => {
      const u_data = await PullOutOfSession();
      const favorite_data = [];

      for (const u in u_data.favourites) {
        const formatted_data = await fetch(
          `https://techx-server.tech:443/profile/favorite/GetFavoriteProduct/${u_data.favourites[u]}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (formatted_data.ok) {
          favorite_data.push(await formatted_data.json());

          SetUserFavorite(favorite_data);

          const initial_liked_state = {};

          favorite_data.forEach((item) => {
            initial_liked_state[item.id] = true;
          });

          SetLikedProducts(initial_liked_state);
        }
      }
    };

    GetFavorites();
    console.log(user);
    if (user === null) {
      return <div>Loading...</div>;
    }
  }, []);

  const ToggleLike = async (id, e) => {
    e.preventDefault();

    SetLikedProducts((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));

    const is_liked = liked_products[id];
    const endpoint = is_liked
      ? `DeleteFavoriteProduct/${id}`
      : `AddFavoriteProduct/${id}`;

    await fetch(`https://techx-server.tech:443/profile/favorite/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  const handleChangeName = (event) => {
    SetChangeName(event.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    let input = e.target.value;
    let formatted_input = "+";

    input = input.replace(/\D/g, "");

    if (input.length > 0) formatted_input += input.charAt(0);
    if (input.length > 1) formatted_input += input.charAt(1);
    if (input.length > 2) formatted_input += " (" + input.substr(2, 3);
    if (input.length > 5) formatted_input += ") " + input.substr(5, 7);

    SetChangePhoneNumber(formatted_input);
  };

  const handleDeliveryAddress = (event) => {
    SetDeliveryAddress(event.target.value);
  };

  const ChangeUserData = async () => {
    if (!change_name || !change_phone_number) {
      console.log("Please fill in all required fields.");
      return;
    }

    const response = await fetch(
      "https://techx-server.tech:443/profile/ChangeProfileData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          change_name,
          change_phone_number,
          change_delivery_address,
        }),
      }
    );

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    window.location.reload();
  };

  return (
    <main>
      <div className="pt-20 "></div>
      <Breadcrumb className="px-10 py-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs
        defaultValue="account"
        className="w-full justify-center items-center  px-10 ">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Favourites</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* <div>
                <img
                  src="https://placekitten.com/200/200"
                  alt="Profile"
                  className="w-32 h-32 rounded-full hover:bg-black"
                />
              </div> */}

              {/* Diagog 1 */}
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <div className="flex flex-row">
                  <Input
                    id="name"
                    disabled
                    className="cursor-pointer w-1/2"
                    defaultValue={user ? user.name : ""}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  disabled
                  className="cursor-pointer w-1/2"
                  defaultValue={user ? user.email : ""}
                />
              </div>
              {/* Dialog 2 */}
              <div className="space-y-1">
                <Label htmlFor="number">Phone Number</Label>
                <div className="flex flex-row">
                  <Input
                    id="number"
                    disabled
                    className="cursor-default w-1/2"
                    defaultValue={user ? user.phone_number : ""}
                  />
                </div>
              </div>
              {/* Dialog 3 */}
              <div className="space-y-1">
                <Label htmlFor="address">Delivery Address</Label>
                <div className="flex flex-row">
                  <Input
                    id="address"
                    disabled
                    className="cursor-pointer w-1/2"
                    defaultValue={user ? user.delivery_address : ""}
                  />
                  <Dialog className="p-2">
                    <DialogTrigger asChild></DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Address</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Address
                          </Label>
                          <Input id="address" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Apartment
                          </Label>
                          <Input id="apartment" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            City
                          </Label>
                          <Input id="city" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Country
                          </Label>
                          <Input id="country" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            ZIP code
                          </Label>
                          <Input id="zip" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Dialog className="p-2">
                <DialogTrigger asChild>
                  <Button>Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name-change"
                        value={change_name}
                        onChange={handleChangeName}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Phone Number
                      </Label>
                      <Input
                        id="phone-change"
                        value={change_phone_number}
                        className="col-span-3"
                        onChange={handleChangePhoneNumber}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Delivery Address
                      </Label>
                      <Input
                        id="adress-change"
                        value={change_delivery_address}
                        className="col-span-3"
                        onChange={handleDeliveryAddress}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => ChangeUserData()}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Favourites</CardTitle>
              <CardDescription>
                <>
                  {user_favorite.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ml-10 gap-4">
                      {user_favorite.map((u_f) => (
                        <div key={u_f.id} className="shadow-lg p-4 rounded-lg">
                          <Link
                            href={{
                              pathname: "/product-detail",
                              query: { id: u_f.id },
                            }}>
                            <img
                              src={`https://techx-server.tech:443/product/GetImage/${u_f.images}`}
                              alt={u_f.model}
                              className="mb-3"
                            />
                            <div className="font-bold">{u_f.model}</div>
                            <div className="flex justify-between items-center mt-3">
                              <div className="dark:text-white text-black">
                                {u_f.price} $
                              </div>
                            </div>
                          </Link>
                          <span
                            className="ml-6"
                            onClick={(e) => ToggleLike(u_f.id, e)}>
                            {liked_products[u_f.id] ? (
                              <AiFillHeart size="22" />
                            ) : (
                              <AiOutlineHeart size="22" />
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center text-lg">
                      Manage your favourite products here
                    </p>
                  )}
                </>
              </CardDescription>
            </CardHeader>

            {/* <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" className="w-1/2" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" className="w-1/2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter> */}
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Your order history</CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                <div className="mt-2">
                  <MessageCard />
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default ProfilePage;
