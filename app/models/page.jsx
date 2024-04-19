// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import CreateModel from "./Components/createModel";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  createModel,
  getModels,
  saveImagetoBucket,
  updateModelImages,
} from "@/supabase/apis/models";
import { Spinner2 } from "@/Components/spinner";
import UpdateModel from "./Components/updateModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { modelsArray } from "@/redux/userActions";

const settings = {
  className: "center",
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 4,
  swipeToSlide: true,
  afterChange: function (index) {
    console.log(
      `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    );
  },
};

let defaultModel = {
  modelName: "",
  gender: "",
  images: [],
};

export default function Models() {
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [modelsLoading, setmodelsLoading] = useState(true);
  const [models, setmodels] = useState([]);
  const [values, setvalues] = useState(defaultModel);
  const [addNew, setaddNew] = useState("");
  const [updateModel, setupdateModel] = useState(false);
  const [updateValues, setupdateValues] = useState(defaultModel);
  const dispatch = useDispatch();
  const reduxRecords = useSelector((records) => records);

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setvalues({
      ...values,
      images: [...values.images, ...selectedImages],
    });
  };

  const handleSubmit = async () => {
    if (!values.modelName || !values.gender || values.images.length === 0) {
      toast.error("Please fill out empty fields");
      return;
    } else {
      setloading(true);
      let imagesUrls = [];
      let isError = false;
      for (let i = 0; i < values.images.length; i++) {
        if (isError) {
          return;
        } else {
          const file = values.images[i];
          let res = await saveImagetoBucket(file.name, file);
          console.log("🚀 ~ handleSubmit ~ res:", res);
          if (res?.status) {
            imagesUrls.push(
              `https://dszdntohmezzveoalhfz.supabase.co/storage/v1/object/public/${res.key}`
            );
          } else {
            isError = true;
            console.log(res.error);
          }
        }
      }
      if (imagesUrls.length > 0 && !isError) {
        let res = await createModel(values, imagesUrls);
        if (res?.status) {
          setloading(false);
          setvalues(defaultModel);
          modelsRecords();
          setOpen(false);
          toast.success("Model created successfully");
        } else {
          console.log(res.error);
          setloading(false);
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");

        setloading(false);
      }
    }
  };

  const handleUpdate = async () => {
    let findObj = models.find((item) => {
      return item.id === updateValues.id;
    });
    console.log("🚀 ~ findObj ~ findObj:", findObj);
    if (findObj.images.length === updateValues.images.length) {
      toast.error("Images not updated");
      return;
    } else {
      try {
        setloading(true);
        let imagesUrls = [];
        let isError = false;
        for (let i = 0; i < updateValues.images.length; i++) {
          if (isError || typeof updateValues.images[i] === "string") {
            imagesUrls.push(updateValues.images[i]);
          } else {
            const file = updateValues.images[i];
            let res = await saveImagetoBucket(file.name, file);
            if (res?.status) {
              imagesUrls.push(
                `https://dszdntohmezzveoalhfz.supabase.co/storage/v1/object/public/${res.key}`
              );
            } else {
              isError = true;
              console.log(res.error);
            }
          }
        }
        if (!isError) {
          let res = await updateModelImages(updateValues, imagesUrls);
          if (res?.status) {
            toast.success("Model updated successfully");
            setloading(false);
            let records = models;
            let recordIndex = models.findIndex((item) => {
              return item.id === updateValues.id;
            });
            records[recordIndex].images = imagesUrls;
            setmodels(records);
            dispatch(modelsArray(records));
            setupdateValues(defaultModel);
            setupdateModel(false);
          } else {
            console.log(res.error);
            throw "error";
          }
        } else {
          throw "error";
        }
      } catch (error) {
        toast.error("Something went wrong");
        setloading(false);
      }
    }
  };

  const modelsRecords = async () => {
    setmodelsLoading(true);
    let res = await getModels();
    console.log("🚀 ~ modelsRecords ~ res:", res);
    if (res.status) {
      res.records.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      // Set the sorted records to the state variable `models`
      setmodels(res.records);
      dispatch(modelsArray(res.records));
      setmodelsLoading(false);
    } else {
      setmodelsLoading(false);
    }
  };

  useEffect(() => {
    if (reduxRecords.models.length > 0) {
      setmodels(reduxRecords.models);
      setmodelsLoading(false);
    } else {
      modelsRecords();
    }
  }, []);

  return (
    <div>
      <div>
        <p
          onClick={() => {
            setOpen(true);
          }}
          className="w-max bg-indigo-600 hover:bg-indigo-500  text-white rounded-[8px] p-[10px] pb-[11px] mb-[10px] cursor-pointer"
        >
          Create Model
        </p>
      </div>
      {modelsLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-208px)] w-[100%]">
          <Spinner2 color="model" />
        </div>
      ) : (
        <div className="flex flex-col gap-[38px] mt-[23px]">
          {models.map((item, i) => (
            <div key={i}>
              <p className="text-[20px] pb-[9px]">{item.name}</p>
              <div className="flex justify-between items-center mb-[14px]">
                <div className="flex flex-row items-center gap-3 ">
                  <p className="p-[8px_16px] rounded-[32px] border-[2px] border-solid border-[#9CA3AF0] text-[14px] font-600 text-[#9CA3AF]">
                    {item.gender === 0 ? "Male" : "Female"}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setupdateModel(true);
                      setupdateValues({
                        gender: item.gender,
                        modelName: item.name,
                        images: item.images,
                        id: item.id,
                      });
                    }}
                    className="w-max bg-indigo-600 hover:bg-indigo-500  text-white rounded-[8px] p-[8px] pb-[8px]  cursor-pointer"
                  >
                    Update
                  </button>
                </div>
              </div>
              <div className="slider-container w-[102%] relative left-[-11px]">
                {item.images.length > 4 ? (
                  <Slider {...settings}>
                    {item.images.map((image, i) => (
                      <div key={i}>
                        <div className="flex justify-center">
                          <Image
                            width={260}
                            alt="none"
                            height={200}
                            src={image}
                            className="rounded-[11px] h-[216px] object-cover w-[97%] bg-[#eeeeee]"
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="flex flex-row gap-[12px]">
                    {item.images.map((image, i) => (
                      <div key={i}>
                        <div className="flex justify-center">
                          <Image
                            alt="none"
                            width={280}
                            height={200}
                            src={image}
                            className="rounded-[11px] h-[216px] object-cover w-[280px] bg-[#eeeeee]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="relative">
        <CreateModel
          open={open}
          setOpen={setOpen}
          handleImageChange={handleImageChange}
          values={values}
          setvalues={setvalues}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
      <div className="relative">
        <UpdateModel
          open={updateModel}
          setOpen={setupdateModel}
          values={updateValues}
          setvalues={setupdateValues}
          handleSubmit={handleUpdate}
          loading={loading}
        />
      </div>
      <div className="z-[2000000]">
        <ToastContainer position="bottom-left" />
      </div>
    </div>
  );
}
