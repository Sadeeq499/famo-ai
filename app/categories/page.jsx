"use client";
import React, { useEffect, useState } from "react";
import AddCategory from "./Components/addCategory";
import CategoryTable from "./Components/categoryTable";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import {
  createCategory,
  getCategories,
  getSubCategories,
  updateCategory,
} from "@/supabase/apis/categories";
import { Spinner2 } from "@/Components/spinner";
import CreateCategory from "./Components/createCategory";
import UpdateCategory from "./Components/updateCategory";
import { useDispatch, useSelector } from "react-redux";
import { categoriesArray, subCategoriesArray } from "@/redux/userActions";

let defaultValues = {
  category: "",
  parent: "",
};
let editValue = {
  category: "",
  parent: "",
  id: "",
};
const Categories = () => {
  const [categories, setcategories] = useState([]);
  const [categoryLoading, setcategoryLoading] = useState(false);
  const [values, setvalues] = useState(defaultValues);
  const [subCategories, setsubCategories] = useState([]);
  const [openCreateCategory, setcreateCategory] = useState(false);
  const [loading, setloading] = useState(true);
  const [editValues, seteditValues] = useState(editValue);
  const [editCategory, seteditCategory] = useState(false);
  const dispatch = useDispatch();
  const reduxRecords = useSelector((records) => records);
  const categoriesRecords = async () => {
    setloading(true);

    let res = await getCategories();
    if (res.status) {
      res.records.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      console.log(res.records);
      // Set the sorted records to the state variable `models`
      setcategories(res.records);
      dispatch(categoriesArray(res.records));

      setloading(false);
    } else {
      setloading(false);
    }
  };

  const subCategoriesRecords = async () => {
    let res = await getSubCategories();
    if (res.status) {
      res.records.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setsubCategories(res.records);
      dispatch(subCategoriesArray(res.records));
    } else {
      console.log("error", res.error);
    }
  };

  const handleSubmit = async () => {
    if (!values.category) {
      toast.error("Category name is required");

      return;
    } else {
      setcategoryLoading(true);

      let res = await createCategory(values);
      if (res?.status) {
        toast.success("Category created successfully");
        setcategoryLoading(false);
        categoriesRecords();
        subCategoriesRecords();
        setvalues(defaultValues);
        setcreateCategory(false);
      } else {
        toast.error("Something went wrong");
        console.log(res.error);
        setcategoryLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    if (!editValues.category) {
      toast.error("Category name is required");
      return;
    }
    try {
      setcategoryLoading(true);
      let res = await updateCategory(editValues);
      console.log("🚀 ~ handleUpdate ~ res:", res);
      if (res?.status) {
        toast.success("Category updated successfully");
        setcategoryLoading(false);
        let records = categories;
        let recordIndex = categories.findIndex((item) => {
          return item.id === editValues.id;
        });
        records[recordIndex].category = editValues.category;
        records[recordIndex].parent = editValues.parent;
        setcategories(records);
        dispatch(categoriesArray(records));
        seteditValues(editValue);
        seteditCategory(false);
        subCategoriesRecords();
      } else {
        console.log(res.error);
        throw "error";
      }
    } catch (error) {
      toast.error("Something went wrong");
      setcategoryLoading(false);
    }
  };

  useEffect(() => {
    if (reduxRecords.categories.length > 0) {
      setcategories(reduxRecords.categories);
      setloading(false);
    } else {
      categoriesRecords();
    }
    if (reduxRecords.subCategories.length > 0) {
      setsubCategories(reduxRecords.subCategories);
      setloading(false);
    } else {
      subCategoriesRecords();
    }
  }, []);
  return (
    <div>
      {/* <AddCategory
        values={values}
        setvalues={setvalues}
        handleSubmit={handleSubmit}
        subCategories={subCategories}
        categoryLoading={categoryLoading}
      /> */}
      {loading ? (
        <div className="flex justify-center items-center h-[calc(100vh-208px)] w-[100%]">
          <Spinner2 color="model" />
        </div>
      ) : (
        <CategoryTable
          categories={categories}
          setOpen={setcreateCategory}
          subCategories={subCategories}
          seteditValues={seteditValues}
          seteditCategory={seteditCategory}
        />
      )}
      <div className="relative">
        <CreateCategory
          open={openCreateCategory}
          setOpen={setcreateCategory}
          values={values}
          setvalues={setvalues}
          handleSubmit={handleSubmit}
          subCategories={subCategories}
          categoryLoading={categoryLoading}
        />
      </div>
      <div className="relative">
        <UpdateCategory
          open={editCategory}
          setOpen={seteditCategory}
          values={editValues}
          setvalues={seteditValues}
          handleSubmit={handleUpdate}
          subCategories={subCategories}
          categoryLoading={categoryLoading}
        />
      </div>
      <div className="z-[2000000]">
        <ToastContainer position="bottom-left" />
      </div>
    </div>
  );
};

export default Categories;
