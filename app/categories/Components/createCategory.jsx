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

export default function CreateCategory({
  open,
  setOpen,
  values,
  setvalues,
  handleSubmit,
  subCategories,
  categoryLoading,
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
                            Create Create
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
                                    setvalues({
                                      ...values,
                                      category: e.target.value,
                                    });
                                  }}
                                  placeholder="Insert Name"
                                  className="block w-full rounded-md border-0 py-1.5 px-[5px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div>
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
                                    setvalues({
                                      ...values,
                                      parent: e.target.value,
                                    });
                                  }}
                                  id="parent"
                                  name="parent"
                                  className="block w-full rounded-md border-0 p-[11px_5px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        disabled={categoryLoading}
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        {categoryLoading ? <Spinner2 /> : "Create Category"}
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
