"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timer;

    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false); // Скрывает Alert через 2 секунды
      }, 4000); // 2000 мс = 2 секунды
    }

    return () => clearTimeout(timer); // Очистка таймера
  }, [showAlert]);

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are necessary.");
      setShowAlert(true);
      return;
    }

    try {
      const ResUserExists = await fetch(
        "http://localhost:3001/CheckUserExists", // <<----- Проверяет есть ли пользователь в базе.
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const { existing_user } = await ResUserExists.json();

      if (existing_user) {
        // <<----- Если есть, проверим пароль.
        const ResProofPass = await fetch(
          "http://localhost:3001/ProofPass", //  <<------ Проверяем пароль пользователя.
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          }
        );

        const { success } = await ResProofPass.json();

        if (success) {
          try {
            const reply_token = await fetch(
              "http://localhost:3001/GenerateToken", //   <<------ Создадим токен.
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              }
            );

            const { token } = await reply_token.json();

            localStorage.setItem("token", token);

            const CreateSessionResponse = await fetch(
              "http://localhost:3001/CreateSession", // <<----- Создадим пользователю сессию.
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ email }),
              }
            );

            const create_session_data = await CreateSessionResponse.json();

            if (create_session_data) 
            {
              // <---- Сессия создана.
              window.location.href = "/";
              console.log("Sessia is complite");
            } //    <<<----- Ошибка при создании сесси.
            else {
              console.log("Sessia is not complite");
            }
          } catch (error) {
            setShowAlert(true);
            console.error("Error during signing the token:", error);
          }
        } else {
          setShowAlert(true);
          setError("Password is incorrect");
          console.error("SIGN IN: false", error);
          return;
        }
      } else {
        setShowAlert(true);
        setError("User not found");
        console.error("User not found");
        return;
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="flex h-screen  justify-center text-slate-800 ">
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
      <div className="fixed right-0 top-32 mr-4 mt-4 w-[250px]">
        {showAlert && error && (
          <Alert>
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="flex w-full lg:w-1/2 flex-col">
        <div className="flex justify-center pt-6 text-justify "></div>
        <div className="my-2 mx-auto flex flex-col justify-center px-6 pt-8  md:justify-start  lg:w-3/4 mt-20">
          <p className="text-center sm:text-left text-3xl text-black dark:text-white font-bold">
            Sign in to your account
          </p>
          <p className="mt-6 text-center sm:text-left text-gray-500 font-medium">
            No account?{" "}
            <Link
              href="/signup"
              className="ml-1 whitespace-nowrap font-semibold text-black dark:text-white underline"
            >
              Sign up here
            </Link>
          </p>
          {/* <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white bg-white ">
            <img
              className="mr-2 h-5"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt="logo"
            />
            Get started with Google
          </button> */}
          <Button onClick={() => signIn("google")} className="  mt-6 ">
            <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              ></path>
            </svg>
            Google
          </Button>
          {/* <div className="relative mt-8 flex h-px place-items-center bg-gray-200"></div> */}
          <hr className="relative mt-8 flex h-px place-items-center bg-gray-500" />
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
                  className="w-full flex-shrink appearance-none b py-2 px-4 text-base  bg-white focus:outline-none"
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

            <Button className=" mt-6 ">Sign In</Button>
            {/* <button className="mt-6 w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2">
              Sign in
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signin;
