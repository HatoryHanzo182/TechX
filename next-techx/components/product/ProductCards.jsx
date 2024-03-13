import Image from "next/image";
import React from "react";

const ProductCards = (props) => {
  return (
    // <div className="m-6 max-sm:m-2 md:m-4 w-[200px] max-sm:w-[180px] h-[320px] md:h-[200px] sm:h-[260px] max-md:w-[200px]  max-w-sm  border rounded-lg shadow bg-[#1d1d1d]  border-[#1d1d1d]  ">
    //   <div>
    //     <img className="p-10 " src={props.image} alt="product image" />
    //   </div>
    //   <div className="px-5 pb-5 text-center">
    //     <h5 className="lg:text-xl max-sm:text-base font-semibold tracking-tight text-white">
    //       {props.title}
    //     </h5>

    //     {/* <p className="text-sm text-gray-500 ">{props.color}Black Titanium</p>
    //     <p className="text-sm text-gray-300">{props.memory}256 GB</p> */}
    //     <hr class="border-t-[0.1] border-gray-300 my-2"></hr>

    //     {/* <div className="flex items-center mt-2.5 mb-5"></div> */}
    //     <div className="flex     justify-between ">
    //       <span className="lg:text-xl max-sm:text-sm font-bold text-white">
    //         {props.price}$
    //       </span>
    //       <span className="lg:text-xl max-sm:text-sm my-3 font-bold text-red-600 line-through ">
    //         {props.oldPrice} 1200$
    //       </span>
    //       {/* <button
    //         id="buy_button"
    //         type="button"
    //         className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 max-sm:px-2.5 max-md:px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         More
    //       </button> */}
    //     </div>
    //   </div>
    // </div>
    <div class="m-4 md:m-2 w-[180px] md:w-[150px] h-[280px] md:h-[180px] lg:w-[200px] lg:h-[320px] border rounded-lg shadow bg-[#1d1d1d] border-[#1d1d1d] flex flex-col">
      <div class="h-1/2 w-full flex justify-center items-center p-2">
        <img
          class="h-full w-full p-2 object-contain"
          src={props.image}
          alt="product image"
        />
      </div>
      <div class="h-1/2 px-2 pb-2 text-center flex flex-col justify-between">
        <h5 class="text-sm md:text-xs lg:text-base font-semibold tracking-tight text-white overflow-hidden">
          {props.title}
        </h5>
        <p className="text-sm text-gray-500">Black Titanium</p>
        <p className="text-sm text-gray-600">256 GB</p>
        <hr class="border-t-[0.1px] border-gray-300 my-1"></hr>
        <div class="flex justify-between items-center">
          <span class="text-sm md:text-xs lg:text-base font-bold text-white">
            {props.price}$
          </span>
          <span class="text-sm md:text-xs lg:text-base font-bold text-red-600 line-through">
            {props.oldPrice}1200$
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
