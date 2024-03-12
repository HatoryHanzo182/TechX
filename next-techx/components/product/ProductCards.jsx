import Image from "next/image";
import React from "react";

const ProductCards = (props) => {
  return (
    <div className="m-6 max-sm:m-2 md:m-4 w-[220px] max-sm:w-[175px] max-md:w-[200px]  max-w-xs  border rounded-lg shadow bg-[#1d1d1d]  border-[#1d1d1d]  ">
      <div>
        <img
          className="p-10 rounded-t-lg "
          src={props.image}
          alt="product image"
        />
      </div>
      <div className="px-5 pb-5 text-center">
        <a href="">
          <h5 className="lg:text-xl max-sm:text-base font-semibold tracking-tight text-white">
            {props.title}
            <hr class="border-t-[0.1] border-gray-300 my-2"></hr>
          </h5>
          <p className="text-sm text-gray-500">{props.color}Black Titanium</p>
        </a>
        <div className="flex items-center mt-2.5 mb-5"></div>
        <div className="flex items-center justify-between">
          <span className="lg:text-xl max-sm:text-lg font-bold text-white">
            {props.price} $
          </span>
          {/* <button
            id="buy_button"
            type="button"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 max-sm:px-2.5 max-md:px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            More
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
