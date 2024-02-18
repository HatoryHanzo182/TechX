import * as React from "react";

import MainPage from "@/components/pages/MainPage";



import Nav from "@/components/Nav";
import ProductCatalog from "@/components/product/ProductCatalog";
import { ProductCarousel } from "@/components/ProductCarousel";

export default async function Home() {
  return (
    <>

      <Nav />

      <MainPage />

      <div className=" mt-8 ">
        <div className="flex flex-wrap   justify-center  items-center">
          <ProductCatalog
            image="https://img.jabko.ua/image/cache/home_cats/image%20154full.png.webp"
            title="Iphone"
          />
          <ProductCatalog
            image="https://img.jabko.ua/image/cache/cataloge-2/main-page-2/pods-2full.png.webp"
            title="AirPods"
          />
          <ProductCatalog
            image="https://img.jabko.ua/image/cache/home_cats/image%20155full.png.webp"
            title="Apple Watch"
          />
          <ProductCatalog
            image="https://img.jabko.ua/image/cache/home_cats/macbook-air-spacegray-gallery1-2full.jpg.webp"
            title="Macbook"
          />
        </div>
        <div className=" flex flex-wrap   justify-center  items-center">
          <ProductCatalog
            image="https://img.jabko.ua/image/cache/home_cats/ipad-pcfull.jpg.webp"
            title="Ipad"
          />

          <ProductCatalog
            image="https://img.jabko.ua/image/cache/cataloge-2/main-page-2/2020-07-31%2010.30.31%201-1397x1397full.jpg.webp"
            title="PlayStation"
          />

          <ProductCatalog
            image="https://img.jabko.ua/image/cache/-main-new/image13full.png.webp"
            title="Samsung Galaxy"
          />

          <ProductCatalog
            image="https://img.jabko.ua/image/cache/-main-new/image14full.png.webp"
            title="Google Pixel"
          />
        </div>
      </div>

      <div className="mt-20">
        <ProductCarousel />
      </div>
      {/* <div className="mt-[200px] flex flex-row justify-start flex-wrap">
        <ProductCards
          image="https://jabko.ua/image/cache/catalog/products/2022/09/072253/photo_2022-09-07_22-53-30%20(1)-300x300.jpg"
          title="IPHONE 14 PRO MAX"
          price="1200"
        />
        <ProductCards
          image="https://jabko.ua/image/cache/catalog/products/2022/09/072342/MQD83%20(1)-300x300.jpg"
          title="AIRPODS PRO"
          price="250"
        />
        <ProductCards
          image="https://jabko.ua/image/cache/catalog/products/2022/06/201902/mbp14-spacegray-gallery1-202110-300x300.jpg"
          title="MACBOOK PRO 14"
          price="2000"
        />
        <ProductCards
          image="https://jabko.ua/image/cache/catalog/products/2022/09/081730/MPLT3ref_VW_34FR%20watch-45-alum-m-300x300.jpg"
          title="APPLE WATCH 8"
          price="450"
        />
        <ProductCards
          image="https://jabko.ua/image/cache/catalog/products/2022/09/081730/MPLT3ref_VW_34FR%20watch-45-alum-m-300x300.jpg"
          title="APPLE WATCH 8"
          price="450"
        />
        <ProductCards
          image="https://jabko.ua/image/cache/catalog/products/2022/09/081730/MPLT3ref_VW_34FR%20watch-45-alum-m-300x300.jpg"
          title="APPLE WATCH 8"
          price="450"
        />
      </div> */}
    </>
  );
}
