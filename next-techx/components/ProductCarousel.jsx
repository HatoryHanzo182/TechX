"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCards from "./product/ProductCards";
import { useState, useEffect } from 'react';

// *************************************************************
//                      PRODUCT CAROUSEL.
//
// *************************************************************
//
// export function ProductCarousel() 
// {
//   return (
//     <Carousel
//       opts={{
//         align: "start",
//       }}
//       orientation="horizontal"
//       plugins={[
//         Autoplay({
//           delay: 10000,
//         }),
//       ]}
//       className="mx-20 max-w-full  justify-center"
//     >
//       <CarouselContent className="-ml-1">
//         <CarouselItem className="flex flex-row p-2">
//           <ProductCards
//             image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
//             title="MACBOOK PRO 14"
//             price="2000"
//           />
//           <ProductCards
//             image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
//             title="MACBOOK PRO 14"
//             price="2000"
//           />
//           <ProductCards
//             image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
//             title="MACBOOK PRO 14"
//             price="2000"
//           />
//           <ProductCards
//             image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
//             title="MACBOOK PRO 14"
//             price="2000"
//           />
//           <ProductCards
//             image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
//             title="MACBOOK PRO 14"
//             price="2000"
//           />
//         </CarouselItem>
//         <CarouselItem className="flex flex-row p-2">
//           <ProductCards
//             image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
//             title="MACBOOK PRO 14"
//             price="2000"
//           />
//           <ProductCards
//             image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
//             title="MACBOOK PRO 14"
//             price="2000"
//           />
//           <ProductCards
//             image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
//             title="MACBOOK PRO 14"
//             price="2000"
//           />
//           <ProductCards
//             image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
//             title="MACBOOK PRO 14"
//             price="2000"
//           />
//           <ProductCards
//             image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
//             title="MACBOOK PRO 14"
//             price="2000"
//           />
//         </CarouselItem>
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }




// *************************************************************
//                      PRODUCT CAROUSEL WITH DB.
//
// *************************************************************

export function ProductCarousel() 
{
  const [iphone, SetIphone] = useState();
  const [number_carousel_iterations, SetNumberCarouselIterations] = useState();

  useEffect(() =>
  {
    const ToGetData = async () =>
    {
      try 
      {
        const formatted_data = await fetch('http://localhost:3001/GettingIphoneDataForCarusel', 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
        });

        if(formatted_data.ok)
          SetIphone(await formatted_data.json());
      } 
      catch (error) { console.error('Error fetching data:', error); }
    };

    ToGetData();
  }, []);

  useEffect(() =>
  {
    if (iphone && iphone.length !== undefined && iphone.length > 5)
      SetNumberCarouselIterations(Math.floor(iphone.length / 5));
    else if(iphone && iphone.length !== undefined)
      SetNumberCarouselIterations(Math.floor(1));
  }, [iphone]);

  const iterations_array = Array.from(Array(number_carousel_iterations).keys());

  return (
    <Carousel opts={{ align: "start" }} orientation="horizontal" plugins={[Autoplay({ delay: 10000 })]} className="mx-20 max-w-full  justify-center">
      <CarouselContent className="-ml-1">
        {iterations_array.map((iteration, index) => 
        (
          <CarouselItem key={index} className="flex flex-row p-2">
            {iphone && iphone.length > 0 && iphone.map((phone, phoneIndex) =>
              (phoneIndex >= iteration * 5 && phoneIndex < (iteration + 1) * 5) && 
              (
                <ProductCards
                  key={phoneIndex}
                  image={`http://localhost:3001/GetImage/${phone.images}`}
                  title={phone.model}
                  price={phone.price}
                />
              ))}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}