import { Spinner2 } from "@/Components/spinner";
import React from "react";

const AddCategory = ({
  values,
  setvalues,
  handleSubmit,
  subCategories,
  categoryLoading,
}) => {
  return (
    <div className="border-[1px] border-solid border-[#D1D5DB] rounded-[12px] p-[16px_16px]">
      <p className="text-[18px] font-[700]">Add Category</p>
      <div className="sm:col-span-4 mt-[10px]">
        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Category Name
        </label>
        <div className="mt-2">
          <input
            id="category"
            name="category"
            type="text"
            value={values.category}
            onChange={(e) => {
              setvalues({ ...values, category: e.target.value });
            }}
            placeholder="Insert Name"
            className="block w-full rounded-md border-0 py-1.5 px-[13px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="sm:col-span-3 mt-[8px]">
        <label
          htmlFor="parent"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Parent Category
        </label>
        <div className="mt-2">
          <select
            value={values.parent}
            onChange={(e) => {
              setvalues({ ...values, parent: e.target.value });
            }}
            id="parent"
            name="parent"
            className="block  rounded-md border-0 py-[10px] px-[13px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6 w-[100%]"
          >
            <option value="">Select Category...</option>
            {subCategories.map((item, i) => (
              <option key={i} value={item.id}>
                {item.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="bg-indigo-600 hover:bg-indigo-500 w-[100%] text-white p-[8px_10px] rounded-[10px] mt-[19px]"
        onClick={handleSubmit}
        disabled={categoryLoading}
      >
        {categoryLoading ? <Spinner2 /> : "Add Category"}
      </button>
    </div>
  );
};

export default AddCategory;
