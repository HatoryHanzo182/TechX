import Image from "next/image";
import React from "react";

const ProductCards = (props) => {
  return (
    <div className="m-4 md:m-2 w-[160px] md:w-[140px] h-[280px] md:h-[200px] lg:w-[200px] lg:h-[320px] rounded-lg shadow bg-[#1d1d1d] flex flex-col">
      <div className="h-1/2 w-full flex justify-center items-center p-2">
        <img
          className="h-full w-full p-2 object-contain"
          src={props.image}
          alt="product image"
        />
      </div>
      <div className="h-1/2 px-2 pb-2 text-center flex flex-col justify-between">
        <h5 className="text-sm md:text-xs lg:text-base font-semibold tracking-tight text-white overflow-hidden">
          {props.title}
        </h5>
        <p className="text-sm text-gray-500">{props.color}</p>
        <p className="text-sm text-gray-600">{props.memory}</p>
        <hr className="border-t-[0.1px] border-gray-300 my-1"></hr>
        <div className="flex justify-between items-center">
          <span className="text-base p-2 md:text-xs lg:text-base font-bold text-white">
            {props.price}$
          </span>
          <span className="text-sm p-2 md:text-xs lg:text-base font-bold text-red-600 line-through">
            {props.oldPrice}1200$
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
