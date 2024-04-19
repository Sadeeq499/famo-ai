"use client";
import React, { useEffect, useState } from "react";
// @ts-ignore
import Generate from "./Components/genrate";
import Filter from "./Components/filter";
import GenerateModel from "./Components/generateModel";
import { getLlms } from "@/supabase/apis/catalogue";
import { getModels } from "@/supabase/apis/models";
import { getCategories, getSubCategories } from "@/supabase/apis/categories";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  countGenerations,
  createGeneration,
  deleteGeneration,
  getGenerations,
  updateGeneration,
  updateGenerationModel,
} from "@/supabase/apis/generations";
import { Spinner2 } from "@/Components/spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesArray,
  generationsArray,
  llmsArray,
  modelsArray,
  subCategoriesArray,
} from "@/redux/userActions";
import DeletePopup from "./Components/deletePopup";
import UpdateGeneration from "./Components/updateGeneration";
import Pagination from "./Components/pagination";
import GenerationList from "./Components/generationList";
import { supabaseBrowser } from "@/supabase/browser";

const defaultValues = {
  llm_id: "",
  prompt: "",
  models: [],
  user_id: "11321412412312",
};

const defaultUpdateValues = {
  llm_id: "",
  prompt: "",
  models: [],
  generation_id: "",
  image: false,
  generatedImages: [],
};

const Catalogue = () => {
  const [loading, setloading] = useState(false);
  const [values, setvalues] = useState(defaultValues);
  const [generateModel, setgenerateModel] = useState(false);
  const [llmsRecords, setllmsRecords] = useState([]);
  const [models, setmodels] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [categories, setcategories] = useState([]);
  const [generations, setgenerations] = useState([]);
  const [generateLoading, setgenerateLoading] = useState(false);
  const [deletePopup, setdeletePopup] = useState(false);
  const [updateModelGeneration, setupdateGeneration] = useState(false);
  const [paginationStart, setPaginationStart] = useState(0);
  // @ts-ignore
  const [limit, setlimit] = useState(10);
  const [generationCount, setgenerationCount] = useState(0);
  const [filterValues, setfilterValues] = useState({
    category_id: "",
    sub_category_id: "",
  });
  const [modelUpdateValues, setModelupdateValues] =
    useState(defaultUpdateValues);

  const dispatch = useDispatch();
  const reduxRecords = useSelector((records) => records);
  const modelsRecords = async () => {
    let res = await getModels();
    if (res.status) {
      res.records.sort(
        // @ts-ignore
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      // Set the sorted records to the state variable `models`
      setmodels(res.records);
      dispatch(modelsArray(res.records));
    }
  };

  const llms = async () => {
    let res = await getLlms();
    if (res.status) {
      res.records.sort(
        // @ts-ignore
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setllmsRecords(res.records);
      dispatch(llmsArray(res.records));
    } else {
      console.log("error", res.error);
    }
  };

  const handleSubmit = async () => {
    if (!values.prompt || values.models.length === 0 || !values.llm_id) {
      toast.error("Please fill out empty fields");
      return;
    } else {
      setloading(true);
      let res = await createGeneration(values);
      if (res?.status) {
        toast.success("successfull");
        setloading(false);
        generationRecords();
        setvalues(defaultValues);
        setgenerateModel(false);
      } else {
        toast.error("Something went wrong");
        console.log(res.error);
        setloading(false);
      }
    }
  };

  const categoriesRecords = async () => {
    let res = await getCategories();
    if (res.status) {
      res.records.sort(
        // @ts-ignore
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      // Set the sorted records to the state variable `models`
      setcategories(res.records);
      dispatch(categoriesArray(res.records));
    }
  };

  const generationRecords = async () => {
    setgenerateLoading(true);
    if (generationCount === 0) {
      let counts = await countGenerations();
      setgenerationCount(counts.count);
    }
    let res = await getGenerations(paginationStart, limit);
    if (res.status) {
      setgenerations(res.records);
      dispatch(generationsArray(res.records));

      setgenerateLoading(false);
    } else {
      setgenerateLoading(false);
    }
  };

  const subCategoriesRecords = async () => {
    let res = await getSubCategories();
    if (res.status) {
      res.records.sort(
        // @ts-ignore
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setsubCategories(res.records);
      dispatch(subCategoriesArray(res.records));
    } else {
      console.log("error", res.error);
    }
  };

  const handleUpdate = async () => {
    try {
      setloading(true);
      let allModels = [];
      let findObj = generations.find((item) => {
        return item.id === modelUpdateValues.id;
      });
      if (findObj) {
        allModels = [...modelUpdateValues.models];
      }

      let res = await updateGenerationModel({
        models: allModels,
        generation_id: modelUpdateValues.id,
        user_id:"test"
      });
      if (res?.status) {
        toast.success("Changes have been successfully saved");
        generationRecords();
        setupdateGeneration(false);
        setloading(false);
      } else {
        console.log(res.error);
        throw "error";
      }
    } catch (error) {
      toast.error("Something went wrong");
      setloading(false);
    }
    // }
  };

  // @ts-ignore
  const handleDelete = async (id) => {
    if (modelUpdateValues.image) {
      try {
        setloading(true);

        let res = await updateGeneration({
          generated_images: modelUpdateValues.generatedImages,
          id: modelUpdateValues.id,
        });
        if (res?.status) {
          toast.success("The deletion was successful");
          generationRecords();
          setdeletePopup(false);
          setloading(false);
        } else {
          console.log(res.error);
          throw "error";
        }
      } catch (error) {
        toast.error("Something went wrong");
        setloading(false);
      }
    } else {
      try {
        setloading(true);
        let res = await deleteGeneration({
          id: modelUpdateValues.id,
        });
        if (res?.status) {
          toast.success("The deletion was successful");
          generationRecords();
          setdeletePopup(false);
          setloading(false);
        } else {
          console.log(res.error);
          throw "error";
        }
      } catch (error) {
        toast.error("Something went wrong");
        setloading(false);
      }
    }
  };

  const handleFilter = async () => {
    // let res = await generation();
    // if (res.status) {
    //   res.records.sort(
    //     (a, b) => new Date(b.created_at) - new Date(a.created_at)
    //   );
    //   // Set the sorted records to the state variable `models`
    //   setcategories(res.records);
    //   dispatch(categoriesArray(res.records));
    // }
  };

  const nextPage = () => {
    const nextStart = paginationStart + limit;

    if (nextStart < generationCount) {
      setPaginationStart(nextStart); // Increment prevStart index for the next page
      // fetchRecords(); // Fetch records for the next page
    }
  };

  // Function to handle previous page navigation
  const previousPage = () => {
    const prevStart = paginationStart - limit;
    if (prevStart >= 0) {
      setPaginationStart(prevStart); // Decrement start index for the previous page
      // fetchRecords(); // Fetch records for the previous page
    }
  };

  useEffect(() => {
    generationRecords();
  }, [paginationStart]);

  useEffect(() => {
    // @ts-ignore
    if (reduxRecords?.llms?.length > 0) {
      // @ts-ignore
      setllmsRecords(reduxRecords.llms);
    } else {
      llms();
    }
    // @ts-ignore
    if (reduxRecords.models.length > 0) {
      // @ts-ignore
      setmodels(reduxRecords.models);
    } else {
      modelsRecords();
    }
    // @ts-ignore
    if (reduxRecords.categories.length > 0) {
      // @ts-ignore
      setcategories(reduxRecords.categories);
    } else {
      categoriesRecords();
    }
    // @ts-ignore
    if (reduxRecords.subCategories.length > 0) {
      // @ts-ignore
      setsubCategories(reduxRecords.subCategories);
    } else {
      subCategoriesRecords();
    }
    // @ts-ignore
    if (reduxRecords.generations.length > 0) {
      // @ts-ignore
      setgenerations(reduxRecords.generations);
    } else {
      generationRecords();
    }
  }, []);

  // Fetch Records from Generation Table based on Realtime
  useEffect(() => {
    const supabase = supabaseBrowser();
    const subscription = supabase
      .channel("generations-room")
      // .on(
      //   "postgres_changes",
      //   { event: "INSERT", schema: "public", table: "FAMOAI_Generations" },
      //   async (payload) => {
      //   // setgenerations((prevData) => [payload.new, ...prevData]);
      //   }
      // )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "FAMOAI_Generations" },
        async (payload) => {
          setgenerations((prevData) =>
            prevData.map((item) => {
              return item.id === payload.new.id ? payload.new : item; // Return the updated item
            })
          );
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  });

  return (
    <div>
      <div className="flex justify-end">
        <p
          onClick={() => {
            setgenerateModel(true);
          }}
          className="w-max bg-indigo-600 hover:bg-indigo-500  text-white rounded-[8px] p-[10px] pb-[11px] mb-[10px] cursor-pointer"
        >
          Generate
        </p>
      </div>

      <Filter
        categories={categories}
        subCategories={subCategories}
        handleFilter={handleFilter}
        filterValues={filterValues}
        setfilterValues={setfilterValues}
      />

      {generateLoading ? (
        <div className="flex justify-center items-center h-[calc(100vh-333px)] w-[100%]">
          <Spinner2 color="model" />
        </div>
      ) : (
        <div>
          {generations.length > 0 && (
            <div className="mt-6 ">
              <Pagination
                nextPage={nextPage}
                previousPage={previousPage}
                paginationStart={paginationStart}
                limit={limit}
              />
            </div>
          )}

          {generations.map((item, i) => {
            return (
              <div key={i}>
                <GenerationList
                  item={item}
                  categories={categories}
                  subCategories={subCategories}
                  generations={generations}
                  setgenerations={setgenerations}
                  generationRecords={generationRecords}
                  deletePopup={deletePopup}
                  setdeletePopup={setdeletePopup}
                  llmsRecords={llmsRecords}
                  modelUpdateValues={modelUpdateValues}
                  setModelupdateValues={setModelupdateValues}
                  setupdateGeneration={setupdateGeneration}
                />
              </div>
            );
          })}
          {generations.length > 0 && (
            <div className="mt-6 ">
              <Pagination
                nextPage={nextPage}
                previousPage={previousPage}
                paginationStart={paginationStart}
                limit={limit}
              />
            </div>
          )}
        </div>
      )}
      <div className="relative">
        <GenerateModel
          open={generateModel}
          setOpen={setgenerateModel}
          values={values}
          setvalues={setvalues}
          handleSubmit={handleSubmit}
          loading={loading}
          llmsRecords={llmsRecords}
          models={models}
        />
      </div>
      <div className="relative">
        <UpdateGeneration
          open={updateModelGeneration}
          setOpen={setupdateGeneration}
          handleSubmit={handleUpdate}
          loading={loading}
          llmsRecords={llmsRecords}
          models={models}
          modelUpdateValues={modelUpdateValues}
          setModelupdateValues={setModelupdateValues}
        />
      </div>
      <div className="z-[2000000]">
        <ToastContainer position="bottom-left" />
      </div>
      <DeletePopup
        deletePopup={deletePopup}
        setdeletePopup={setdeletePopup}
        handleDelete={handleDelete}
        modelUpdateValues={modelUpdateValues}
        loading={loading}
      />
    </div>
  );
};

export default Catalogue;
