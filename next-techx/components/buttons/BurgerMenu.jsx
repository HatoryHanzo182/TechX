import React, { useState} from 'react';
import { Smartphone, Apple, Laptop, Gamepad2, Camera, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    icon: Smartphone,
    label: "Smartphones",
    items: [
      {
        icon: Apple,
        label: "Apple",
        href: "/smartphones/apple",
        products: [
          { name: "iPhone 12", href: "/smartphones/apple/iphone-12" },
          { name: "iPhone 11", href: "/smartphones/apple/iphone-11" },
          { name: "iPhone XR", href: "/smartphones/apple/iphone-xr" },
          { name: "iPhone XS", href: "/smartphones/apple/iphone-xs" },
          { name: "iPhone 8", href: "/smartphones/apple/iphone-8" },
          { name: "iPhone 7", href: "/smartphones/apple/iphone-7" },
          {
            name: "iPhone SE (2020)",
            href: "/smartphones/apple/iphone-se-2020",
          },
          { name: "iPhone 12 Pro", href: "/smartphones/apple/iphone-12-pro" },
          {
            name: "iPhone 12 Pro Max",
            href: "/smartphones/apple/iphone-12-pro-max",
          },
          { name: "iPhone 11 Pro", href: "/smartphones/apple/iphone-11-pro" },
        ],
      },
      {
        icon: Smartphone,
        label: "Samsung",
        href: "/smartphones/samsung",
        products: [
          { name: "Galaxy S21", href: "/smartphones/samsung/galaxy-s21" },
          {
            name: "Galaxy Note 20",
            href: "/smartphones/samsung/galaxy-note-20",
          },
          { name: "Galaxy S20", href: "/smartphones/samsung/galaxy-s20" },
          { name: "Galaxy S10", href: "/smartphones/samsung/galaxy-s10" },
          {
            name: "Galaxy Note 10",
            href: "/smartphones/samsung/galaxy-note-10",
          },
          {
            name: "Galaxy Z Fold2",
            href: "/smartphones/samsung/galaxy-z-fold2",
          },
          { name: "Galaxy Z Flip", href: "/smartphones/samsung/galaxy-z-flip" },
          { name: "Galaxy A71", href: "/smartphones/samsung/galaxy-a71" },
          { name: "Galaxy A51", href: "/smartphones/samsung/galaxy-a51" },
          { name: "Galaxy S9", href: "/smartphones/samsung/galaxy-s9" },
        ],
      },
      {
        icon: Smartphone,
        label: "Google",
        href: "/smartphones/google",
        products: [
          { name: "Pixel 5", href: "/smartphones/google/pixel-5" },
          { name: "Pixel 4a", href: "/smartphones/google/pixel-4a" },
          { name: "Pixel 4 XL", href: "/smartphones/google/pixel-4-xl" },
          { name: "Pixel 4", href: "/smartphones/google/pixel-4" },
          { name: "Pixel 3a XL", href: "/smartphones/google/pixel-3a-xl" },
          { name: "Pixel 3a", href: "/smartphones/google/pixel-3a" },
          { name: "Pixel 3 XL", href: "/smartphones/google/pixel-3-xl" },
          { name: "Pixel 3", href: "/smartphones/google/pixel-3" },
          { name: "Pixel 2 XL", href: "/smartphones/google/pixel-2-xl" },
          { name: "Pixel 2", href: "/smartphones/google/pixel-2" },
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
        href: "/laptops/apple",
        products: [
          { name: "MacBook Pro", href: "/laptops/apple/macbook-pro" },
          { name: "MacBook Air", href: "/laptops/apple/macbook-air" },
        ],
      },
      {
        icon: Laptop,
        label: "Dell",
        href: "/laptops/dell",
        products: [
          { name: "XPS 15", href: "/laptops/dell/xps-15" },
          { name: "XPS 13", href: "/laptops/dell/xps-13" },
        ],
      },
      {
        icon: Laptop,
        label: "HP",
        href: "/laptops/hp",
        products: [
          { name: "Spectre x360", href: "/laptops/hp/spectre-x360" },
          { name: "Envy 15", href: "/laptops/hp/envy-15" },
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
        href: "/consoles/sony",
        products: [
          { name: "PlayStation 5", href: "/consoles/sony/playstation-5" },
          {
            name: "PlayStation 4 Pro",
            href: "/consoles/sony/playstation-4-pro",
          },
        ],
      },
      {
        icon: Gamepad2,
        label: "Microsoft",
        href: "/consoles/microsoft",
        products: [
          { name: "Xbox Series X", href: "/consoles/microsoft/xbox-series-x" },
          { name: "Xbox Series S", href: "/consoles/microsoft/xbox-series-s" },
        ],
      },
    ],
  },
  {
    icon: Camera,
    label: "Cameras",
    items: [
      {
        icon: Camera,
        label: "Canon",
        href: "/cameras/canon",
        products: [
          { name: "Canon EOS R5", href: "/cameras/canon/eos-r5" },
          { name: "Canon EOS R6", href: "/cameras/canon/eos-r6" },
        ],
      },
    ],
  },
];

const CategoryMenu = ({ category, goBack }) => {
  const [activeBrand, setActiveBrand] = useState(null);

  const handleBrandSelect = (brand) => {
    setActiveBrand(brand);
  };

  return (
    <>
      {!activeBrand ? (
        <>
          <div className='flex items-center w-full border-b border-zinc-700'>
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
              <div className='flex items-center'> 
                {item.icon && React.createElement(item.icon, { className: "h-5 w-5 mr-2" })}
                {item.label}
              </div>
              <ChevronRight className="h-5 w-5" />
            </button>
          ))}
        </>
      ) : (
        <>
          <button
            onClick={() => setActiveBrand(null)}
            className="flex items-center justify-between px-4 py-2 w-full border-b border-zinc-700"
          >
            <div className="flex items-center">
              <ChevronLeft className="h-5 w-5 mr-2" />
              {activeBrand.label}
            </div>
            <a href={activeBrand.href} className="text-gray-400">View all</a>
          </button>
          <div className="">
            {activeBrand.products.map(product => (
              <a
                key={product.name}
                href={product.href}
                className="flex px-4 py-1 items-center px-4 py-2 w-full border-b border-zinc-700"
              >
                {activeBrand.icon && React.createElement(activeBrand.icon, { className: "h-5 w-5 mr-2" }, null)}
                {product.name}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

const BurgerMenu = () => {

const [activeCategory, setActiveCategory] = useState(null);

  const showCategoryItems = (category) => {
    setActiveCategory(category);
  };

  const goBackToCategories = () => {
    setActiveCategory(null);
  };

return (
    <div className="w-full bg-black overflow-y-auto">
      {!activeCategory ? (
        categories.map((category) => (
          <div key={category.label} className="flex justify-between items-center text-white px-4 py-2 border-b border-zinc-700">
            <button  onClick={() => showCategoryItems(category)} className="flex items-center w-full">
              {category.icon && React.createElement(category.icon, { className: "h-5 w-5 mr-2" })}
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
