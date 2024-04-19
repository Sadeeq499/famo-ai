import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { TrashIcon } from "@heroicons/react/24/outline";

const settings = {
  className: "center",
  infinite: false,
  centerPadding: "60px",
  slidesToShow: 5,
  swipeToSlide: true,
  afterChange: function (index) {
    console.log(
      `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    );
  },
};

const ModelsList = ({
  handleDelete,
  handleCheckbox,
  values,
  setselectedImage,
}) => {
  return (
    <div className="mt-[30px] mx-[10px]">
      {values?.generated_images &&
        (values?.generated_images?.length > 5 ? (
          <Slider {...settings}>
            {values?.generated_images?.map((image, i) => (
              <div key={i}>
                <div className="flex justify-center w-[97%] relative">
                  <Image
                    onClick={() => {
                      setselectedImage({ url: "", id: 0 });
                      setTimeout(() => {
                        setselectedImage({ url: image?.image_url, id: i });
                      }, 50);
                    }}
                    width={260}
                    alt="none"
                    height={142}
                    src={image?.image_url}
                    className="rounded-[11px] h-[220px] object-cover w-[100%] bg-[#eeeeee] cursor-pointer"
                  />
                  <div className="absolute bottom-[16px] left-0 flex w-[100%] justify-between px-[16px] items-center ">
                    <span
                      className="bg-[#dc2626] p-[5px_5px] rounded-[8px] cursor-pointer"
                      onClick={() => {
                        handleDelete(i);
                      }}
                    >
                      <TrashIcon className="w-[15px] h-[15px] text-[white] " />
                    </span>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={() => {
                        handleCheckbox(i);
                      }}
                      checked={image.is_active}
                      className="w-[19px] h-[16px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex flex-row gap-3">
            {values?.generated_images?.map((image, i) => (
              <div key={i}>
                <div className="flex justify-center w-[97%] relative">
                  <Image
                    onClick={() => {
                      setselectedImage({ url: "", id: 0 });
                      setTimeout(() => {
                        setselectedImage({ url: image?.image_url, id: i });
                      }, 50);
                    }}
                    width={260}
                    alt="none"
                    height={142}
                    src={image?.image_url}
                    className="rounded-[11px] h-[220px] object-cover w-[220px] bg-[#eeeeee] cursor-pointer"
                  />
                  <div className="absolute bottom-[16px] left-0 flex w-[100%] justify-between px-[16px] items-center">
                    <span
                      className="bg-[#dc2626] p-[5px_5px] rounded-[8px] cursor-pointer"
                      onClick={() => {
                        handleDelete(i);
                      }}
                    >
                      <TrashIcon className="w-[15px] h-[15px] text-[white] " />
                    </span>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={() => {
                        handleCheckbox(i);
                      }}
                      checked={image.is_active}
                      className="w-[19px] h-[16px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default ModelsList;
