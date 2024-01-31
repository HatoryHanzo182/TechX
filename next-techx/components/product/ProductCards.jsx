import Image from "next/image";
import React from "react";

import { MdAddCircleOutline } from "react-icons/md";

const ProductCards = (props) => {
  return (
    <div className="m-6 max-sm:m-2 md:m-4 w-[250px] max-sm:w-[175px] max-md:w-[200px]  max-w-xs  border rounded-lg shadow bg-[#1d1d1d]  border-[#1d1d1d]  ">
      <div>
        <img
          className="p-10 rounded-t-lg "
          src={props.image}
          alt="product image"
        />
      </div>
      <div className="px-5 pb-5">
        <a href="">
          <h5 className="lg:text-xl max-sm:text-base font-semibold tracking-tight text-white">
            {props.title}
          </h5>
          <p className="text-sm text-gray-500">{props.color}</p>
        </a>
        <div className="flex items-center mt-2.5 mb-5"></div>
        <div className="flex items-center justify-between">
          <span className="lg:text-3xl max-sm:text-lg font-bold text-white">
            {props.price} $
          </span>
          <button
            id="buy_button"
            type="button"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 max-sm:px-2.5 max-md:px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <MdAddCircleOutline size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
