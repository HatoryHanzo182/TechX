"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { IoCartOutline } from "react-icons/io5";

import Link from "next/link";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

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
import { PullOutOfSession } from "../lib/session";
import { signOut } from "next-auth/react";
import { useAuth } from "@/app/providers";

import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Nav() {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const { user, isLoggedIn } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  // Функция для обработки клика
  const handleLinkClick = (e) => {
    e.preventDefault(); // Предотвратите стандартное поведение ссылки
    setMenuOpen(true); // Откройте CommandMenu
  };

  useEffect(() => {
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

      const response = await fetch("http://localhost:3001/RemoveFromSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);

        localStorage.removeItem("token");
        window.location.reload();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // if (isAuthInitializing) {
  //   return (
  //     <Button className="absolute ">
  //       <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
  //       Loading....
  //     </Button>
  //   );
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user_data = await PullOutOfSession();

  //     if (user_data) {
  //       //  <<----- Получили пользователя.
  //       console.log(user_data.name, user_data.email);
  //       setName(user_data.name);
  //       setEmail(user_data.email);
  //       setLoggedIn(true);
  //     } //  <<----- не прошел валилацию.
  //     else {
  //       console.log("FALSE SESSION");
  //       setLoggedIn(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <main>
      <div className="dark:bg-black bg-white">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Link href="/">
                <div className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              /> */}
                  <h1 className="text-black dark:text-white  font-bold text-2xl animate-pulse">
                    techX
                  </h1>
                </div>
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 dark:text-white text-black"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {/* <div className="hidden lg:flex lg:gap-x-12 ">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 dark:text-white text-black hover:text-gray-500 "
                >
                  {item.name}
                </a>
              ))}
            </div> */}
            {isLoggedIn ? (
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <div className="mt-2 mr-3 flex flex-row ">
                  <Link href="/search" onClick={handleLinkClick}>
                    <MagnifyingGlassIcon
                      className="h-6 w-6 mr-2"
                      aria-hidden="true"
                    />
                  </Link>
                  <CommandDialog open={menuOpen} onOpenChange={setMenuOpen}>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions" className="">
                        <CommandItem>
                          <Link className="w-full" href="/">
                            Home
                          </Link>
                        </CommandItem>
                        <CommandItem>
                          <Link className="w-full" href="/profile">
                            Profile
                          </Link>
                        </CommandItem>
                        <CommandItem>
                          <Link className="w-full" href="/">
                            TEST
                          </Link>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </CommandDialog>
                  <Link href="/cart">
                    <IoCartOutline className="h-6 w-6 " aria-hidden="true" />
                  </Link>
                </div>
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    className="flex text-sm  rounded-full md:me-0  "
                  >
                    <span className="sr-only">Open user menu</span>
                    <Avatar>
                      <AvatarImage src="https://github.com/" />
                      <AvatarFallback className="uppercase">
                        {user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </button>

                  {isOpen && (
                    <div className="z-10 absolute right-0 mt-2  divide-y  rounded-lg shadow w-44 bg-[#1d1d1d] dark:divide-[#2f2f2f]">
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
                            <div className="block px-4 py-2  hover:bg-[#2b2b2b] ">
                              Profile
                            </div>
                          </Link>
                        </li>
                        {/* <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Earnings
                          </a>
                        </li> */}
                      </ul>
                      <div className="py-2">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-[#2b2b2b]"
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
                <div className="mt-2 mr-3 flex flex-row ">
                  <Link href="/search" onClick={handleLinkClick}>
                    <MagnifyingGlassIcon
                      className="h-6 w-6 mr-2"
                      aria-hidden="true"
                    />
                  </Link>
                  <CommandDialog open={menuOpen} onOpenChange={setMenuOpen}>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Suggestions" className="">
                        <CommandItem>
                          <Link className="w-full" href="/">
                            Home
                          </Link>
                        </CommandItem>
                        <CommandItem>
                          <Link className="w-full" href="/profile">
                            Profile
                          </Link>
                        </CommandItem>
                        <CommandItem>
                          <Link className="w-full" href="/">
                            TEST
                          </Link>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </CommandDialog>
                  <Link href="/cart">
                    <IoCartOutline className="h-6 w-6 " aria-hidden="true" />
                  </Link>
                </div>
                <div className="relative inline-block text-left">
                  <button
                    onClick={toggleDropdown}
                    className="flex text-sm  rounded-full md:me-0  "
                  >
                    <span className="sr-only">Open user menu</span>
                    <Avatar>
                      <AvatarFallback className="uppercase">
                        {/* {user.name.substring(0, 2)} */}
                      </AvatarFallback>
                    </Avatar>
                  </button>

                  {isOpen && (
                    <div className="z-10 absolute right-0 mt-2  divide-y  rounded-lg shadow w-44 bg-[#1d1d1d] dark:divide-[#2f2f2f]">
                      {/* <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div className="font-medium truncate"></div>
                      </div> */}
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownUserAvatarButton"
                      >
                        <li>
                          <Link href="/signin">
                            <div className="block px-4 py-2  hover:bg-[#2b2b2b] ">
                              Sign in <span>&rarr;</span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                      <div className="py-2">
                        <a
                          href="/signup"
                          className="block px-4 py-2 text-sm  hover:bg-[#2b2b2b]"
                          onClick={handleSignOut}
                        >
                          Sign up <span>&uarr;</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              // <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              //   <Link href="/signin">
              //     <div className="text-sm font-semibold leading-6 border rounded-lg p-2 dark:text-white text-black mr-3 dark:hover:bg-gray-900">
              //       Sign in <span aria-hidden="true">&rarr;</span>
              //     </div>
              //   </Link>
              //   <Link href="/signup">
              //     <div className="text-sm font-semibold leading-6 border rounded-lg p-2 dark:text-white text-black  dark:hover:bg-gray-900">
              //       Sign up <span aria-hidden="true">&uarr;</span>
              //     </div>
              //   </Link>
              // </div>
            )}
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
          >
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto dark:bg-black bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <h1 className="text-white font-bold text-2xl">techX</h1>
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 dark:text-white text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6  divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 dark:text-white text-black"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  {isLoggedIn ? (
                    <div className="py-6 flex flex-1 lg:justify-end">
                      <Link href="/profile">
                        {/* <div className="text-sm font-semibold leading-6 border rounded-xl p-3 dark:text-white text-black mr-3 dark:hover:bg-gray-900"></div> */}
                        <Avatar>
                          <AvatarImage src="https://github.com/" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Link>
                    </div>
                  ) : (
                    <div className="py-6">
                      <Link href="/signin">
                        <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 dark:text-white text-black"></div>
                        Log in
                      </Link>
                      <Link href="/signup">
                        <div className="-mx-3 block cursor-pointer rounded-lg px-3 py-2.5 text-base font-semibold leading-7 dark:text-white text-black">
                          Sign up
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>
      </div>
    </main>
  );
}
