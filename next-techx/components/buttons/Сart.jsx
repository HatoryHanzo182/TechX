import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  LucideShoppingCart,
  ShoppingBagIcon,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const Cart = () => {
  const [stored_array, SetStoredArray] = useState([]);
  const [last_updated, SetLastUpdated] = useState();

  useEffect(() => {
    console.log("STORAGE");

    SetStoredArray(JSON.parse(localStorage.getItem("Cart")) || []);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const cartData = JSON.parse(localStorage.getItem("Cart")) || [];
      SetStoredArray(cartData);
    }, 1000);

    return () => clearInterval(interval);
  }, [last_updated]);

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

  const GoCheckout = () => {
    window.location.href = "/checkout";
  };

  const ClearAllFromCart = (e) => {
    e.stopPropagation();
    localStorage.removeItem("Cart");

    stored_array.length = 0;

    SetStoredArray([]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
        <ShoppingCart className="h-6 w-5 mb-2" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>
            Check the list of products before placing an order.
          </SheetDescription>
        </SheetHeader>
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
                      className="w-10"
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
            <Label className="text-lg">Total : {CountTotal()}$</Label>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" onClick={GoCheckout}>
                  Checkout
                </Button>
              </SheetClose>
              <SheetClose>
                <Button type="button" onClick={ClearAllFromCart}>
                  Сlear all
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col ">
            <Label>Your cart is empty.</Label>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button">Close</Button>
              </SheetClose>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
