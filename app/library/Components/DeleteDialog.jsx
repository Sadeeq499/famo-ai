"use client";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { deleteLibrary } from "@/supabase/apis/library";
import { Spinner2 } from "@/Components/spinner";

function DeleteDialog({ isOpen, onClose, selectedId, refreshLibrary }) {
  const [isLoading, setisLoading] = useState(false);

  const handleDelete = () => {
    setisLoading(true);
    deleteLibrary(selectedId).then((response) => {
      if (response.status) {
        setisLoading(false);
        onClose();
        refreshLibrary();
        toast.success("Record deleted successfully");
      }
    });
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed  inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="p-6 pt-0 text-center">
                    <svg
                      className="w-20 h-20 text-red-600 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
                      Are you sure you want to delete this Image?
                    </h3>
                    <button
                      onClick={handleDelete}
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
                    >
                      {isLoading ? <Spinner2 /> : "Yes, I'm sure"}
                    </button>
                    <button
                      onClick={onClose}
                      className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                      data-modal-toggle="delete-user-modal"
                    >
                      No, cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default DeleteDialog;
