"use client";
import React, { useState } from "react";

function ProductSelection() {
  // State for the filters
  const [memoryFilter, setMemoryFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [versionFilter, setVersionFilter] = useState([]);

  // Filter options
  const memoryOptions = ["256GB", "512GB", "1TB"];
  const colorOptions = [
    "Black Titanium",
    "Blue Titanium",
    "Natural Titanium",
    "White Titanium",
  ];
  const versionOptions = ["Global", "e-Sim"];

  // Sample list of products
  const products = [
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max",
      memory: "256GB",
      color: "Blue Titanium",
      originalPrice: 59876,
      discountedPrice: 55699,
    },
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max",
      memory: "256GB",
      color: "Blue Titanium",
      originalPrice: 59876,
      discountedPrice: 55699,
    },
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max",
      memory: "256GB",
      color: "Blue Titanium",
      originalPrice: 59876,
      discountedPrice: 55699,
    },
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max",
      memory: "256GB",
      color: "Blue Titanium",
      originalPrice: 59876,
      discountedPrice: 55699,
    },
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max",
      memory: "256GB",
      color: "Blue Titanium",
      originalPrice: 59876,
      discountedPrice: 55699,
    },
    // ... Add more products here
  ];

  // Handlers for checkbox changes
  const handleCheckboxChange = (filterType, value) => {
    switch (filterType) {
      case "memory":
        setMemoryFilter((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "color":
        setColorFilter((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "version":
        setVersionFilter((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className=" text-white font-sans mt-32">
      <div className="container mx-auto  flex">
        {/* Filters Section on Left */}
        <div className="flex flex-col w-2/3 h-full px-10 pr-4 bg-gray-800 p-4 rounded-lg">
          {/* Memory Filter */}
          <div className="mb-4">
            <div className="mb-2">Объем памяти</div>
            <div className="space-y-2">
              {memoryOptions.map((memory) => (
                <label key={memory} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    onChange={() => handleCheckboxChange("memory", memory)}
                    checked={memoryFilter.includes(memory)}
                  />
                  <span className="ml-2">{memory}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Color Filter */}
          <div className="mb-4">
            <div className="mb-2">КОЛІР ПРИСТРОЮ</div>
            <div className="space-y-2">
              {colorOptions.map((color) => (
                <label key={color} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    onChange={() => handleCheckboxChange("color", color)}
                    checked={colorFilter.includes(color)}
                  />
                  <span className="ml-2">{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Version Filter */}
          <div className="mb-4">
            <div className="mb-2">ВЕРСІЯ</div>
            <div className="space-y-2">
              {versionOptions.map((version) => (
                <label key={version} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    onChange={() => handleCheckboxChange("version", version)}
                    checked={versionFilter.includes(version)}
                  />
                  <span className="ml-2">{version}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section on Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ml-10 gap-4 ">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-700 p-4 rounded-lg">
              <img
                src="https://img.jabko.ua/image/cache/home_cats/image%20154full.png.webp"
                alt={`${product.name} ${product.memory} (${product.color})`}
                className="mb-3"
              />
              <div className="font-bold">{product.name}</div>
              <div className="text-gray-300">
                {product.memory} ({product.color})
              </div>
              <div className="flex justify-between items-center mt-3">
                <div className="text-gray-400 line-through">
                  {product.originalPrice} грн
                </div>
                <div className="text-red-500">
                  {product.discountedPrice} грн
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSelection;
