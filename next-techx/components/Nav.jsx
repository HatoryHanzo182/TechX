"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bars3Icon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import { IoCartOutline } from "react-icons/io5";
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
// import { PullOutOfSession } from "../lib/session";
// import { signOut } from "next-auth/react";
import { useAuth } from "@/app/providers";
// import { ReloadIcon } from "@radix-ui/react-icons";
// import { Button } from "@/components/ui/button";
import DropMenu from "./buttons/Dropdown.jsx";
import MobileMenu from "./buttons/BurgerMenu.jsx";
import Cart from "./buttons/Сart";
import { User2Icon, UserCircle } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@radix-ui/react-separator";
import { Input } from "./ui/input.jsx";

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
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const [search_results, SetSearchResults] = useState([]);

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
      } else console.error(data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const OpenCart = () => {
    const Iphone = { img: "IMGING.png", model: "iphone", price: 100.0 };
    const ArrayCoast = [Iphone, Iphone, Iphone, Iphone];

    console.log(ArrayCoast);
    localStorage.setItem("Cart", JSON.stringify(ArrayCoast));
  };

  const handleChangeSerch = (e) => {
    const query = e.target.value.trim();

    if (query === "") return;
    else Search(query);
  };

  const Search = async (q) => {
    search_results.length = 0;

    try {
      const response = await fetch(`http://localhost:3001/SearchForProducts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

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
                    {/* Product entry field. */}
                    {/* <input
                      className=" bg-black text-white px-2 "
                      placeholder="Search..."
                      onChange={handleChangeSerch}
                    /> */}

                    <Input
                      placeholder="Search..."
                      onChange={handleChangeSerch}
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
                                      src={`http://localhost:3001/GetImage/${result.images}`}
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

                  <Link href="#" onClick={OpenCart}>
                    <Cart />
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
                      onChange={handleChangeSerch}
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
                                      src={`http://localhost:3001/GetImage/${result.images}`}
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
                  <Link href="#" className="w-6 h-6 ml-2" onClick={OpenCart}>
                    <Cart />
                  </Link>
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
                    <div className="z-10 absolute right-0 mt-2  divide-y  rounded-lg shadow w-44 bg-[#1d1d1d] dark:divide-[#2f2f2f]">
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
  onClose={setMobileMenuOpen}
>
  <div className="fixed inset-0 bg-black z-50 overflow-hidden" />
  <Dialog.Panel className="fixed inset-0 z-50 overflow-y-auto dark:bg-black bg-white">
    <div className="flex items-center justify-between p-6">
      <a href="#" className="-m-1.5 p-1.5">
        <h1 className="text-white font-bold text-2xl">techX</h1>
      </a>
      {mobileMenuOpen && (
        <button
          type="button"
          className="-m-2.5 rounded-md p-2.5 dark:text-white text-black"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="sr-only">Close menu</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      )}
    </div>
    <div className="p-6">
      <MobileMenu />
      <div className="divide-y divide-gray-500/10">
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
              <Avatar>
                <AvatarImage src="https://github.com/" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        ) : (
          <div className="py-6">
            <Link href="/signin">
              <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 dark:text-white text-black">
                Log in
              </div>
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
