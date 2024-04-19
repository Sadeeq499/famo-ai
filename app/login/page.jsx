"use client";

import Image from "next/image";
import FAMOAILogo from "../../public/Images/famologoblackonwhite.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";

const Login = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.log(result);
      }
    } catch (err) {
      console.error("error", err.errors[0].longMessage);
    }
  };

  return (
    <div className="bg-[#FF8C32] w-screen h-screen flex items-center justify-center">
      <div className="bg-white w-[630px] h-[735px] px-[57px] pt-[49px] rounded">
        <div className="flex flex-col items-center justify-center">
          <Image src={FAMOAILogo} alt="FAMOAILogo" />
          <h6 className="mt-9 mb-1 text-3xl font-bold leading-10">
            Login to Account
          </h6>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="mb-10">
            <label
              htmlFor="email"
              className="block mb-3 text-lg font-semibold leading-6 text-[#202224] opacity-80"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmailAddress(e.target.value)}
              className="bg-[#F1F4F9] border border-[#D8D8D8] text-gray-900 text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="example@gmail.com"
              required={true}
            />
          </div>
          <div className="mb-12">
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-lg font-semibold leading-6 text-[#202224] opacity-80"
              >
                Password
              </label>
              <div>
                <Link
                  href="/"
                  className="block text-lg font-semibold leading-6 text-[#FF8C32] opacity-80 underline"
                >
                  Forget Password?
                </Link>
              </div>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#F1F4F9] border border-[#D8D8D8] text-gray-900 text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="••••••••••"
              required={true}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[80%] text-white bg-[#FF8C32] font-semibold rounded-lg text-xl leading-7 py-4 text-center opacity-90 hover:opacity-100"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-4 gap-1">
          <p className="text-lg font-semibold leading-6 text-[#202224] opacity-80">
            Don’t have an account?
          </p>
          <Link
            href="/login"
            className="text-lg font-semibold leading-6 text-[#FF8C32] opacity-80 underline"
          >
            Create account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
