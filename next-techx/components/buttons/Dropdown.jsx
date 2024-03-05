import React from 'react';
import {
  Smartphone,
  Apple,
  Laptop,
  Gamepad2
} from "lucide-react";
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
} from "@/components/ui/accordion"

// * Example Data

const categories = [
  {
    icon: Smartphone,
    label: "SmartPhones",
    items: [
      { 
        icon: Apple, 
        label: "Apple", 
        href: "/smartphones/apple" ,
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ]
      },
      { 
        icon: Smartphone, 
        label: "Samsung", 
        href: "/smartphones/samsung",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ] 
      },
      { 
        icon: Smartphone, 
        label: "Google", 
        href: "/smartphones/google" , 
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ]  
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
        ] 
      },
      { 
        icon: Laptop,
        label: "Samsung", 
        href: "/laptop/samsung" ,
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ] 
      },
      { 
        icon: Laptop, 
        label: "Google", 
        href: "/laptop/google" ,
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ] 
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
        href: "/console/google" ,
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
        ] 
      },
    ],
  },
];

const DropMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Catalog</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 ml-40">
        {categories.map((category, index) => (
          <DropdownMenuGroup key={index}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <category.icon className="mr-2 h-4 w-4"/>
                <span>{category.label}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {category.items.map((item, itemIndex) => (
                    <DropdownMenuItem key={itemIndex}>
                      <item.icon className="mr-2 h-4 w-4"/>
                      <span>{item.label}</span>
                    </DropdownMenuItem>
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

/*
import React from 'react';
import {
  Smartphone,
  Apple,
  Laptop,
  Gamepad2
} from "lucide-react";
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
} from "@/components/ui/accordion"

// * Example Data

const categories = [
  {
    icon: Smartphone,
    label: "SmartPhones",
    items: [
      { icon: Apple, label: "Apple", href: "/smartphones/apple" },
      { icon: Smartphone, label: "Samsung", href: "/smartphones/samsung" },
      { icon: Smartphone, label: "Google", href: "/smartphones/google" },
    ],
  },
  {
    icon: Laptop,
    label: "Laptops",
    items: [
      { icon: Apple, label: "Apple", href: "/laptop/apple" },
      { icon: Laptop, label: "Samsung", href: "/laptop/samsung" },
      { icon: Laptop, label: "Google", href: "/laptop/google" },
    ],
  },
  {
    icon: Gamepad2,
    label: "Consoles",
    items: [
      { icon: Gamepad2, label: "Sony", href: "/console/google" },
    ],
  },
];

const DropMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Catalog</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 ml-40">
        {categories.map((category, index) => (
          <DropdownMenuGroup key={index}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <category.icon className="mr-2 h-4 w-4"/>
                <span>{category.label}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {category.items.map((item, itemIndex) => (
                    <DropdownMenuItem key={itemIndex}>
                      <item.icon className="mr-2 h-4 w-4"/>
                      <span>{item.label}</span>
                    </DropdownMenuItem>
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
*/