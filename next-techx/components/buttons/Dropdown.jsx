import { useState, useEffect } from "react";
import { Apple, Gamepad2 } from "lucide-react";
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

import { MixIcon } from "@radix-ui/react-icons";

// INFO: Data from API
const categoriesConfig = [
  { label: Apple, name: "Iphone", endpoint: "/GetDataForListProduct/Iphone" },
  { label: Apple, name: "AirPods", endpoint: "/GetDataForListProduct/AirPods" },
  {
    label: Apple,
    name: "AppleWatch",
    endpoint: "/GetDataForListProduct/AppleWatch",
  },
  { label: Apple, name: "Macbook", endpoint: "/GetDataForListProduct/Macbook" },
  { label: Apple, name: "Ipad", endpoint: "/GetDataForListProduct/Ipad" },
  {
    label: Gamepad2,
    name: "Consoles",
    endpoint: "/GetDataForListProduct/Console",
  },
];

const DropMenu = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        categoriesConfig.map(async (category) => {
          if (!category.endpoint) {
            return { ...category, items: [] };
          }

          const response = await fetch(
            `https://techx-server.tech:443/product/${category.endpoint}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          const data = await response.json();
          return {
            ...category,
            items: [{ name: category.name, products: data }],
          };
        }),
      );
      setCategories(results);
    };

    fetchData();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hidden lg:flex">
          <MixIcon className="mr-1" height={20} />
          Catalog
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {categories.map((category) => (
          <DropdownMenuGroup key={category.label}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {category.name === "Consoles" ? (
                  <Gamepad2 className="mr-2 h-4 w-4" />
                ) : (
                  <Apple className="mr-2 h-4 w-4" />
                )}
                {category.name}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="flex flex-wrap flex-col max-h-[500px] overflow-y-auto ml-3">
                  {category.items[0]?.products.length > 0 ? (
                    category.items[0].products.map((product) => (
                      <div key={product.id} className="flex pl-2">
                        <a
                          href={`/product-detail?id=${product.id}`}
                          className="py-1 text-sm dark:text-white text-black hover:text-gray-500"
                        >
                          {product.model}
                        </a>
                      </div>
                    ))
                  ) : (
                    <div className="py-1 text-sm dark:text-white text-black text-center">
                      In progress
                    </div>
                  )}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropMenu;
