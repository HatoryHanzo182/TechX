"use client";
import ProductDetail from "@/components/product/ProductDetails";

import React from "react";
import Nav from "@/components/Nav";
import ProductSelection from "@/components/product/ProductMenu";

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
