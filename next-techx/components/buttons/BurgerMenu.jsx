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
              {category.label.name}
            </button>
          </div>
          {category.items.map((item) => (
            <button
              key={item.name}
              onClick={() => handleBrandSelect(item)}
              className="flex items-center justify-between px-4 py-2 w-full border-b border-zinc-700"
            >
              <div className="flex items-center">
                {React.createElement(category.label, {
                  className: "h-5 w-5 mr-2",
                })}
                {item.name}
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
              {activeBrand.name}
            </div>
          </button>
          <div className="">
            {activeBrand.products.length > 0 ? (
              activeBrand.products.map((product) => (
                <a
                  key={product.id}
                  href={`/product-detail?id=${product.id}`}
                  className="flex items-center px-4 py-2 w-full border-b border-zinc-700"
                >
                  {React.createElement(category.label, {
                    className: "h-5 w-5 mr-2",
                  })}
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
          if (!category.endpoint) {
            return { ...category, items: [] };
          }

          const response = await fetch(
            `https://techx-server.tech${category.endpoint}`,
            {
              method: "POST",
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
            key={category.name}
            className="flex items-center text-black dark:text-white px-4 py-2 border-b border-zinc-700"
          >
            <button
              onClick={() => showCategoryItems(category)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center">
                {React.createElement(category.label, {
                  className: "h-5 w-5 mr-2",
                })}
                {category.name}
              </div>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ))
      ) : (
        <CategoryMenu category={activeCategory} goBack={goBackToCategories} />
      )}
    </div>
  );
};

export default BurgerMenu;
