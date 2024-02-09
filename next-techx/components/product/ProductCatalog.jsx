import React from "react";

const ProductCatalog = (props) => {
  return (
    <main>
      <div className="m-2   md:m-1 w-[200px] sm:w-[165px] md:w-[200px] text-center justify-center  max-w-sm  border rounded-lg shadow bg-[#1d1d1d]  border-[#1d1d1d]  ">
        <img
          className="p-8     h-[200px]  rounded-t-lg items-center "
          src={props.image}
        ></img>
        <span className="flex justify-center mb-4 font-bold text-lg text-center">
          {props.title}
        </span>
      </div>
    </main>
  );
};

export default ProductCatalog;
