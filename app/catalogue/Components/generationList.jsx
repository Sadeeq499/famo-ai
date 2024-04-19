"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// @ts-ignore
import person1 from "@/public/Images/person1.jpg";
// @ts-ignore
import dollar from "@/public/Images/dollar.png";
import { TrashIcon } from "@heroicons/react/24/outline";
import ModelsList from "./modelsList";
import { Spinner2 } from "@/Components/spinner";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getGenerations, updateGeneration } from "@/supabase/apis/generations";
import { useDispatch } from "react-redux";
import { generationsArray } from "@/redux/userActions";

const GenerationList = ({
  item,
  categories,
  subCategories,
  generations,
  setgenerations,
  generationRecords,
  deletePopup,
  setdeletePopup,
  llmsRecords,
  modelUpdateValues,
  setModelupdateValues,
  setupdateGeneration,
}) => {
  const dispatch = useDispatch();

  const defaultUpdateValue = {
    category_id: item.category_id ? item.category_id : "",
    sub_category_id: item.sub_category_id ? item.sub_category_id : "",
    description: item.description ? item.description : "",
    is_active: item.is_active,
    generated_images: item?.generated_images ? item?.generated_images : [],
    coins: item?.coins ? item?.coins : 0,
  };

  const [values, setupdateValues] = useState(defaultUpdateValue);
  const [loading, setloading] = useState(false);
  const [selectedImage, setselectedImage] = useState({
    url: item?.generated_images
      ? item?.generated_images?.length > 0
        ? item?.generated_images[0].image_url
        : person1
      : person1,
    id: 0,
  });
  const handleChange = (e) => {
    setupdateValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setupdateValues({
      category_id: item.category_id ? item.category_id : "",
      sub_category_id: item.sub_category_id ? item.sub_category_id : "",
      description: item.description ? item.description : "",
      is_active: item.is_active ,
      generated_images: item?.generated_images ? item?.generated_images : [],
      coins: item?.coins ? item?.coins : 0,
    });
  }, [item]);

  const [subCategories0, setsubCategories0] = useState([]);
  useEffect(() => {
    setupdateValues({ ...values, sub_category_id: item.sub_category_id });
    let records = categories.filter((item) => {
      return item.parent === values.category_id && item.parent !== "";
    });
    setsubCategories0(records);
  }, [values.category_id]);

  const handleUpdate = async () => {
    try {
      setloading(true);
      let updatevalues = {
        ...values,
        id: item.id,
      };

      let res = await updateGeneration(updatevalues);
      if (res?.status) {
        toast.success("Changes have been successfully saved");
        setloading(false);
        generationRecords();
      } else {
        console.log(res.error);
        throw "error";
      }
    } catch (error) {
      console.log("🚀 ~ handleUpdate ~ error:", error);
      toast.error("Something went wrong");
      setloading(false);
    }
  };

  const aiModel = (id) => {
    let record = llmsRecords.find((item) => {
      return item.id === id;
    });
    if (record) {
      return record.name;
    } else {
      return `""`;
    }
  };

  const handleCheckbox = (position) => {
    let images = values.generated_images ? [...values.generated_images] : [];

    images = values.generated_images.map((image, index) => {
      if (index === position) {
        // Toggle the value of is_active
        return { ...image, is_active: !image.is_active };
      }
      return image;
    });

    setupdateValues({ ...values, generated_images: images });
  };

  const handleSoloImageDelete = () => {
    setdeletePopup(true);
    let images = item?.generated_images ? [...item.generated_images] : [];
    if (images.length > 0) {
      images.shift(); // Remove the first element from the array
    }
    setModelupdateValues({
      ...modelUpdateValues,
      id: item.id,
      image: true,
      generatedImages: images, // Set the updated array of images
    });
  };

  const handleDelete = (position) => {
    setdeletePopup(true);
    let images = item?.generated_images ? [...item.generated_images] : [];
    if (images.length > 0) {
      images = images.filter((image, index) => {
        return index !== position; // Keep all images except the one at the specified position
      }); // Remove the first element from the array
    }

    setModelupdateValues({
      ...modelUpdateValues,
      id: item.id,
      image: true,
      generatedImages: images, // Set the updated array of images
    });
  };

  return (
    <div className="border-[1px] border-solid border-[#D1D5DB] rounded-[12px] p-[16px_16px] mt-4">
      <div className="flex flex-row items-center justify-between">
        <div className="border-[1px] border-solid border-borderclr flex flex-row items-center rounded-[12px]">
          <p
            onClick={() => {
              setupdateValues({ ...values, is_active: true });
            }}
            className={` p-[12px_16px] cursor-pointer  ${
              values.is_active ? "bg-[#E4F1FF] rounded-[12px]" : "opacity-[0.5]"
            } `}
          >
            Active
          </p>
          <p
            onClick={() => {
              setupdateValues({ ...values, is_active: false });
            }}
            className={`p-[12px_16px] cursor-pointer ${
              !values.is_active
                ? "bg-[#E4F1FF] rounded-[12px]"
                : "opacity-[0.5]"
            }`}
          >
            Inactive
          </p>
        </div>
        <div className="flex flex-row items-center border-[1px] border-solid border-borderclr p-[9px] rounded-[12px] pl-[12px] pr-[0px]">
          <Image
            src={dollar}
            width={24}
            height={24}
            alt=""
            className="w-[26px] h-[26px] relative top-[1px] rounded-[13px] object-cover object-top"
          />{" "}
          <input
            type="text"
            className="text-[16px] text-[#ABADC6] w-[30px] outline-none"
            placeholder="0"
            value={values.coins}
            pattern="[0-9]*" // Only allow numeric characters
            onChange={(e) => {
              const inputVal = e.target.value;
              const onlyNums = inputVal.replace(/[^0-9]/g, ""); // Remove non-numeric characters
              setupdateValues({ ...values, coins: onlyNums });
            }}
          />
        </div>
      </div>
      <div className="flex flex-row gap-[18px] mt-4">
        <div className="w-[64%] relative">
          {item?.generated_images?.length > 0 ? (
            <Image
              src={(selectedImage.url==null)?'https://dszdntohmezzveoalhfz.supabase.co/storage/v1/object/public/uploads/placeholder.png':selectedImage.url}
              width={500}
              height={500}
              alt=""
              className={`w-[100%] ${
                selectedImage.url ===
                "https://dszdntohmezzveoalhfz.supabase.co/storage/v1/object/public/uploads/placeholder.png"
                  ? "h-[850px]"
                  : "h-[auto]"
              } rounded-[13px] object-cover object-center bg-[#eeeeee]`}
              unoptimized={true}
            />
          ) : (
            <div className="w-[100%] h-[850px] rounded-[13px] object-cover object-top bg-[#eeeeee]"></div>
          )}
          {item?.generated_images?.length > 0 && (
            <div className="absolute bottom-[16px] left-0 flex w-[100%] justify-between px-[16px] items-center">
              <span
                className="bg-[#dc2626] p-[5px_8px] rounded-[8px] cursor-pointer"
                onClick={() => {
                  handleDelete(selectedImage.id);
                }}
              >
                <TrashIcon className="w-[20px] h-[20px] text-[white] " />
              </span>
              <input
                type="checkbox"
                name=""
                id=""
                onChange={() => {
                  handleCheckbox(selectedImage.id);
                }}
                checked={values.generated_images[selectedImage.id]?.is_active}
                className="w-[32px] h-[22px]"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col w-[36%]">
          <p className="text-textclr pb-1 font-[600]">Prompt</p>
          <p className="text-[14px] text-justify font-[500] text-[#6B7280]">
            {item.prompt}
          </p>
          <div className="mt-[6px]">
            <p className="text-textclr pb-1 font-[600]">LLM</p>
            <p className="text-[14px] text-justify font-[500] text-[#6B7280]">
              {aiModel(item.llm_id)}
            </p>
          </div>

          <div className="sm:col-span-4 mt-[0px]">
            <label
              htmlFor="description"
              className="block  leading-6 text-textclr mt-2 font-[600] text-[14px]"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="The Starry Night"
                className="block w-full rounded-md border-0 py-1.5 px-[13px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none h-[107px]"
              ></textarea>
            </div>
          </div>
          <div className="">
            <label
              htmlFor="category_id"
              className="block  leading-6 text-textclr mt-2 font-[600] text-[14px]"
            >
              Category
            </label>
            <select
              id="category_id"
              name="category_id"
              value={values.category_id}
              onChange={(e) => {
                handleChange(e);
              }}
              className="mt-2 block w-full outline-none rounded-md border-0  p-[11px] text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue=""
            >
              <option value="">Select Category...</option>
              {subCategories.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.category}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label
              htmlFor="sub_category_id"
              className="block  leading-6 text-textclr mt-2 font-[600] text-[14px]"
            >
              Sub-Category
            </label>
            <select
              id="sub_category_id"
              name="sub_category_id"
              value={values.sub_category_id}
              onChange={(e) => {
                handleChange(e);
              }}
              className="mt-2 block w-full outline-none rounded-md border-0  p-[11px] text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue=""
            >
              <option value="">Select Sub-Category...</option>
              {subCategories0.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.category}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <button
              className="bg-indigo-600 hover:bg-indigo-500 w-[100%] text-white p-[8px_10px] rounded-[10px] "
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? (
                // @ts-ignore
                <Spinner2 />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
          <div className="mt-1">
            <button
              className="bg-[#424867] hover:bg-[#424867d5] w-[100%] text-white p-[8px_10px] rounded-[10px] "
              onClick={() => {
                setModelupdateValues({
                  llm_id: item.llm_id ? item.llm_id : "",
                  prompt: item.prompt ? item.prompt : "",
                  models: [],
                  id: item.id,
                });
                setupdateGeneration(true);
              }}
            >
              Add Generate +
            </button>
          </div>
          <div className="mt-1">
            <button
              className="bg-[#DC2626] hover:bg-[#ff0000c8] w-[100%] text-white p-[8px_10px] rounded-[10px] "
              onClick={() => {
                setdeletePopup(true);
                setModelupdateValues({
                  ...modelUpdateValues,
                  id: item.id,
                  image: false,
                });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <ModelsList
        handleDelete={handleDelete}
        handleCheckbox={handleCheckbox}
        values={values}
        setselectedImage={setselectedImage}
      />
    </div>
  );
};

export default GenerationList;
