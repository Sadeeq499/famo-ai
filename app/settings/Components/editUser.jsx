"use client";

import { deleteUser, updateUser } from "@/utils/apis";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const EditUser = ({ userId, primaryEmailAddressId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateUser(userId, {
      external_id: null,
      first_name: firstName,
      last_name: lastName,
      primary_email_address_id: primaryEmailAddressId,
      notify_primary_email_address_changed: false,
      password,
      skip_password_checks: true,
      sign_out_of_other_sessions: true,
      public_metadata: {},
      private_metadata: {},
      unsafe_metadata: {},
    });

    closeModal();
  };

  const userDelete = async () => {
    deleteUser(userId);

    closeModal();
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-xl bg-[#FF8C32] px-9 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          Edit
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
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
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        onChange={(e) => setFirstName(e.target.value)}
                        className="bg-[#F1F4F9] border border-[#D8D8D8] text-gray-900 text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="John"
                        required={true}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block mb-3 text-lg font-semibold leading-6 text-[#202224] opacity-80"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        onChange={(e) => setLastName(e.target.value)}
                        className="bg-[#F1F4F9] border border-[#D8D8D8] text-gray-900 text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="Doe"
                        required={true}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-3 text-lg font-semibold leading-6 text-[#202224] opacity-80"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#F1F4F9] border border-[#D8D8D8] text-gray-900 text-lg rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        placeholder="••••••••••"
                        required={true}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-[#FF8C32] font-semibold rounded-lg text-xl leading-7 py-4 text-center opacity-90 hover:opacity-100"
                    >
                      Edit User
                    </button>
                  </form>
                  <button
                    onClick={userDelete}
                    className="w-full text-white bg-[#FF3232] font-semibold rounded-lg text-xl leading-7 py-4 text-center opacity-90 hover:opacity-100 mt-3"
                  >
                    Delete User
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditUser;
