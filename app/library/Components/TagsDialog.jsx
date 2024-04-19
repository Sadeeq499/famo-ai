"use client";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { updateLibrary } from "@/supabase/apis/library";
import CreateableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { Spinner2 } from "@/Components/spinner";

function TagsDialog({
  isOpen = false,
  onClose,
  defaultTags = [],
  selectedId,
  refreshLibrary,
}) {
  const [tags, setTags] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const handleUpdate = () => {
    setisLoading(true);
    updateLibrary(selectedId, tags).then((response) => {
      if (response.status) {
        onClose();
        setisLoading(false);
        refreshLibrary();
        toast.success("Tags updated successfully");
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Tags
                  </Dialog.Title>
                  <div className="mt-2">
                    <CreateableSelect
                      isMulti
                      defaultValue={defaultTags.map((tag) => ({
                        label: tag,
                        value: tag,
                      }))}
                      onChange={(newValue) =>
                        setTags(newValue?.map((item) => item.value))
                      }
                      options={[]}
                      placeholder="Type to add tags"
                    />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleUpdate}
                    >
                      {isLoading ? <Spinner2 color="model" /> : "Update"}
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

export default TagsDialog;
