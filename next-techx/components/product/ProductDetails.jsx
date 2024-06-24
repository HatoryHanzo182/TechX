"use client";
import React, { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { delay, motion } from "framer-motion";
import { PullOutOfSession } from "@/lib/session";
import { get } from "mongoose";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SketchLogoIcon } from "@radix-ui/react-icons";

const ProductDetails = () => {
  let [capacity, setCapacity] = useState("128");
  let [ID_product_no_repeat, SetIDProductNoRepeat] = useState();
  const [show_logged_content, SetShowLoggedContent] = useState(false);
  const [product_data, SetProductData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [all_reviews, SetAllReviews] = useState([]);
  const [user_name, SetUserName] = useState("");
  const [user_review, SetUserReview] = useState("");
  const [grade, SetGrade] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer;

    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [showAlert]);

  const toggleLike = async () => {
    setLiked(!liked);

    setShowAlert(true);
    setMessage(
      liked ? "Product removed from favorites" : "Product added to favorites"
    );
    const id_product = new URLSearchParams(window.location.search).get("id");

    if (!liked) {
      const formatted_data = await fetch(
        `https://techx-server.tech:443/AddFavoriteProduct/${id_product}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } else {
      const formatted_data = await fetch(
        `https://techx-server.tech:443/DeleteFavoriteProduct/${id_product}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    }
  };

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();

      const targetId = event.target.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement)
        window.scrollTo({ top: targetElement.offsetTop, behavior: "smooth" });
    };

    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    return () => {
      scrollLinks.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
    };
  }, []);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  useEffect(() => {
    const ToGetData = async (id) => {
      try {
        const formatted_data = await fetch(
          `https://techx-server.tech:443/ExtractData/${id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (formatted_data.ok) {
          const data = await formatted_data.json();

          SetProductData(data);
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const GetProductReviews = async () => {
      try {
        const id_product = new URLSearchParams(window.location.search).get(
          "id"
        );

        const rew = await fetch(
          `https://techx-server.tech:443/GetProductReview/${id_product}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await rew.json();

        if (rew.ok) SetAllReviews(data);
      } catch (error) {
        console.error("Error fetching product reviews:", error);
      }
    };

    const FindFavorite = async () => {
      try {
        const l_user_data = await PullOutOfSession();
        const p = new URLSearchParams(window.location.search);

        l_user_data.favourites.forEach((favourite) => {
          if (p.get("id") === favourite.toString()) setLiked(true);
        });
      } catch {}
    };

    const params = new URLSearchParams(window.location.search);

    if (localStorage.getItem("token") !== null) SetShowLoggedContent(true);

    if (ID_product_no_repeat !== params.get("id")) {
      SetIDProductNoRepeat(params.get("id"));
      ToGetData(params.get("id"));
      GetProductReviews();
      FindFavorite();
    }
  }, [new URLSearchParams(window.location.search)]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleRatingChange = (event) => {
    SetGrade(Number(event.target.value));
  };

  const handleAddToCart = async () => {
    const p_in_cart = {
      img: product_data.images[0],
      model: product_data.model,
      price:
        product_data.descont_price !== 0
          ? product_data.descont_price
          : product_data.price,
    };

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const array_coast = JSON.parse(localStorage.getItem("Cart")) || [];

      array_coast.push(p_in_cart);
      localStorage.setItem("Cart", JSON.stringify(array_coast));

    //    выведете сообщение пользователю о том что товар добавлен в корзину или анимацию, что бы было понятно что добавлено в корзину.
    setShowAlert(true);
    setMessage("Product added to cart");
  };

  const handleSendReview = async (e) => {
    e.preventDefault();

    if (!show_logged_content) {
      if (!user_name.trim() || !user_review.trim()) {
        setShowAlert(true);
        setMessage("Name or fields must not be empty");
        return;
      }

      const product_id = new URLSearchParams(window.location.search).get("id");

      const ServerReview = await fetch(
        "https://techx-server.tech:443/SendProductReview",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id,
            review_owner_id: null,
            user_name,
            user_review,
            grade,
          }),
        }
      );

      const answer = await ServerReview.json();

      if (answer) {
        setShowAlert(true);
        setMessage("Review sent successfully");
        SetUserName("");
        SetUserReview("");
        SetGrade(0);
      } else {
        setShowAlert(true);
        setMessage("Something went wrong, review not sent");
      }
    } else {
      if (!user_review.trim()) {
        setShowAlert(true);
        setMessage("Name or fields must not be empty");
        return;
      }

      const l_user_data = await PullOutOfSession();
      const product_id = new URLSearchParams(window.location.search).get("id");

      const ServerReview = await fetch(
        "https://techx-server.tech:443/SendProductReview",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id,
            review_owner_id: l_user_data.email,
            user_name: null,
            user_review,
            grade,
          }),
        }
      );

      const answer = await ServerReview.json();

      if (answer) {
        setShowAlert(true);
        setMessage("Review sent successfully");
        SetUserReview("");
        SetGrade(0);
      } else {
        setShowAlert(true);
        setMessage("Name or fields must not be empty");
      }
    }
  };

  return (
    <main>
      <div className="fixed z-50 right-0 top-2 mr-4 mt-4 w-[300px]">
        {showAlert && message && (
          <Alert>
            <SketchLogoIcon />
            <AlertTitle>Some message...</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </div>
      <section className="py-20 font-poppins mx-10  ">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className=" flex flex-row px-6 py-4 gap-6 mb-1 font-bold ml-10">
          <a className="hover:text-gray-400 cursor-pointer " href="#details">
            Details
          </a>
          <a
            className="hover:text-gray-400 cursor-pointer"
            href="#characteristics">
            Characteristics
          </a>
          <a className="hover:text-gray-400 cursor-pointer" href="#reviews">
            Reviews({all_reviews.length})
          </a>
        </div>
        <div className="max-w-5xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2  md:mb-0">
              <div className="sticky top-0 z-10 overflow-hidden ">
                <div className="relative  mb-6 lg:mb-10 ">
                  <a
                    className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2 "
                    href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-5 h-5 text-blue-500 bi bi-chevron-left dark:text-blue-200"
                      viewBox="0 0 16 16"></svg>
                  </a>
                  <img
                    className="object-cover w-full max-sm:w-auto  lg:h-1/2"
                    src={
                      `https://techx-server.tech:443/GetImage/${selectedImage}` ||
                      "Loading..."
                    }
                    alt=""
                  />
                  <a
                    className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2"
                    href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200"
                      viewBox="0 0 16 16"></svg>
                  </a>
                </div>
                <div className="flex-wrap hidden -mx-2 md:flex">
                  {product_data?.images.map((image, index) => (
                    <div key={index} className="w-1/2 p-2 sm:w-1/4">
                      <a
                        className="block border border-transparent hover:border-blue-400"
                        href="#"
                        onClick={() => handleImageClick(image)}>
                        <img
                          className="object-cover w-full lg:h-32"
                          src={`https://techx-server.tech:443/GetImage/${image}`}
                          alt={`Product Image ${index + 1}`}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  <span className="text-red-500  animate-pulse">New</span>
                  <h2 className="max-w-xl mt-2 mb-4 text-5xl font-bold md:text-6xl font-heading dark:text-gray-300">
                    {product_data?.model || "Loading..."}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-4 border-b-2  border-gray-300 lg:grid-cols-2 dark:border-gray-600">
                  <div>
                    <button className="flex items-center rounded-lg  justify-center w-full h-full py-4 border-2 border-gray-300 dark:hover:border-white dark:border-gray-500 hover:border-black">
                      <div>
                        {/* <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[#555352]"></div> */}
                        <p className=" text-center text-gray-200 dark:text-gray-400 text-base">
                          {product_data?.color || "Loading..."}
                        </p>
                      </div>
                    </button>
                  </div>
                  <div>
                    <button className="flex items-center rounded-lg  justify-center w-full h-full py-4 border-2 border-gray-300 dark:hover:border-white dark:border-gray-500 hover:border-black">
                      <div>
                        <p className="text-base text-center text-gray-200 dark:text-gray-400">
                          {product_data?.memory || "Loading..."}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="mt-6 ">
                  <div className="flex flex-wrap items-center">
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 text-gray-700 dark:text-gray-400 bi bi-truck"
                        viewBox="0 0 16 16">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                      </svg>
                    </span>
                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-400">
                      Delivery
                    </h2>
                  </div>
                  <div className="px-7">
                    <p className="mb-2 text-sm dark:text-gray-400">In Stock</p>
                    <p className="mb-2 text-sm dark:text-gray-400">
                      Free Shipping
                    </p>
                  </div>
                </div>
                <div className="mt-6 ">
                  <div className="flex flex-wrap items-center">
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 text-gray-700 dark:text-gray-400 bi bi-bag"
                        viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"></path>
                      </svg>
                    </span>
                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-400">
                      Pickup
                    </h2>
                  </div>
                  <div className="px-7">
                    <a
                      className="mb-2 text-sm text-blue-400 dark:text-blue-200"
                      href="#">
                      Check availability
                    </a>
                  </div>
                </div>
                <div className="mt-6 ">
                  <Button
                    className="w-full flex items-center justify-between px-4 py-2 font-bold text-white bg-black border lg:w-96 "
                    onClick={() => handleAddToCart()}>
                    {isLoading ? (
                      <>
                        <span>Proccessing....</span>
                        <svg
                          className="animate-spin-slow h-5 w-5 ml-2"
                          viewBox="0 0 24 24">
                          {/* Simple spinner SVG */}
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="80"
                            strokeDashoffset="60"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>Add to cart</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ionicon ml-2"
                          viewBox="0 0 512 512"
                          width={20}
                          height={20}>
                          <circle
                            cx="176"
                            cy="416"
                            r="16"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                          />
                          <circle
                            cx="400"
                            cy="416"
                            r="16"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                          />
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                            d="M48 80h64l48 272h256"
                          />
                          <path
                            d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                          />
                        </svg>
                      </>
                    )}
                  </Button>
                </div>
                {!show_logged_content ? null : (
                  <div className="flex justify-between mt-6 ">
                    <span className="mr-2 text-base font-bold text-gray-700 dark:text-gray-400">
                      Add to favorites
                    </span>
                    <span className="mr-6" onClick={toggleLike}>
                      {liked ? (
                        <AiFillHeart size="22" />
                      ) : (
                        <AiOutlineHeart size="22" />
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <motion.div
          id="characteristics"
          className=""
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
        />

        <div className="rounded-lg p-4 mx-10 dark:bg-[#1d1d1d] shadow-lg">
          <div className="mt-4">
            <h4 className="dark:text-white text-lg font-bold mb-2">
              Main characteristics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(product_data?.category === "iPhone"
                ? [
                    {
                      title: "Brand",
                      value: product_data?.brand || "Loading...",
                    },
                    {
                      title: "Model",
                      value: product_data?.model || "Loading...",
                    },
                    {
                      title: "Color",
                      value: product_data?.color || "Loading...",
                    },
                    {
                      title: "Memory",
                      value: product_data?.memory || "Loading...",
                    },
                    {
                      title: "Processor",
                      value: product_data?.processor || "Loading...",
                    },
                    { title: "OS", value: product_data?.os || "Loading..." },
                    {
                      title: "Display size",
                      value: product_data?.displaySize || "Loading...",
                    },
                    {
                      title: "Main camera",
                      value: product_data?.camera || "Loading...",
                    },
                    {
                      title: "Battery",
                      value: product_data?.battery || "Loading...",
                    },
                    {
                      title: "Description",
                      value: product_data?.description || "Loading...",
                    },
                    {
                      title: "Guarantee",
                      value:
                        "1 year from the manufacturer + 31 days from TechX",
                    },
                  ]
                : product_data?.category === "Macbook"
                ? [
                    {
                      title: "Brand",
                      value: product_data?.brand || "Loading...",
                    },
                    {
                      title: "Model",
                      value: product_data?.model || "Loading...",
                    },
                    {
                      title: "Color",
                      value: product_data?.color || "Loading...",
                    },
                    {
                      title: "Processor",
                      value: product_data?.processor || "Loading...",
                    },
                    { title: "CPU", value: product_data?.CPU || "Loading..." },
                    { title: "GPU", value: product_data?.GPU || "Loading..." },
                    {
                      title: "Memory",
                      value: product_data?.memory || "Loading...",
                    },
                    { title: "RAM", value: product_data?.RAM || "Loading..." },
                    {
                      title: "Graphics",
                      value: product_data?.graphics || "Loading...",
                    },
                    { title: "OS", value: product_data?.os || "Loading..." },
                    {
                      title: "Display size",
                      value: product_data?.displaySize || "Loading...",
                    },
                    {
                      title: "Main camera",
                      value: product_data?.camera || "Loading...",
                    },
                    {
                      title: "Battery",
                      value: product_data?.battery || "Loading...",
                    },
                    {
                      title: "Description",
                      value: product_data?.description || "Loading...",
                    },
                    {
                      title: "Guarantee",
                      value:
                        "1 year from the manufacturer + 31 days from TechX",
                    },
                  ]
                : product_data?.category === "AirPods"
                ? [
                    {
                      title: "Brand",
                      value: product_data?.brand || "Loading...",
                    },
                    {
                      title: "Model",
                      value: product_data?.model || "Loading...",
                    },
                    {
                      title: "Color",
                      value: product_data?.color || "Loading...",
                    },
                    {
                      title: "Processor",
                      value: product_data?.processor || "Loading...",
                    },
                    {
                      title: "Battery",
                      value: product_data?.battery || "Loading...",
                    },
                    {
                      title: "Description",
                      value: product_data?.description || "Loading...",
                    },
                    {
                      title: "Guarantee",
                      value:
                        "1 year from the manufacturer + 31 days from TechX",
                    },
                  ]
                : product_data?.category === "Watch"
                ? [
                    {
                      title: "Brand",
                      value: product_data?.brand || "Loading...",
                    },
                    {
                      title: "Model",
                      value: product_data?.model || "Loading...",
                    },
                    {
                      title: "Color",
                      value: product_data?.color || "Loading...",
                    },
                    {
                      title: "Processor",
                      value: product_data?.processor || "Loading...",
                    },
                    { title: "CPU", value: product_data?.CPU || "Loading..." },
                    { title: "GPU", value: product_data?.GPU || "Loading..." },
                    {
                      title: "Memory",
                      value: product_data?.memory || "Loading...",
                    },
                    { title: "RAM", value: product_data?.RAM || "Loading..." },
                    { title: "OS", value: product_data?.os || "Loading..." },
                    {
                      title: "Display size",
                      value: product_data?.displaySize || "Loading...",
                    },
                    {
                      title: "Battery",
                      value: product_data?.battery || "Loading...",
                    },
                    {
                      title: "Description",
                      value: product_data?.description || "Loading...",
                    },
                    {
                      title: "Guarantee",
                      value:
                        "1 year from the manufacturer + 31 days from TechX",
                    },
                  ]
                : product_data?.category === "Ipad"
                ? [
                    {
                      title: "Brand",
                      value: product_data?.brand || "Loading...",
                    },
                    {
                      title: "Model",
                      value: product_data?.model || "Loading...",
                    },
                    {
                      title: "Color",
                      value: product_data?.color || "Loading...",
                    },
                    {
                      title: "Processor",
                      value: product_data?.processor || "Loading...",
                    },
                    { title: "CPU", value: product_data?.CPU || "Loading..." },
                    { title: "GPU", value: product_data?.GPU || "Loading..." },
                    {
                      title: "Memory",
                      value: product_data?.memory || "Loading...",
                    },
                    { title: "RAM", value: product_data?.RAM || "Loading..." },
                    { title: "OS", value: product_data?.os || "Loading..." },
                    {
                      title: "Display size",
                      value: product_data?.displaySize || "Loading...",
                    },
                    {
                      title: "Main camera",
                      value: product_data?.camera || "Loading...",
                    },
                    {
                      title: "Battery",
                      value: product_data?.battery || "Loading...",
                    },
                    {
                      title: "Description",
                      value: product_data?.description || "Loading...",
                    },
                    {
                      title: "Guarantee",
                      value:
                        "1 year from the manufacturer + 31 days from TechX",
                    },
                  ]
                : product_data?.category === "Console"
                ? [
                    {
                      title: "Brand",
                      value: product_data?.brand || "Loading...",
                    },
                    {
                      title: "Model",
                      value: product_data?.model || "Loading...",
                    },
                    {
                      title: "Color",
                      value: product_data?.color || "Loading...",
                    },
                    {
                      title: "Processor",
                      value: product_data?.processor || "Loading...",
                    },
                    { title: "CPU", value: product_data?.CPU || "Loading..." },
                    { title: "GPU", value: product_data?.GPU || "Loading..." },
                    {
                      title: "Memory",
                      value: product_data?.memory || "Loading...",
                    },
                    { title: "RAM", value: product_data?.RAM || "Loading..." },
                    { title: "OS", value: product_data?.os || "Loading..." },
                    {
                      title: "Description",
                      value: product_data?.description || "Loading...",
                    },
                    {
                      title: "Guarantee",
                      value:
                        "1 year from the manufacturer + 31 days from TechX",
                    },
                  ]
                : [{ title: "No data available", value: ":(" }]
              ).map((item) => (
                <div
                  key={item.title}
                  className="flex items-center shadow-lg dark:bg-black rounded-md p-2 md:p-4">
                  <h6 className="text-black dark:text-white font-medium mr-2 flex-shrink-0">
                    {item.title}:
                  </h6>
                  <p className="text-gray-500 flex-grow">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*Reviews section.*/}
      <section>
        <motion.div
          id="reviews"
          className="mt-12"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
        />
        <div className=" mx-10 py-12 px-4 sm:px-6 lg:px-8 dark:bg-[#1d1d1d] shadow-lg rounded-lg">
          <h2 className="text-3xl font-extrabold tracking-tight dark:text-white text-center sm:text-4xl">
            Write Review
          </h2>
          <form className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            {!show_logged_content ? (
              <Input
                type="text"
                placeholder="Name"
                className="block w-full px-4 py-3 rounded-lg shadow-sm  sm:text-sm "
                value={user_name}
                onChange={(e) => SetUserName(e.target.value)}
              />
            ) : null}

            <div className="px-3 py-0.5 flex flex-row items-center justify-center">
              <p className="text-center p-3 py-[0.4] text-lg text-black dark:text-white font-bold">
                Grade
              </p>
              <span className="flex flex-row items-center">
                <>
                  <style>
                    {`
                    .rating {
                      display: inline-block;
                      opacity: 1;


                    }
                    
                    .rating input {
                      display: none;
                      opacity: 1;
                    }
                    
                    .rating label {
                      float: right;
                      cursor: pointer;
                      color: #ccc;
                      transition: color 0.3s, transform 0.3s, box-shadow 0.3s;
                    }
                    
                    .rating label:before {
                      content: '\\2605';
                      font-size: 30px;
                      transition: color 0.3s;
                    }
                    
                    .rating input:checked ~ label,
                    .rating label:hover,
                    .rating label:hover ~ label {
                      color: #ffc300;
                      transform: scale(1.2);
                      transition: color 0.3s, transform 0.3s, box-shadow 0.3s;
                      animation: bounce 0.5s ease-in-out alternate;
                    }
                    
                    @keyframes bounce {
                      to {
                        transform: scale(1.3);
                      }
                    }
                  `}
                  </style>
                  <div className="rating">
                    {[5, 4, 3, 2, 1].map((value) => (
                      <React.Fragment key={value}>
                        <input
                          type="radio"
                          id={`star${value}`}
                          name="reviewRating"
                          value={value}
                          checked={grade === value}
                          onChange={handleRatingChange}
                        />
                        <label htmlFor={`star${value}`}></label>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              </span>
            </div>
            <Input
              type="text"
              placeholder="Review"
              className="block w-full p-4 rounded-lg shadow-sm  sm:text-sm "
              value={user_review}
              onChange={(e) => SetUserReview(e.target.value)}
            />

            <Button
              className=" w-24 rounded-lg "
              onClick={(e) => handleSendReview(e)}>
              Send
            </Button>
          </form>
        </div>
        {all_reviews.length > 0
          ? all_reviews.map((review, index) => (
              <div className="dark:bg-[#1d1d1d] shadow-lg rounded-lg  items-center max-w-7xl mx-auto mt-3 py-5 px-4 sm:px-6 lg:px-8">
                <h1 className="text-lg font-bold">
                  {review.review_owner_name}
                </h1>
                <div className="flex py-2">
                  {[...Array(review.grade)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <hr className="my-4 border-gray-300" />
                <div>
                  <p>{review.review}</p>
                </div>
              </div>
            ))
          : null}
      </section>
    </main>
  );
};

export default ProductDetails;
