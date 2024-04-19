"use client";
import { useState } from "react";
// styling
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteLibrary } from "@/supabase/apis/library";
import { toast } from "react-toastify";
// components
import UploadFiles from "./UploadFiles";
import TagsDialog from "./TagsDialog";
import DeleteDialog from "./DeleteDialog";

export default function LibraryList({ libraryRecords, refreshLibrary }) {
  const [open, setOpen] = useState(false);
  const [openDeleted, setOpenDeleted] = useState(false);
  const [defaultTags, setDefaultTags] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = (id) => {
    setOpenDeleted(true);
    setSelectedId(id);
  };

  const handleOpenTags = (id, tags) => {
    setDefaultTags(tags);
    setSelectedId(id);
    setOpen(true);
  };
  return (
    <>
      <div className="bg-white">
        <div className=" max-w-2xl pb-8 sm:py-5 pt-0 lg:max-w-7xl">
          <div className="mb-8 flex justify-center items-center">
            <UploadFiles refreshLibrary={refreshLibrary} />
          </div>
          <div className="mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {libraryRecords.map((library) => (
              <div key={library.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-[16rem]">
                  {library.media_type === 0 ? (
                    <img
                      src={library.media}
                      alt={library.library}
                      className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                    />
                  ) : library.media_type === 1 ? (
                    <video
                      className="h-full w-full object-contain rounded-lg"
                      controls
                      autoPlay
                      muted
                    >
                      <source src={library.media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <audio
                      src={library.media}
                      controls
                      className="h-full w-full object-contain rounded-lg"
                    >
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
                <div className="mt-4 flex justify-between gap-5 items-center ">
                  <button
                    onClick={() => handleOpenTags(library?.id, library?.tags)}
                    className="ml-2 text-xs cursor-pointer inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-orange-200 text-orange-700 rounded-full hover:bg-orange-700 hover:text-white"
                  >
                    View tags
                  </button>
                  <TrashIcon
                    onClick={() => handleDelete(library.id)}
                    className=" h-[20px] text-[red] cursor-pointer w-16 "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TagsDialog
        selectedId={selectedId}
        defaultTags={defaultTags}
        isOpen={open}
        onClose={() => setOpen(false)}
        refreshLibrary={refreshLibrary}
      />

      <DeleteDialog
        selectedId={selectedId}
        isOpen={openDeleted}
        onClose={() => setOpenDeleted(false)}
        refreshLibrary={refreshLibrary}
      />
    </>
  );
}
