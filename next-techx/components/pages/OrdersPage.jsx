"use client";
import { React, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter } from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";

const OrdersPage = () => {
  const [stored_array, SetStoredArray] = useState(
    JSON.parse(localStorage.getItem("Cart")) || []
  );

  const RemoveFromCart = (index) => {
    const updated_сart = [...stored_array];

    updated_сart.splice(index, 1);

    localStorage.setItem("Cart", JSON.stringify(updated_сart));

    SetStoredArray(updated_сart);
  };

  const CountTotal = () => {
    let total = 0;

    for (const i_price of stored_array) total += parseFloat(i_price.price);

    return total;
  };
  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
          <div className="w-full md:w-2/3 dark:bg-[#1d1d1d] shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
            <form>
              <div className="mb-4">
                <Label
                  htmlFor="name"
                  className="block dark:text-white text-black text-sm font-bold mb-2"
                >
                  Full Name
                </Label>
                <Input
                  type="text"
                  placeholder="Your Full Name"
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <Label className="block dark:text-white text-black text-sm font-bold mb-2">
                  Address
                </Label>
                <Input
                  type="text"
                  placeholder="1234 Main St"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <Label className="block dark:text-white text-black text-sm font-bold mb-2">
                  City
                </Label>
                <Input
                  type="text"
                  placeholder="City"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 ">
                <div className="flex flex-row">
                  <Label className="block dark:text-white text-black text-sm font-bold mb-2 px-2">
                    State
                  </Label>
                  <Input
                    type="text"
                    placeholder="State"
                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />

                  <Label className="block dark:text-white text-black text-sm font-bold mb-2 px-2">
                    ZIP code
                  </Label>
                  <Input
                    type="text"
                    placeholder="ZIP code"
                    className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label className="block dark:text-white text-black text-sm font-bold mb-2">
                  Phone Number
                </Label>
                <Input
                  type="text"
                  placeholder="Phone number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </form>
          </div>

          <div className="w-full md:w-1/3 bg-white  dark:bg-[#1d1d1d] shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            {stored_array.length > 0 ? (
              <>
                <ScrollArea className="h-96 w-full ">
                  {stored_array.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 items-center gap-4 mt-3"
                    >
                      <div>
                        <img
                          src={`https://squid-app-d6fho.ondigitalocean.app:443/GetImage/${item.img}`}
                          alt="img"
                          className="w-14"
                        />
                      </div>
                      <div>{item.model}</div>
                      <div>{item.price}$</div>
                      <div>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          color="red"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => RemoveFromCart(index)}
                        >
                          <path
                            d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex flex-col">
                  <Label className="text-lg mb-5">
                    Total : {CountTotal()}$
                  </Label>

                  <Button
                    type="button"
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    Checkout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-row ">
                <Label className="p-2 text-base">Your cart is empty.</Label>

                <Button
                  type="button"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrdersPage;
