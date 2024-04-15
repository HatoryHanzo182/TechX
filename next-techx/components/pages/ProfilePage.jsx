"use client";
import { React, useState } from "react";

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
import { OrdersTable } from "../OrdersTable";
import { Pencil1Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { Pencil } from "lucide-react";

export function ProfilePage() {
  const { user } = useAuth();
  const [openDialog1, setOpenDialog1] = useState(false);
  return (
    <main>
      <div className="pt-10 mt-20"></div>
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
        className="w-full justify-center items-center  px-10 "
      >
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
                  <Pencil className="m-2 h-4 w-4 dark:text-gray-400 " />
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
                    defaultValue={user ? user.number : ""}
                  />
                  <Pencil className="m-2 h-4 w-4 dark:text-gray-400 " />
                </div>
              </div>

              {/* Dialog 3 */}
              <div className="space-y-1">
                <Label htmlFor="address">Address</Label>
                <div className="flex flex-row">
                  <Input
                    id="address"
                    disabled
                    className="cursor-pointer w-1/2"
                    defaultValue={user ? user.address : ""}
                  />
                  <Dialog className="p-2">
                    <DialogTrigger asChild>
                      <button>
                        <Pencil className="m-2 h-4 w-4 dark:text-gray-400 " />
                      </button>
                    </DialogTrigger>
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
                  <Button variant="outline">Edit Profile</Button>
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
                        id="name"
                        value="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="username"
                        value="peduarte@gmail.com"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
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
                Manage your favourite products here
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
              {/* <CardDescription>Your order history</CardDescription> */}
            </CardHeader>
            <CardContent>
              {/* <p className=" text-gray-500 text-center  text-lg">
                You haven't placed any orders yet.
              </p> */}

              <OrdersTable />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default ProfilePage;
