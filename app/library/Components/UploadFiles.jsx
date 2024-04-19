"use client";
import React, { useState } from "react";
import { GoUpload } from "react-icons/go";
import CreateableSelect from "react-select/creatable";
import { FaTrash } from "react-icons/fa";
import { saveImagetoBucket } from "@/supabase/apis/models";
import { createLibrary } from "@/supabase/apis/library";
import { toast } from "react-toastify";

function UploadFiles({ refreshLibrary }) {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState([]);
  const [mediaContent, setMediaContent] = useState(null);
  const [tags, setTags] = useState([]);
  const [mediaType, setMediaType] = useState(null);

  const handleFilesSelect = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.split("/")[0],
    }));
    setPreview(filePreviews);
    setMediaContent(files);

    let mediaType = files.map((file) => {
      const type = file.type.split("/")[0];
      if (type === "image") return 0;
      else if (type === "video") return 1;
      else if (type === "audio") return 2;
    });
    setMediaType(mediaType);
  };

  const handleRemoveFile = (index) => {
    setPreview((prev) => {
      const updatedPreview = prev.filter((_, i) => i !== index);
      const updatedMediaContent = mediaContent.filter((_, i) => i !== index);
      setMediaContent(updatedMediaContent);

      let mediaType = updatedMediaContent.map((file) => {
        const type = file.type.split("/")[0];
        if (type === "image") return 0;
        else if (type === "video") return 1;
        else if (type === "audio") return 2;
      });
      setMediaType(mediaType.length > 0 ? mediaType : null);
      return updatedPreview;
    });
  };

  const handleSubmit = async () => {
    // Check if all fields are filled
    if (!preview.length || !tags.length || !mediaType) {
      toast.error("Please fill out empty fields");
      return;
    }

    setIsLoading(true);

    const uploadedFiles = await Promise.all(
      mediaContent?.map(async (file, index) => {
        // Upload the file to Supabase
        const { status, key } = await saveImagetoBucket(file.url, file);
        if (!status) {
          toast.error("Error uploading file");
          return null;
        }

        // Construct the media URL from the returned key
        const media = `https://dszdntohmezzveoalhfz.supabase.co/storage/v1/object/public/${key}`;

        // Send the media URL, media type, and tags to your backend
        let res = await createLibrary({
          media,
          media_type: mediaType[index],
          label: tags,
        });

        if (!res?.status) {
          toast.error("Error creating library");
          return null;
        }

        return media;
      })
    );

    setIsLoading(false);
    toast.success("Library created successfully");

    // Reset the form
    setPreview([]);
    setMediaContent(null);
    setTags([]);
    setMediaType(null);
    refreshLibrary();
  };

  return (
    <section>
      <div className="my-5 flex flex-wrap items-center gap-3 justify-center max-w-5xl ">
        {preview &&
          preview.map((file, index) => (
            <div key={index} className="relative">
              {file.type === "image" && (
                <img
                  src={file.url}
                  alt="preview"
                  className="h-40 w-40 object-cover"
                />
              )}
              {file.type === "video" && (
                <video
                  src={file.url}
                  className="h-40 w-40 object-contain"
                  controls
                />
              )}
              {file.type === "audio" && <audio src={file.url} controls />}
              <button
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                onClick={() => handleRemoveFile(index)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
      </div>
      <h1 className="text-gray-500 text-center">Upload Files</h1>
      <div className="mt-2 flex justify-center ">
        <div className="p-3 border-4 border-dotted  max-w-fit flex flex-col items-center justify-center rounded-lg">
          <label
            htmlFor="file"
            className="flex flex-col items-center justify-center gap-5"
          >
            <GoUpload className="text-4xl " />
            <div className="flex gap-2 mt-4">
              <p className="text-center text-sm mt-2">
                Drag and drop your files here or
              </p>
              <label
                htmlFor="file"
                className="  font-semibold py-2 px-2 bg-gray-100 border rounded"
              >
                Choose a file
              </label>
            </div>
          </label>
        </div>
        <div className="mt-5">
          <input
            type="file"
            id="file"
            name="file"
            className="hidden"
            multiple
            accept="image/*,video/*,audio/*"
            onChange={handleFilesSelect}
          />
        </div>
      </div>
      <div className="my-5">
        <label className="label">
          <span className="label-text">Tags</span>
        </label>
        <CreateableSelect
          isMulti
          // defaultValue={data?.tags.map((tags) => {
          //   return { value: tags, label: tags };
          // })}
          value={tags?.map((tag) => {
            return { value: tag, label: tag };
          })}
          onChange={(newValue) => setTags(newValue?.map((item) => item.value))}
          className="relative z-20"
        />
      </div>
      <div className="flex justify-center items-center">
        <button
          disabled={!preview.length || !tags.length || !mediaType || isLoading}
          onClick={handleSubmit}
          className=" justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primaryhover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </section>
  );
}

export default UploadFiles;
