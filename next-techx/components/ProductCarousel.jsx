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

export function ProductCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="horizontal"
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
      className="mx-20 max-w-full  justify-center"
    >
      <CarouselContent className="-ml-1">
        <CarouselItem className="flex flex-row p-2">
          <ProductCards
            image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
            title="MACBOOK PRO 14"
            price="2000"
          />
          <ProductCards
            image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
            title="MACBOOK PRO 14"
            price="2000"
          />
          <ProductCards
            image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
            title="MACBOOK PRO 14"
            price="2000"
          />
          <ProductCards
            image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
            title="MACBOOK PRO 14"
            price="2000"
          />
          <ProductCards
            image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
            title="MACBOOK PRO 14"
            price="2000"
          />
        </CarouselItem>
        <CarouselItem className="flex flex-row p-2">
          <ProductCards
            image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
            title="MACBOOK PRO 14"
            price="2000"
          />
          <ProductCards
            image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
            title="MACBOOK PRO 14"
            price="2000"
          />
          <ProductCards
            image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
            title="MACBOOK PRO 14"
            price="2000"
          />
          <ProductCards
            image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
            title="MACBOOK PRO 14"
            price="2000"
          />
          <ProductCards
            image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
            title="MACBOOK PRO 14"
            price="2000"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
