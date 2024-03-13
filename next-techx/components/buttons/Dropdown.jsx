import React from "react";
import { Smartphone, Apple, Laptop, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { MixIcon } from "@radix-ui/react-icons";

// INFO: Example Data

const categories = [
  {
    icon: Smartphone,
    label: "SmartPhones",
    items: [
      {
        icon: Apple,
        label: "Apple",
        href: "/smartphones/apple",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ],
      },
      {
        icon: Smartphone,
        label: "Samsung",
        href: "/smartphones/samsung",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ],
      },
      {
        icon: Smartphone,
        label: "Google",
        href: "/smartphones/google",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ],
      },
      {
        icon: Apple,
        label: "Apple",
        href: "/smartphones/apple",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ],
      },
      {
        icon: Smartphone,
        label: "Samsung",
        href: "/smartphones/samsung",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ],
      },
      {
        icon: Smartphone,
        label: "Google",
        href: "/smartphones/google",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ],
      },
    ],
  },
  {
    icon: Laptop,
    label: "Laptops",
    items: [
      {
        icon: Apple,
        label: "Apple",
        href: "/laptop/apple",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ],
      },
      {
        icon: Laptop,
        label: "Samsung",
        href: "/laptop/samsung",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ],
      },
      {
        icon: Laptop,
        label: "Google",
        href: "/laptop/google",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ],
      },
    ],
  },
  {
    icon: Gamepad2,
    label: "Consoles",
    items: [
      {
        icon: Gamepad2,
        label: "Sony",
        href: "/console/google",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ],
      },
    ],
  },
];

const DropMenu = () => {
 return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className='hidden md:inline-flex'>
          <MixIcon className="mr-1" height={20} />
          Catalog
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {categories.map((category, index) => (
          <DropdownMenuGroup key={index}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <category.icon className="mr-2 h-4 w-4" />
                {category.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="ml-2" >
                   { /* <Accordion type="single" collapsible className={`w-full ${
                    category.items.length > 3 ? "inline-grid grid-cols-2 gap-4" : ""
                    }`}> */}
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${itemIndex}`}>
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" /> 
                            {item.label}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.products.map((product, productIndex) => (
                            <div key={productIndex} className="flex items-center">
                              <item.icon className="mr-2 h-4 w-4" /> 
                              <a href={product.href}>{product.name}</a>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {index < categories.length - 1 && <DropdownMenuSeparator />}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropMenu;
