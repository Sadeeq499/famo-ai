"use client";
import { Spinner2 } from "@/Components/spinner";
import { getLibrary } from "@/supabase/apis/library";
import React, { useEffect, useState } from "react";
import LibraryList from "./Components/libraryLists";

const Library = () => {
  const [libraryRecords, setlibraryRecords] = useState([]);
  const [loading, setloading] = useState(false);
  const library = async () => {
    setloading(true);
    let res = await getLibrary();
    console.log("🚀 ~ library ~ res:", res);
    if (res.status) {
      setlibraryRecords(res.records);
      setloading(false);
    } else {
      setloading(false);
    }
  };

  useEffect(() => {
    library();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-182px)] w-[100%]">
          <Spinner2 color="model" />
        </div>
      ) : (
        <div>
          <LibraryList
            libraryRecords={libraryRecords}
            refreshLibrary={library}
          />
        </div>
      )}
    </div>
  );
};

export default Library;
