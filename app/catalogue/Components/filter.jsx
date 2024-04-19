"use client";
import { Spinner2 } from "@/Components/spinner";
import React, { useEffect, useState } from "react";

const Filter = ({
  categories,
  subCategories,
  handleFilter,
  filterValues,
  setfilterValues,
}) => {
  const [subCategories0, setsubCategories0] = useState([]);
  useEffect(() => {
    setfilterValues({ ...filterValues, sub_category_id: "" });
    let records = categories.filter((item) => {
      return item.parent === filterValues.category_id && item.parent !== "";
    });
    setsubCategories0(records);
  }, [filterValues.category_id]);

  return (
    <div className="mt-2 border-[1px] border-solid border-[#D1D5DB] rounded-[12px] p-[16px_16px]">
      <p className="text-center text-[18px] font-[500] mb-[15px]">Filter</p>
      <div className="flex flex-row items-end gap-4">
        <div className="w-[32%]">
          <label
            htmlFor="category_id"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            value={filterValues.category_id}
            onChange={(e) => {
              setfilterValues({ ...filterValues, category_id: e.target.value });
            }}
            className="mt-2 block w-full outline-none rounded-md border-0  p-[11px] text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select Category...</option>
            {subCategories.map((item, i) => (
              <option key={i} value={item.id}>
                {item.category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[32%]">
          <label
            htmlFor="sub_categpry_id"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Sub-Catregory
          </label>
          <select
            id="sub_categpry_id"
            name="sub_categpry_id"
            value={filterValues.sub_category_id}
            onChange={(e) => {
              setfilterValues({
                ...filterValues,
                sub_category_id: e.target.value,
              });
            }}
            className="mt-2 block w-full outline-none rounded-md border-0 p-[11px] text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="Canada"
          >
            <option value="">Select Sub-Category...</option>
            {subCategories0.map((item, i) => (
              <option key={i} value={item.id}>
                {item.category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[32%]">
          <label
            htmlFor="gender"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value=""
            className="mt-2 block w-full outline-none rounded-md border-0  p-[11px] text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="">Select Gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="w-[15%]">
          <button
            className="bg-indigo-600 hover:bg-indigo-500 w-[100%] text-white p-[8px_10px] rounded-[10px] "
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
