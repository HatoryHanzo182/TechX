"use client";
import { useState } from "react";

import Link from "next/link";
import { shopName } from "@/lib/constants";

const Signin = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSumbit = async (e) => {
    // Existing logic...
  };

  return (
    <div className="flex  justify-center text-slate-800 mt-20">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[20.125rem] -translate-x-1/3 rotate-[50deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="flex w-full lg:w-1/2 flex-col">
        <div className="flex justify-center pt-6 text-justify ">
          {/* <a href="#" class="text-2xl  font-bold text-white   animate-pulse">
            {shopName}
          </a> */}
        </div>
        <div className="my-2 mx-auto flex flex-col justify-center px-6 pt-8  md:justify-start  lg:w-3/4">
          <p className="text-center sm:text-left text-3xl text-white font-bold">
            Sign in to your account
          </p>
          <p className="mt-6 text-center sm:text-left text-gray-500 font-medium">
            No account?{" "}
            <Link
              href="/signup"
              className="ml-1 whitespace-nowrap font-semibold text-white underline"
            >
              Sign up here
            </Link>
          </p>
          <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white bg-white ">
            <img
              className="mr-2 h-5"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt="logo"
            />
            Get started with Google
          </button>
          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            {/* <div class="absolute left-1/2 h-6 -translate-x-1/2 bg-black px-4 text-center text-sm text-gray-500">
              Or use email instead
            </div> */}
          </div>
          <form
            className="flex flex-col items-stretch pt-3 md:pt-8"
            onSubmit={handleSumbit}
          >
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="email"
                  id="login-email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="login-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                />
              </div>
            </div>

            <button className="mt-6 w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signin;
