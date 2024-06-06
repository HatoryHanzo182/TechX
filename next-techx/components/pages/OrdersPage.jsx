"use client";
import { React, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PullOutOfSession } from "@/lib/session";
import { Sheet, SheetClose, SheetContent, SheetFooter } from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";

const OrdersPage = () => 
{
  const [stored_array, SetStoredArray] = useState(JSON.parse(localStorage.getItem("Cart")) || []);
  const [user_name, SetUserName] = useState("");
  const [user_email, SetUserEmail] = useState("");
  const [user_email_readonly, SetUserEmailReadonly] = useState(false);
  const [user_phone, SetUserPhone] = useState("");
  const [user_city, SetUserCity] = useState("");
  const [user_del_address, SetUserDeliveryAddress] = useState("");
  const [user_card, SetUserCard] = useState("");

  useEffect(() => 
  {
    const SetUser = async () =>
    {
      try 
      {
        const user_data = await PullOutOfSession();

        if (user_data && user_data.name) 
          SetUserName(user_data.name);
        if (user_data && user_data.email) 
        {
          SetUserEmail(user_data.email);
          SetUserEmailReadonly(true);
        }
        if (user_data && user_data.phone_number !== 'null') 
          SetUserPhone(user_data.delivery_address);
        if (user_data && user_data.delivery_address !== 'null') 
          SetUserDeliveryAddress(user_data.delivery_address);

      } 
      catch (error) { console.error("Error fetching user data: ", error); }
    };

    SetUser();
  }, [])

  const handlePhoneChange = (e) => 
  {
    let input = e.target.value;
    let formatted_input = "+";
  
    input = input.replace(/\D/g, '');
  
    if (input.length > 0)
      formatted_input += input.charAt(0);
    if (input.length > 1)
      formatted_input += input.charAt(1);
    if (input.length > 2)
      formatted_input += " (" + input.substr(2, 3);
    if (input.length > 5)
      formatted_input += ") " + input.substr(5, 7);
  
    SetUserPhone(formatted_input);
  };

  const Checkout = async () => 
  {    
    if (user_name.trim() !== "" && user_phone.length === 17 && user_city.trim() !== "" && user_del_address.trim() !== "") 
    {
      const order_data = 
      {
        user_name: user_name,
        user_email: user_email,
        user_phone: user_phone,
        user_city: user_city,
        user_del_address: user_del_address,
        user_card: user_card,
        user_sum: CountTotal(),
        stored_array: stored_array
      };
    
      try 
      {
        const response = await fetch("https://squid-app-d6fho.ondigitalocean.app:443/Order", 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order_data)
        });
    
        if (!response.ok) 
          throw new Error("Failed to submit order");
        else
        {
          
        }

        Finish();
      } 
      catch (error) { console.error("Error submitting order:", error); }
    }
  }

  const RemoveFromCart = (index) => 
  {
    const updated_сart = [...stored_array];

    updated_сart.splice(index, 1);

    localStorage.setItem("Cart", JSON.stringify(updated_сart));

    SetStoredArray(updated_сart);
  };

  const CountTotal = () => 
  {
    let total = 0;

    for (const i_price of stored_array) 
      total += parseFloat(i_price.price);

    return total;
  };

  const Finish = () =>
  {
    localStorage.removeItem("Cart");
    window.location.href = "/"; 
  }

  return (
    <main className="pt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-6 mt-10">
          <div className="w-full md:w-2/3 dark:bg-[#1d1d1d] shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
            <form>
              <div className="mb-4">
                <Label htmlFor="name" className="block dark:text-white text-black text-sm font-bold mb-2">
                  Full Name
                </Label>
                <Input type="text" placeholder="Your Full Name" className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" value={user_name} onChange={(e) => SetUserName(e.target.value)}/>
              </div>
              <div className="mb-4">
                <Label className="block dark:text-white text-black text-sm font-bold mb-2">
                  Email
                </Label>
                <Input type="text" placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" value={user_email} disabled={user_email_readonly} onChange={(e) => SetUserEmail(e.target.value)}/>
              </div>
              <div className="mb-4">
                <Label className="block dark:text-white text-black text-sm font-bold mb-2">
                  Phone Number
                </Label>
                <Input 
                  type="text" 
                  placeholder="Phone number" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                  value={user_phone} 
                  onChange={handlePhoneChange}
                />
              </div>
              <div className="mb-4">
                <Label className="block dark:text-white text-black text-sm font-bold mb-2">
                  City
                </Label>
                <Input type="text" placeholder="City" className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => SetUserCity(e.target.value)}/>
              </div>
              <div className="mb-4">
                <Label className="block dark:text-white text-black text-sm font-bold mb-2">
                  Delivery address
                </Label>
                <Input type="text" placeholder="1234 Main St" className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" value={user_del_address} onChange={(e) => SetUserDeliveryAddress(e.target.value)}/>
              </div>
              <div className="md:w-1/3">
                <Label className="block dark:text-white text-black text-sm font-bold mb-2">
                  Card
                </Label>
                <div className="flex items-center justify-center bg-black overflow-hidden p-1 border border-white border-opacity-30 rounded-lg shadow-md h-9">
                  <input className="w-36 h-full border-none outline-none text-sm bg-black text-white font-semibold caret-orange-500 pl-2" type="text" name="text" id="input" placeholder="0000 0000 0000 0000" pattern="\d*" maxLength="16" onChange={(e) => SetUserCard(e.target.value)}
                    onKeyDown={(e) => 
                    {
                      if (!/\d/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key))
                        e.preventDefault();
                    }}
                  />
                  <div className="flex items-center justify-center relative w-10 h-6 bg-black border border-white border-opacity-20 rounded-md">
                    <svg className="text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 48 48">
                      <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                      <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                      <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path>
                    </svg>
                  </div>
                </div>
                <Label className="block dark:text-gray text-gray-100 text-xs font-bold mb-2">
                  If the card details are not entered, the payment will automatically be considered cash on delivery.
                </Label>
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/3 bg-white  dark:bg-[#1d1d1d] shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            {stored_array.length > 0 ? 
            (<>
              <ScrollArea className="h-96 w-full ">
                {stored_array.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 items-center gap-4 mt-3">
                    <div>
                      <img src={`https://squid-app-d6fho.ondigitalocean.app:443/GetImage/${item.img}`} alt="img" className="w-14"/>
                    </div>
                    <div>{item.model}</div>
                    <div>{item.price}$</div>
                    <div>
                      <svg width="15" height="15" viewBox="0 0 15 15" color="red" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => RemoveFromCart(index)}>
                        <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                ))}
              </ScrollArea>
                <div className="flex flex-col">
                  <Label className="text-lg mb-5">
                    Total : {CountTotal()}$
                  </Label>
                  <Button type="button" onClick={() => { Checkout(); }}>
                    Checkout
                  </Button>
                </div>
            </>
            ) : (
              <div className="flex flex-row ">
                <Label className="p-2 text-base">Your cart is empty.</Label>
                <Button type="button" onClick={() => { window.location.href = "/"; }}>
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
