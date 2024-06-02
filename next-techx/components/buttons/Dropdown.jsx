import {useState , useEffect} from "react";
import { Smartphone, Apple, Laptop, Gamepad2, Cog} from "lucide-react";
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
  { label: "Apple", icon: Apple, endpoints: [
    { name: "Iphone", endpoint: "/GetDataForListProduct/Iphone" },
    { name: "AirPods", endpoint: "/GetDataForListProduct/AirPods" },
    { name: "AppleWatch", endpoint: "/GetDataForListProduct/AppleWatch" },
    { name: "Macbook", endpoint: "/GetDataForListProduct/Macbook" },
    { name: "Ipad", endpoint: "/GetDataForListProduct/Ipad" },
  ]},
  { label: "Samsung", icon: Cog, endpoints: [
    // TODO: Add endpoints for Samsung
    {name: "In progress", endpoint: "" }
  ]},
  { label: "Google", icon: Cog, endpoints: [
    // TODO: Add endpoints for Google
    {name: "In progress", endpoint: "" }
  ]},
  { label: "Consoles", icon: Gamepad2, endpoints: [{ name: "Consoles", endpoint: "/GetDataForListProduct/Console" }] },
];

const DropMenu = () => {
  const [categories, setCategories] = useState([]);

  // INFO: Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        categoriesConfig.map(async (category) => {
          if (!category.endpoints || category.endpoints.length === 0) {
            return { ...category, items: [] };
          }

          const items = await Promise.all(
            category.endpoints.map(async (endpoint) => {
              if(endpoint.name === "In progress") return { name: endpoint.name, products: [] }
              const response = await fetch(`https://techx-server.tech${endpoint.endpoint}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await response.json();
              return { name: endpoint.name, products: data };
            })
          );
          return { ...category, items };
        })
      );
      setCategories(results);
    };

    fetchData();
  }, []);

  // INFO: If data item is empty, show text "In progress"
 return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hidden lg:flex ">
          <MixIcon className="mr-1" height={20} />
          Catalog
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {categories.map((category) => (
          <DropdownMenuGroup key={category.label}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <category.icon className="mr-2 h-4 w-4" />
                {category.label}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="flex flex-wrap flex-col max-h-[500px] overflow-y-auto ml-3">
                  {category.items.map((item) => (
                    <div key={item.name} className="p-1 m-2">
                      <div className="flex flex-col">
                        <DropdownMenuItem as="div" className="w-full text-center">
                          <div className="flex items-center">
                            <category.icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </div>
                          <DropdownMenuSeparator />
                        </DropdownMenuItem>
                        {item.products.map((product) => (
                          <div key={product.id} className="flex pl-2">
                            <a
                              href={`/product-detail?id=${product.id}`}
                              className="py-1 text-sm dark:text-white text-black hover:text-gray-500"
                            >
                              {product.model}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
