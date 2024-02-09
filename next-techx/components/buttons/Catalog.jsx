"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Catalog = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[200px] lg:grid-row-[.75fr_1fr]">
              <li>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item Wone</NavigationMenuTrigger>

                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[200px] lg:grid-row-[.75fr_1fr]">
                      <li>1</li>
                      <li>2</li>
                      <li>3</li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </li>
              <li>1</li>

              <li>fkoqfj</li>
              <li>NKSfws</li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Catalog;
