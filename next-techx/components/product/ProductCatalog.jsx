import React from "react";

const ProductCatalog = (props) => {
  return (
    <main>
      <div className="m-2 max-sm:m-2 md:m-2 w-[200px] max-sm:w-[175px] max-md:w-[200px] text-center  max-w-xs  border rounded-lg shadow bg-[#1d1d1d]  border-[#1d1d1d]  ">
        <img className="p-8 h-[190px]  rounded-t-lg " src={props.image}></img>
        <span className="flex justify-center mb-2 font-bold text-lg text-center">
          {props.title}
        </span>
      </div>
    </main>
  );
};

export default ProductCatalog;
