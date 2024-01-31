"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { shopName } from "@/lib/constants";

const Signup = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists");
        return;
      }

      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/signin");
      } else {
        console.log("user registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="flex flex-wrap w-full text-slate-800 mt-16">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="hidden sm:flex sm:w-full  lg:w-1/2 h-screen justify-center   text-white text-center  w-1/1">
        {/* Content for the left side, visible only on small and large screens */}
        <div className="mx-auto my-10 py-16 px-8 xl:w-[50rem] mt-44">
          <span className="rounded-full bg-white px-3 py-1 font-medium text-blue-600 ">
            New Feature
          </span>
          <p className="my-6 text-3xl font-semibold leading-10">
            Create animations with{" "}
          </p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
            necessitatibus nostrum repellendus ab totam.
          </p>
          <a
            href="#"
            className="font-semibold tracking-wide text-white underline underline-offset-4"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 flex-col">
        <div className="flex justify-center pt-6 sm:justify-center sm:pl-12">
          {/* <a href="#" class="text-2xl font-bold text-white animate-pulse">
            {shopName}
          </a> */}
        </div>
        <div className="my-2 mx-auto flex flex-col justify-center px-6 pt-8 sm:px-8 md:justify-start md:px-12 lg:w-3/4">
          <p className="text-center sm:text-left text-3xl text-white font-bold">
            Create your free account
          </p>
          <p className="mt-6 text-center sm:text-left text-gray-500 font-medium">
            Already using wobble?
            <Link
              href="/signin"
              className="ml-1 whitespace-nowrap font-semibold text-white"
            >
              Login here
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
            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-black px-4 text-center text-sm text-gray-500">
              Or use email instead
            </div>
          </div>
          <form
            className="flex flex-col items-stretch pt-3 md:pt-8"
            onSubmit={handleSumbit}
          >
            {/* Input fields and Sign Up button */}
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="text"
                  id="login-name"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Name"
                />
              </div>
            </div>
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
                  placeholder="Password (minimum 8 characters)"
                />
              </div>
            </div>
            <div className="block">
              <input
                className="mr-2 h-5 w-5 mt-[3px] rounded border border-gray-300 bg-contain bg-no-repeat align-top shadow focus:shadow"
                type="checkbox"
                id="remember-me"
              />
              <label className="inline-block text-gray-500" for="remember-me">
                I agree to the{" "}
                <a className="underline" href="#">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button className="mt-6 w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
