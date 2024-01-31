"use client";
import React, { useState } from "react";

const Catalog = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  // need to fix and add more items
  return (
    <header className="relative inline-block text-left mt-16 ml-2">
      <button
        className="bg-gray-300 p-2 hover:bg-gray-400 text-gray-800 font-bold  rounded-full"
        onClick={toggleMenu}
      >
        Catalog
      </button>
      {menuOpen && (
        <div className="absolute left-0 mt-2 origin-top-left bg-white border border-gray-300 divide-y divide-gray-100 rounded-lg shadow-lg">
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
              onClick={toggleSubMenu}
            >
              Iphone
            </button>
            {subMenuOpen && (
              <div className="absolute top-0 left-full mt-0 ml-2 bg-white border border-gray-300 divide-y divide-gray-100 rounded-lg shadow-lg">
                <div className="py-1">
                  <button className="w-[150px]  text-center px-8 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none">
                    Iphone 14
                  </button>
                  <button className="w-full text-left px-8 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none">
                    Iphone 12
                  </button>
                  {/* Add more submenu items as needed */}
                </div>
              </div>
            )}
          </div>
          <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none">
            Menu Item 1
          </button>
          <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none">
            Menu Item 2
          </button>
          {/* Add more menu items as needed */}
        </div>
      )}
    </header>
  );
};

export default Catalog;
