import React from "react";

const ProductCatalog = (props) => {
  return (
    <main>
      <div className="m-2 md:m-1 w-[180px] sm:w-[140px] md:w-[160px] text-center justify-center max-w-sm shadow-sm  rounded-lg  dark:bg-[#1d1d1d] bg-white border-neutral-200 ">
        <img
          className="w-[150px] h-[160px]  object-fill p-6 rounded-t-lg mx-auto"
          src={props.image}
          alt="Описание изображения"
        ></img>
        <span className="flex justify-center pb-4 font-bold text-lg text-center text-nowrap">
          {props.title}
        </span>
      </div>
    </main>
  );
};

export default ProductCatalog;
