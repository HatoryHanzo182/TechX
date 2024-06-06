import React, { useState, useEffect } from "react";
import {
  Smartphone,
  Apple,
  Laptop,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Cog,
} from "lucide-react";

const categoriesConfig = [
  { label: "Apple", icon: Apple, endpoints: [
    { name: "Iphone", endpoint: "/GetDataForListProduct/Iphone" },
    { name: "AirPods", endpoint: "/GetDataForListProduct/AirPods" },
    { name: "AppleWatch", endpoint: "/GetDataForListProduct/AppleWatch" },
    { name: "Macbook", endpoint: "/GetDataForListProduct/Macbook" },
    { name: "Ipad", endpoint: "/GetDataForListProduct/Ipad" },
  ]},
  { label: "Consoles", icon: Gamepad2, endpoints: [{ name: "Consoles", endpoint: "/GetDataForListProduct/Console" }] },
];

const CategoryMenu = ({ category, goBack }) => {
  const [activeBrand, setActiveBrand] = useState(null);

  useEffect(() => {
    if (category.items.length === 1) {
      setActiveBrand(category.items[0]);
    }
  }, [category.items]);

  const handleBrandSelect = (brand) => {
    setActiveBrand(brand);
  };

  const handleBack = () => {
    if (activeBrand && category.items.length === 1) {
      goBack();
    } else {
      setActiveBrand(null);
    }
  };

  return (
    <>
      {!activeBrand ? (
        <>
          <div className="flex items-center w-full border-b border-zinc-700">
            <button
              onClick={goBack}
              className="flex items-center px-4 py-2 w-full"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              {category.label}
            </button>
          </div>
          {category.items.map((item) => (
            <button
              key={item.label}
              onClick={() => handleBrandSelect(item)}
              className="flex items-center justify-between px-4 py-2 w-full border-b border-zinc-700"
            >
              <div className="flex items-center">
                {item.icon &&
                  React.createElement(item.icon, { className: "h-5 w-5 mr-2" })}
                {item.label}
              </div>
              <ChevronRight className="h-5 w-5" />
            </button>
          ))}
        </>
      ) : (
        <>
          <button
            onClick={handleBack}
            className="flex items-center justify-between px-4 py-2 w-full border-b border-zinc-700"
          >
            <div className="flex items-center">
              <ChevronLeft className="h-5 w-5 mr-2" />
              {activeBrand.label}
            </div>
            <a href={activeBrand.href} className="text-gray-400">
              View all
            </a>
          </button>
          <div className="">
            {activeBrand.products.length > 0 ? (
              activeBrand.products.map((product) => (
                <a
                  key={product.model}
                  href={`/product-detail?id=${product.id}`}
                  className="flex items-center px-4 py-2 w-full border-b border-zinc-700"
                >
                  {activeBrand.icon &&
                    React.createElement(
                      activeBrand.icon,
                      { className: "h-5 w-5 mr-2" },
                      null
                    )}
                  {product.model}
                </a>
              ))
            ) : (
              <div className="flex items-center px-4 py-2 w-full border-b border-zinc-700">
                In progress
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

const BurgerMenu = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

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
              return { name: endpoint.name, label: endpoint.name, products: data };
            })
          );
          return { ...category, items };
        })
      );
      setCategories(results);
    };

    fetchData();
  }, []);

  const showCategoryItems = (category) => {
    setActiveCategory(category);
  };

  const goBackToCategories = () => {
    setActiveCategory(null);
  };

  return (
    <div className="w-full bg-white dark:bg-black overflow-auto max-h-[600px]">
      {!activeCategory ? (
        categories.map((category) => (
          <div
            key={category.label}
            className="flex justify-between items-center text-black dark:text-white px-4 py-2 border-b border-zinc-700"
          >
            <button
              onClick={() => showCategoryItems(category)}
              className="flex items-center w-full"
            >
              {category.icon &&
                React.createElement(category.icon, {
                  className: "h-5 w-5 mr-2",
                })}
              {category.label}
            </button>
            <ChevronRight className="h-5 w-5" />
          </div>
        ))
      ) : (
        <CategoryMenu category={activeCategory} goBack={goBackToCategories} />
      )}
    </div>
  );
};

export default BurgerMenu;
