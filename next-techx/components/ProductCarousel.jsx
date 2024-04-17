"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCards from "./product/ProductCards";
import { useState, useEffect } from "react";

// *************************************************************
//                      PRODUCT CAROUSEL.
//
// *************************************************************
//
export function ProductCarousel() {
  const [iphone, SetIphone] = useState([]);
  const [carouselSlideWidth, SetCarouselSlideWidth] = useState(4); // Предположим, что по умолчанию отображается 5 элементов

  useEffect(() => {
    const ToGetData = async () => {
      try {
        const formatted_data = await fetch(
          "http://localhost:3001/GettingIphoneDataForCarusel",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (formatted_data.ok) SetIphone(await formatted_data.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    ToGetData();
  }, []);

  useEffect(() => {
    const updateCarouselDisplay = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        SetCarouselSlideWidth(2); // Для мобильных устройств
      } else if (screenWidth >= 640 && screenWidth < 768) {
        SetCarouselSlideWidth(3); // Для планшетов
      } else if (screenWidth >= 768 && screenWidth < 1024) {
        SetCarouselSlideWidth(4); // Для маленьких ноутбуков
      } else {
        SetCarouselSlideWidth(4); // Для больших экранов и настольных компьютеров
      }
    };

    updateCarouselDisplay();

    window.addEventListener("resize", updateCarouselDisplay);

    return () => window.removeEventListener("resize", updateCarouselDisplay);
  }, []);

  const iterations_array = Array.from(
    { length: Math.ceil(iphone.length / carouselSlideWidth) },
    (_, index) => index
  );

  return (
    <Carousel
      opts={{ align: "start" }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      orientation="horizontal"
      className="mx-20 max-w-full justify-center"
    >
      <CarouselContent className="-ml-1">
        {iterations_array.map((iteration) => (
          <CarouselItem
            key={iteration}
            className="flex flex-row justify-center p-2"
          >
            {iphone
              .slice(
                iteration * carouselSlideWidth,
                (iteration + 1) * carouselSlideWidth
              )
              .map((phone, phoneIndex) => (
                <ProductCards
                  key={phoneIndex}
                  image={`http://localhost:3001/GetImage/${phone.images}`}
                  title={phone.model}
                  color={phone.color}
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
