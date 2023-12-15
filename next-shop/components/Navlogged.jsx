import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { AcmeLogo } from "./buttons/AcmeLogo.jsx";
import { SearchIcon } from "./buttons/SearchIcon.jsx";
import { shopName } from "@/lib/constants.js";

export default function Nav() {
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-1">
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit">{shopName}</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4 font-bold">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>

          {/* <NavbarItem>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button variant="bordered">Category</Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Static Actions">
                <DropdownItem>Iphone</DropdownItem>
                <DropdownItem>Macbook</DropdownItem>
                <DropdownItem>Ipad</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem> */}
          <NavbarItem>
            <Link href="#" aria-current="page" color="foreground">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[25rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Alex Alex"
              size="sm"
              src=""
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="profile" className="h-8 gap-2">
              Profile
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
