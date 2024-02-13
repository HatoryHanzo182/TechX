"use client";
import Catalog from "@/components/buttons/Catalog";
import Nav from "@/components/Nav";
import ProductSelection from "@/components/product/ProductMenu";

import Test from "@/components/Test";
import React from "react";

const page = () => {
  return (
    <main>
      <Nav />
      <ProductSelection />
    </main>
  );
};

export default page;
