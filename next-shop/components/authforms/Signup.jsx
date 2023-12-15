import { shopName } from "@/lib/constants";
import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div class="flex w-screen flex-wrap text-slate-800">
      <div class="relative hidden h-screen select-none flex-col justify-center bg-blue-800  text-center md:flex md:w-1/1">
        <div class="mx-auto my-10 py-16 px-8 text-white xl:w-[40rem]">
          <span class="rounded-full bg-white px-3 py-1 font-medium text-blue-600">
            New Feature
          </span>
          <p class="my-6 text-3xl font-semibold leading-10">
            Create animations with{" "}
          </p>
          <p class="mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
            necessitatibus nostrum repellendus ab totam.
          </p>
          <a
            href="#"
            class="font-semibold tracking-wide text-white underline underline-offset-4"
          >
            Learn More
          </a>
        </div>
      </div>
      <div class="flex w-full flex-col md:w-1/2">
        <div class="flex justify-center pt-6 md:justify-start md:pl-12">
          <a href="#" class="text-2xl font-bold text-white animate-pulse">
            {" "}
            {shopName}{" "}
          </a>
        </div>
        <div class="my-10 mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
          <p class="text-center text-3xl text-white font-bold md:text-left md:leading-tight">
            Create your free account
          </p>
          <p class="mt-6 text-center font-medium md:text-left text-gray-500">
            Already using wobble?
            <Link
              href="/signin"
              class="ml-1 whitespace-nowrap font-semibold text-white"
            >
              Login here
            </Link>
          </p>
          <button class="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white bg-white ">
            <img
              class="mr-2 h-5"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt="logo"
            />
            Get started with Google
          </button>
          <div class="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div class="absolute left-1/2 h-6 -translate-x-1/2 bg-black px-4 text-center text-sm text-gray-500">
              Or use email instead
            </div>
          </div>
          <form class="flex flex-col items-stretch pt-3 md:pt-8">
            <div class="flex flex-col pt-4">
              <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="text"
                  id="login-name"
                  class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Name"
                />
              </div>
            </div>
            <div class="flex flex-col pt-4">
              <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="email"
                  id="login-email"
                  class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </div>
            <div class="mb-4 flex flex-col pt-4">
              <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="login-password"
                  class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password (minimum 8 characters)"
                />
              </div>
            </div>
            <div class="block">
              <input
                class="mr-2 h-5 w-5 mt-[3px]  rounded border border-gray-300 bg-contain bg-no-repeat align-top shadow  focus:shadow"
                type="checkbox"
                id="remember-me"
              />
              <label class="inline-block text-gray-500" for="remember-me">
                {" "}
                I agree to the{" "}
                <a class="underline" href="#">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              class="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
