import React, { useState, Fragment } from 'react';
import { Transition} from '@headlessui/react';
import { Smartphone, Apple, Laptop, Gamepad2, Camera , ChevronLeft , ChevronRight} from 'lucide-react';

// INFO : Example of categories
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

const MobileMenu = () => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHistory, setMenuHistory] = useState(['main']);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);

  const handleManufacturerClick = (manufacturer) => {
    setActiveMenu(manufacturer.label);
    setMenuHistory(prev => [...prev, manufacturer.label]);
    setSelectedManufacturer(manufacturer);
  };

  const handleGoBack = () => {
    const newHistory = menuHistory.slice(0, menuHistory.length - 1);
    setMenuHistory(newHistory);
    setActiveMenu(newHistory[newHistory.length - 1]);
    if (newHistory.length === 2) {
      setSelectedManufacturer(null);
    }
  };

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {categories.map((category, index) => (
        <Transition
          as={Fragment}
          show={activeMenu === category.label}
          enter="transition ease-out duration-200"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
          key={category.label}
        >
          <div className="space-y-1">
            {menuHistory.length > 1 && (
              <button
                onClick={handleGoBack}
                className="mb-5 flex items-center text-gray-300"
              >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Назад
              </button>
            )}
            {selectedManufacturer ? (
              selectedManufacturer.products.map((product, prodIndex) => (
                <a key={prodIndex} href={product.href} onClick={handleCloseMenu} className="block p-2 hover:bg-gray-700 border-b border-gray-300 flex justify-between">
                  {product.name}
                  <ChevronRight className="h-5 w-5" />
                </a>
              ))
            ) : (
              category.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => handleManufacturerClick(item)}
                  className="flex items-center justify-between w-full p-2 hover:bg-gray-700 border-b border-gray-300"
                >
                  <span className="flex items-center">
                    <item.icon className="h-6 w-6 mr-2" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              ))
            )}
          </div>
        </Transition>
      ))}
    </div>
  );
};

export default MobileMenu;
