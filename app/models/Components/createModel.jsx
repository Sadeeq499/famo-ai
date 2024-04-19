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
import { Spinner2 } from "@/Components/spinner";

export default function CreateModel({
  open,
  setOpen,
  handleImageChange,
  values,
  setvalues,
  handleSubmit,
  loading,
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
                            Create Model
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
                            <div>
                              <label
                                htmlFor="modelName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Model name
                              </label>
                              <div className="mt-2">
                                <input
                                  onChange={(e) => {
                                    setvalues({
                                      ...values,
                                      modelName: e.target.value,
                                    });
                                  }}
                                  type="text"
                                  value={values.modelName}
                                  name="modelName"
                                  id="modelName"
                                  placeholder="Select model name"
                                  className="block w-full rounded-md border-0 py-1.5 px-[5px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="gender"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Gender
                              </label>
                              <div className="mt-2">
                                <select
                                  onChange={(e) => {
                                    setvalues({
                                      ...values,
                                      gender: e.target.value,
                                    });
                                  }}
                                  value={
                                    values.gender === "male"
                                      ? "male"
                                      : values.gender === "female"
                                      ? "female"
                                      : ""
                                  }
                                  name="gender"
                                  id="gender"
                                  className="block w-full rounded-md border-0 p-[11px_5px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                  <option value="">Select gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium leading-6 text-gray-900">
                                Model Images
                              </h3>
                              <div className="mt-2">
                                <div className="flex space-x-2">
                                  {values.images.map((img) => (
                                    <span
                                      key={img}
                                      className="relative rounded-full hover:opacity-75"
                                    >
                                      <Image
                                        className="inline-block h-8 w-8 rounded-full bg-[#eeeeee]"
                                        src={URL.createObjectURL(img)}
                                        alt="none"
                                        width={32}
                                        height={32}
                                      />
                                    </span>
                                  ))}

                                  <input
                                    type="file"
                                    name="upload"
                                    id="upload"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    multiple
                                  />
                                  <label
                                    htmlFor="upload"
                                    className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                                  >
                                    <span className="absolute -inset-2" />
                                    <span className="sr-only">Add Model</span>
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </label>
                                </div>
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
                        {loading ? <Spinner2 /> : "Create"}
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
