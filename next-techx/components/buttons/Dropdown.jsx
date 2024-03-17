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
} from "@/components/ui/dropdown-menu"; import {
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
        <Button variant="outline" className='hidden lg:flex'>
          <MixIcon className="mr-1" height={20} />
          Catalog
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {categories.map((category, index) => (
          <DropdownMenuGroup key={index}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <category.icon className="mr-2 h-4 w-4" />
                {category.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className={`ml-2 ${category.items.length < 3 ? 'flex justify-center items-center' : 'grid grid-cols-3 gap-4'} gap-4`}>
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className={`p-1 ${category.items.length < 3 ? 'flex-1' : ''}`}>
                      <div className="flex flex-col items-center">
                        <DropdownMenuItem as="div" className="w-full text-center">
                          <div className="flex items-center justify-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.label}
                          </div>
                          <DropdownMenuSeparator />
                        </DropdownMenuItem>
                        {item.products.map((product, productIndex) => (
                          <div className="flex">
                            <a key={productIndex} href={product.href} className="py-1 text-sm text-slate-500 hover:text-white">
                              {product.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
