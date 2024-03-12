"use client";
import ProductDetail from "@/components/product/ProductDetails";

import ProductSelection from "@/components/product/ProductSelection";
import React from "react";
import Nav from "@/components/Nav";

const page = () => {
  return (
    <main>
      {/* <Nav />
      <ProductDetail /> */}

      <Nav />
      <ProductSelection />
    </main>
  );
};

export default page;
