"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import bcrypt from "bcryptjs";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PullOutOfSession } from "../../lib/session";
import { set } from "mongoose";
// import SquaresAnimation from "../SquaresAnimation";

const Signup = () => {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [conf_u, SetConfU] = useState();
  const [is_modal_confirm_mail_open, SetisModalConfirmMailOpen] =
    useState(false);
  const input_confirm_refs = [useRef(), useRef(), useRef(), useRef()];
  const router = useRouter();

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are necessary.");
      setShowAlert(true);
      return;
    }

    try {
      const ResUserExists = await fetch(
        "https://techx-nodeserver.vercel.app/CheckUserExists",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const { existing_user } = await ResUserExists.json();

      if (existing_user) {
        showAlert(true);
        setError("User exists");
        console.error("User exists", error); //  <<---- Пользователь уже существует.
        return;
      } else {
        SetisModalConfirmMailOpen(true);

        const SendConf = await fetch(
          "https://techx-nodeserver.vercel.app/SendConfirmationCodeEmail", //  <<---- Отправляем код подтверждения.
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );

        const { conf } = await SendConf.json();

        SetConfU(conf);
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  const handleInputChange = (index, e) => {
    const input = e.target;

    if (input.value.length === 1) {
      if (index < input_confirm_refs.length - 1)
        input_confirm_refs[index + 1].current.focus();
    }
  };

  const handleClearClick = () => {
    input_confirm_refs.forEach((ref) => {
      ref.current.value = "";
    });
    input_confirm_refs[0].current.focus();
  };

  const handleVerifyClick = async () => {
    const code = input_confirm_refs.map((ref) => ref.current.value).join("");

    if (conf_u === code) {
      const res = await fetch(
        "https://techx-nodeserver.vercel.app/NewUser", //  <<---- Добавим пользователя.
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password: await bcrypt.hash(password, 10),
          }),
        }
      );

      if (res.ok) window.location.href = "/signin";
      else
        <div className="fixed right-0 top-32 mr-4 mt-4 w-[250px]">
          {showAlert && error && (
            <Alert>
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>User registation failed</AlertDescription>
            </Alert>
          )}
        </div>;
    } else {
      <div className="fixed right-0 top-32 mr-4 mt-4 w-[250px]">
        {showAlert && error && (
          <Alert>
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Unknown token</AlertDescription>
          </Alert>
        )}
      </div>;
    }
  };

  return (
    <div className="flex flex-wrap w-full">
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
      <div className="fixed right-0 top-32 mr-4 mt-4 w-[250px]">
        {showAlert && error && (
          <Alert>
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <div className="hidden sm:flex sm:w-full  lg:w-1/2 h-screen justify-center   text-black dark:text-white text-center  w-1/1">
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
            className="font-semibold tracking-wide  underline underline-offset-4"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 flex-col">
        <div className="flex justify-center pt-6 sm:justify-center sm:pl-12"></div>
        <div className="my-2 mx-auto mt-16 flex flex-col justify-center px-6 pt-8 sm:px-8 md:justify-start md:px-12 lg:w-3/4 text-black dark:text-white">
          <p className="text-center sm:text-left text-3xl  font-bold">
            Create your free account
          </p>
          <p className="mt-6 text-center sm:text-left text-gray-500 font-medium">
            Already using wobble?
            <Link
              href="/signin"
              className="ml-1 whitespace-nowrap font-semibold text-gray-400  underline "
            >
              Sign in here
            </Link>
          </p>
          <Button className=" mt-6 " onClick={() => signIn("google")}>
            <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
              <path
                fill="currentColor"
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              ></path>
            </svg>
            Google
          </Button>
          {/* <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none text-white ring-offset-2 transition   bg-black ">
            <img
              className="mr-2 h-5"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt="logo"
            />
            Google
          </button> */}
          <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white dark:bg-black px-4 text-center text-sm text-gray-500">
              Or use email instead
            </div>
          </div>
          <form
            className="flex flex-col items-stretch pt-3 md:pt-8"
            onSubmit={handleSumbit}
          >
            {/* Input fields and Sign Up button */}
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-2 transition text-white">
                <input
                  type="text"
                  id="login-name"
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Name"
                />
                {/* <Input type="name" placeholder="Name" /> */}
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
                {/* <Input type="email" placeholder="Email" /> */}
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="elative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="login-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password (minimum 8 characters)"
                />
                {/* <Input type="password" placeholder="Password" /> */}
              </div>
            </div>
            {/* <div className="flex flex-row">
              <div className="dark:text-white text-black">
                <Checkbox id="terms" className="mt-1 mr-2" />
                <label>I agree to the terms and privacy policy</label>
              </div>
            </div> */}

            <div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">
                  I agree to the terms and privacy policy
                </Label>
              </div>
            </div>

            <Button className="mt-6 "> Sign Up </Button>
            {/* <button className="mt-6 w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2">
              Sign Up
            </button> */}
          </form>
        </div>
      </div>
      {/* Модальное окно */}
      {is_modal_confirm_mail_open && (
        <>
          <style>
            {`
            .modal-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              backdrop-filter: blur(5px);
              background: rgba(0, 0, 0, 0.5); /* semi-transparent background */
            }

           .form {
            --black: #000000;
            --ch-black: #141414;
            --eer-black: #1b1b1b;
            --night-rider: #2e2e2e;
            --white: #ffffff;
            --af-white: #f3f3f3;
            --ch-white: #e1e1e1;
            --tomato: #fa5656;
            font-family: Helvetica, sans-serif;
            padding: 25px;
            display: flex;
            max-width: 520px;
            flex-direction: column;
            align-items: center;
            overflow: hidden;
            color: var(--af-white);
            background-color: var(--black);
            border-radius: 8px;
            position: relative;
            box-shadow: 10px 10px 10px rgba(0, 0, 0, .1);
          }
          
          /*----heading and description-----*/
          
          .info {
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .title {
            font-size: 1.5rem;
            font-weight: 900;
          }
          
          .description {
            margin-top: 10px;
            font-size: 1rem;
          }
          
          /*----input-fields------*/
          
          .form .input-fields {
            display: flex;
            justify-content: space-between;
            gap: 10px;
          }
          
          .form .input-fields input {
            height: 2.5em;
            width: 2.5em;
            outline: none;
            text-align: center;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            font-size: 1.5rem;
            color: var(--af-white);
            border-radius: 5px;
            border: 2.5px solid var(--eer-black);
            background-color: var(--eer-black);
          }
          
          .form .input-fields input:focus {
            border: 1px solid var(--af-white);
            box-shadow: inset 10px 10px 10px rgba(0, 0, 0, .15);
            transform: scale(1.05);
            transition: 0.5s;
          }
          
          /*-----verify and clear buttons-----*/
          
          .action-btns {
            display: flex;
            margin-top: 20px;
            gap: 0.5rem;
          }
          
          .verify {
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 1rem;
            font-weight: 500;
            color: var(--night-rider);
            text-shadow: none;
            background: var(--af-white);
            box-shadow: transparent;
            border: 1px solid var(--af-white);
            transition: 0.3s ease;
            user-select: none;
          }
          
          .verify:hover,.verify:focus {
            color: var(--night-rider);
            background: var(--white);
          }
          
          .clear {
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-size: 1rem;
            font-weight: 500;
            color: var(--ch-white);
            text-shadow: none;
            background: transparent;
            border: 1px solid var(--ch-white);
            transition: 0.3s ease;
            user-select: none;
          }
          
          .clear:hover,.clear:focus {
            color: var(--tomato);
            background-color: transparent;
            border: 1px solid var(--tomato);
          }
          
          /*-----close button------*/
          
          .close {
            position: absolute;
            right: 10px;
            top: 10px;
            background-color: var(--night-rider);
            color: var(--ch-white);
            height: 30px;
            width: 30px;
            display: grid;
            place-items: center;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: .5s ease;
          }
          
          .close:hover {
            background-color: var(--tomato);
            color: var(--white);
          }
         `}
          </style>
          <div className="modal-wrapper">
            <form className="form">
              <span
                className="close"
                onClick={() => SetisModalConfirmMailOpen(false)}
              >
                X
              </span>
              <div className="info">
                <span className="title">Email Сonfirmation</span>
                <p className="description">
                  We have sent you an email with a cheat code, please enter the
                  verification code. If there is still no letter, check your
                  mail for errors.
                </p>
              </div>
              <div className="input-fields">
                <input
                  ref={input_confirm_refs[0]}
                  maxLength="1"
                  type="tel"
                  placeholder=""
                  onChange={(e) => handleInputChange(0, e)}
                />
                <input
                  ref={input_confirm_refs[1]}
                  maxLength="1"
                  type="tel"
                  placeholder=""
                  onChange={(e) => handleInputChange(1, e)}
                />
                <input
                  ref={input_confirm_refs[2]}
                  maxLength="1"
                  type="tel"
                  placeholder=""
                  onChange={(e) => handleInputChange(2, e)}
                />
                <input
                  ref={input_confirm_refs[3]}
                  maxLength="1"
                  type="tel"
                  placeholder=""
                  onChange={(e) => handleInputChange(3, e)}
                />
              </div>
              <div className="action-btns">
                <a href="#" className="verify" onClick={handleVerifyClick}>
                  Verify
                </a>
                <a className="clear" onClick={handleClearClick}>
                  Clear
                </a>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
