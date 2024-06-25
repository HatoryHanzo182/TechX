"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { useAuth } from "@/app/providers";

import DropMenu from "./buttons/Dropdown.jsx";
import BurgerMenu from "./buttons/BurgerMenu.jsx";
import Cart from "./buttons/Сart";
import {
  User2Icon,
  UserCircle,
  ShoppingCart,
  Building2,
  LayoutGrid,
  Car,
} from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { Input } from "./ui/input.jsx";

const navigation = [
  { name: "Product", href: "#", icon: LayoutGrid },
  { name: "Features", href: "#", icon: LayoutGrid },
  { name: "Marketplace", href: "#", icon: LayoutGrid },
  { name: "Company", href: "#", icon: Building2 },
];

export default function Nav() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const [search_results, SetSearchResults] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (e) => {
    e.preventDefault();

    setMenuOpen(true);
  };

  useEffect(() => {
    search_results.length = 0;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [menuOpen]);

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://techx-server.tech:443/RemoveFromSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        localStorage.removeItem("token");
        localStorage.removeItem("Cart");
        window.location.reload();
      } else console.error(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const OpenCart = () => {
    // const Iphone = { img: "IMGING.png", model: "iphone", price: 100.0 };
    // const ArrayCoast = [Iphone, Iphone, Iphone, Iphone];
    // console.log(ArrayCoast);
    // localStorage.setItem("Cart", JSON.stringify(ArrayCoast));
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value.trim();

    if (query === "") return;
    else Search(query);
  };

  const Search = async (q) => {
    search_results.length = 0;

    try {
      const response = await fetch(
        `https://techx-server.tech:443/SearchForProducts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        },
      );

      const data = await response.json();

      SetSearchResults(data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <main>
      <div className="dark:bg-black bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex items-center lg:flex-1 space-x-4">
              <Link href="/">
                <div className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <h1 className="text-black dark:text-white  font-bold text-2xl animate-pulse">
                    techX
                  </h1>
                </div>
              </Link>
              <DropMenu />
            </div>
            {!mobileMenuOpen && (
              <div className="flex  lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 dark:text-white text-black"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            )}
            {isLoggedIn ? (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <div className="mt-2 mr-2 flex flex-row ">
                  <Link href="/search" onClick={handleLinkClick}>
                    <MagnifyingGlassIcon
                      className="h-6 w-6 mr-2"
                      aria-hidden="true"
                    />
                  </Link>
                  {/*Search window.*/}
                  <CommandDialog open={menuOpen} onOpenChange={setMenuOpen}>
                    <Input
                      placeholder="Search..."
                      onChange={handleChangeSearch}
                    />

                    {/* Search result output. */}
                    {search_results && search_results.length > 0 ? (
                      <CommandGroup>
                        <ScrollArea className="h-72 rounded-md overflow-y-auto">
                          <div className="p-4">
                            {search_results.map((result) => (
                              <React.Fragment key={result._id}>
                                <Link
                                  href={{
                                    pathname: "/product-detail",
                                    query: { id: `${result._id}` },
                                  }}
                                  onClick={() => {
                                    setMenuOpen(false);
                                  }}
                                >
                                  <CommandItem className="">
                                    <img
                                      width="50"
                                      height="50"
                                      src={`https://techx-server.tech:443/GetImage/${result.images}`}
                                      alt="SearchImage"
                                    />
                                    {result.model} / {result.price}$
                                  </CommandItem>
                                </Link>
                                <Separator className="my-2" />
                              </React.Fragment>
                            ))}
                          </div>
                        </ScrollArea>
                      </CommandGroup>
                    ) : (
                      <CommandEmpty>No results found.</CommandEmpty>
                    )}
                  </CommandDialog>

                  <button onClick={OpenCart}>
                    <Cart />
                  </button>
                </div>
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    className="flex text-sm  rounded-full md:me-0  "
                  >
                    <span className="sr-only">Open user menu</span>
                    <Avatar className="p-1">
                      <AvatarImage src="https://github.com/" />
                      <AvatarFallback className="uppercase">
                        {user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                  {isOpen && (
                    <div className="z-10 absolute right-0 mt-2  divide-y  rounded-lg shadow w-44 bg-white dark:bg-[#1d1d1d] dark:divide-[#2f2f2f]">
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{user.name}</div>
                        <div className="font-medium truncate">{user.email}</div>
                      </div>
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownUserAvatarButton"
                      >
                        <li>
                          <Link href="/profile">
                            <div className="block px-4 py-2  hover:text-gray-500 ">
                              Profile
                            </div>
                          </Link>
                        </li>
                      </ul>
                      <div className="py-2">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-red-600 hover:text-red-800"
                          onClick={handleSignOut}
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <div className="mt-2 mr-2 flex flex-row ">
                  <Link
                    href="/search"
                    className="h-6 w-6"
                    onClick={handleLinkClick}
                  >
                    <MagnifyingGlassIcon
                      className="h-6 w-6 mr-2"
                      aria-hidden="true"
                    />
                  </Link>
                  {/*Search window.*/}
                  <CommandDialog
                    className="h-1/2"
                    open={menuOpen}
                    onOpenChange={setMenuOpen}
                  >
                    {/*Product entry field.*/}
                    {/* <input
                      className="border bg-black text-white px-2 rounded-lg"
                      placeholder="Search..."
                      onChange={handleChangeSerch}
                    /> */}
                    <Input
                      placeholder="Search..."
                      onChange={handleChangeSearch}
                    />
                    {/*Search result output.*/}
                    {search_results && search_results.length > 0 ? (
                      <CommandGroup>
                        <ScrollArea className="h-72 rounded-md overflow-y-auto">
                          <div className="p-4 ">
                            {search_results.map((result) => (
                              <React.Fragment key={result._id}>
                                <Link
                                  href={{
                                    pathname: "/product-detail",
                                    query: { id: `${result._id}` },
                                  }}
                                  onClick={() => {
                                    setMenuOpen(false);
                                  }}
                                >
                                  <CommandItem className="">
                                    <img
                                      width="50"
                                      height="50"
                                      src={`https://techx-server.tech:443/GetImage/${result.images}`}
                                      alt="SearchImage"
                                      className="mr-2"
                                    />
                                    {result.model} : {result.price}$
                                  </CommandItem>
                                </Link>
                                <Separator className="my-2" />
                              </React.Fragment>
                            ))}
                          </div>
                        </ScrollArea>
                      </CommandGroup>
                    ) : (
                      <CommandEmpty>No results found.</CommandEmpty>
                    )}
                  </CommandDialog>
                  <button className="w-6 h-6 ml-2" onClick={OpenCart}>
                    <Cart />
                  </button>
                </div>
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    className="flex text-sm  rounded-full md:me-0  "
                  >
                    <span className="sr-only">Open user menu</span>
                    <Avatar className="w-5 h-6 mt-2">
                      <PersonIcon className="h-6 w-5" aria-hidden="true" />
                    </Avatar>
                  </button>

                  {isOpen && (
                    <div className=" absolute right-0 mt-2  divide-y  rounded-lg shadow w-44 bg-white dark:bg-[#1d1d1d] dark:divide-[#2f2f2f]">
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownUserAvatarButton"
                      >
                        <li>
                          <Link href="/signin">
                            <div className="block px-4 py-2  hover:text-gray-500 ">
                              Sign in <span>&rarr;</span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                      <div className="py-2">
                        <a
                          href="/signup"
                          className="block px-4 py-2 text-sm  hover:text-gray-500"
                          // onClick={handleSignOut}
                        >
                          Sign up <span>&uarr;</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          >
            <Dialog.Panel className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-black">
              <div className="flex items-center justify-between p-6">
                <a href="#" className="-m-1.5 p-1.5">
                  <h1 className="text-black dark:text-white font-bold text-2xl">
                    techX
                  </h1>
                </a>
                {/* <ShoppingCart className="fixed top-7 left-24 h-6 w-6 text-zinc-700" /> */}
                {mobileMenuOpen && (
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 dark:text-white text-black"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="size-6" aria-hidden="true" />
                  </button>
                )}
              </div>

              <BurgerMenu />
              {isLoggedIn ? (
                <div className="fixed bottom-0 p-6 w-full border-t border-zinc-700">
                  <div className="divide-y divide-gray-500/10">
                    <div className="flex justify-end items-center">
                      <Link href="/profile">
                        <Avatar className="p-1">
                          <AvatarImage src="https://github.com/" />
                          <AvatarFallback className="uppercase">
                            {user.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="fixed bottom-0 p-6 w-full border-t border-zinc-700">
                  <div className="divide-y divide-gray-500/10">
                    <div className="flex justify-around items-center">
                      <Link
                        href="/signin"
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="rounded-lg text-base font-semibold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                          Sign in &rarr;
                        </div>
                      </Link>
                      <Link
                        href="/signup"
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="rounded-lg text-base font-semibold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                          Sign up &uarr;
                        </div>
                      </Link>
                      <div className="flex flex-row gap-3">
                        <button>
                          <Link
                            href="/search"
                            className="h-6 w-6"
                            onClick={handleLinkClick}
                          >
                            <MagnifyingGlassIcon
                              className="h-6 w-6 "
                              aria-hidden="true"
                            />
                          </Link>
                        </button>
                        <button onClick={OpenCart} className="size-6">
                          <Cart />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </Dialog>
        </header>
      </div>
    </main>
  );
}
