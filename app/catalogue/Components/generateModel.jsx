/* eslint-disable react/react-in-jsx-scope */
"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import img1 from "@/public/Images/person.jpg";
import { Spinner2 } from "@/Components/spinner";

export default function GenerateModel({
  open,
  setOpen,
  values,
  setvalues,
  handleSubmit,
  loading,
  llmsRecords,
  models,
}) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[10000]" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            Generate
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div className="sm:col-span-3 mt-[8px]">
                              <label
                                htmlFor="llm_id"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Choose LLM
                              </label>
                              <div className="mt-2">
                                <select
                                  value={values.llm_id}
                                  onChange={(e) => {
                                    setvalues({
                                      ...values,
                                      llm_id: e.target.value,
                                    });
                                  }}
                                  id="llm_id"
                                  name="llm_id"
                                  className="block  rounded-md border-0 py-[10px] px-[13px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6 w-[100%] outline-none placeholder:text-gray-400"
                                >
                                  <option value="">Select LLm...</option>
                                  {llmsRecords?.map((item, i) => (
                                    <option key={i} value={item.id}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="sm:col-span-4 mt-[10px]">
                              <label
                                htmlFor="prompt"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Prompt
                              </label>
                              <div className="mt-2">
                                <textarea
                                  name=""
                                  id=""
                                  cols="20"
                                  value={values.prompt}
                                  onChange={(e) => {
                                    setvalues({
                                      ...values,
                                      prompt: e.target.value,
                                    });
                                  }}
                                  placeholder="The Starry Night"
                                  className="block w-full rounded-md border-0 py-1.5 px-[13px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none h-[107px]"
                                ></textarea>
                              </div>
                            </div>

                            <div className="sm:col-span-4 mt-[10px]">
                              <label
                                htmlFor="models"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Choose Model
                              </label>
                              <div className="mt-2 flex flex-row items-center gap-3 flex-wrap">
                                {models.map((item, i) => (
                                  <span
                                    key={i}
                                    className={`border-[3px] border-solid ${
                                      values.models.includes(item.id) &&
                                      "border-indigo-700"
                                    }  rounded-[100%]`}
                                    onClick={() => {
                                      if (values.models.includes(item.id)) {
                                        let idsValues = values.models.filter(
                                          (idVal) => {
                                            return idVal !== item.id;
                                          }
                                        );
                                        setvalues({
                                          ...values,
                                          models: idsValues,
                                        });
                                      } else {
                                        setvalues({
                                          ...values,
                                          models: [...values.models, item.id],
                                        });
                                      }
                                    }}
                                  >
                                    <Image
                                      width={65}
                                      height={65}
                                      src={item.images[0]}
                                      alt="hello"
                                      className="h-[50px] w-[50px] rounded-[100%] object-cover object-center cursor-pointer"
                                    />
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit();
                        }}
                        disabled={loading}
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {loading ? <Spinner2 /> : "Generate"}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
