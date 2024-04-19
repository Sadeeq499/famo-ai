import { Spinner2 } from "@/Components/spinner";
import React from "react";
import img1 from "@/public/Images/person.jpg";
import Image from "next/image";
const Generate = ({ values, setvalues, handleSubmit, loading }) => {
  const personsImages = [
    {
      img: img1,
    },
    {
      img: img1,
    },
    {
      img: img1,
    },
    {
      img: img1,
    },
    {
      img: img1,
    },
    {
      img: img1,
    },
  ];
  return (
    <div className="border-[1px] border-solid border-[#D1D5DB] rounded-[12px] p-[16px_16px]">
      <div className="sm:col-span-3 mt-[8px]">
        <label
          htmlFor="parent"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose LLM
        </label>
        <div className="mt-2">
          <select
            value={values.parent}
            onChange={(e) => {
              setvalues({ ...values, parent: e.target.value });
            }}
            id="parent"
            name="parent"
            className="block  rounded-md border-0 py-[10px] px-[13px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6 w-[100%] outline-none placeholder:text-gray-400"
          >
            <option value="">Select LLm...</option>
            {/* {subCategories.map((item, i) => (
              <option key={i} value={item.id}>
                {item.category}
              </option>
            ))} */}
          </select>
        </div>
      </div>
      <div className="sm:col-span-4 mt-[10px]">
        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Prompt
        </label>
        <div className="mt-2">
          <textarea
            name=""
            id=""
            cols="20"
            value={values.category}
            onChange={(e) => {
              setvalues({ ...values, category: e.target.value });
            }}
            placeholder="The Starry Night"
            className="block w-full rounded-md border-0 py-1.5 px-[13px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none h-[107px]"
          ></textarea>
        </div>
      </div>

      <div className="sm:col-span-4 mt-[10px]">
        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose Model
        </label>
        <div className="mt-2 flex flex-row items-center gap-4">
          {personsImages.map((item, i) => (
            <span key={i}>
              <Image
                width={65}
                height={65}
                src={item.img}
                alt="hello"
                className="h-[65px] w-[65px] rounded-[100%] object-cover object-center"
              />
            </span>
          ))}
        </div>
      </div>

      <button
        className="bg-indigo-600 hover:bg-indigo-500 w-[100%] text-white p-[8px_10px] rounded-[10px] mt-[19px]"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <Spinner2 /> : "Generate"}
      </button>
    </div>
  );
};

export default Generate;
