import { supabase } from "../config";
import { v4 as uuidv4 } from "uuid";

export const createModel = async (values, imagesUrls) => {
  const url = "https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Models";
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const requestData = {
    gender: values.gender === "male" ? 0 : 1,
    name: values.modelName,
    images: imagesUrls,
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestData),
  };
  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return { status: true };
    // Handle success response
  } catch (error) {
    console.error("Error:", error);

    return { status: false, error: error.message };
    // Handle error
  }
};

export const saveImagetoBucket = async (name, file) => {
  const uniqueId = uuidv4();
  try {
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`models/${uniqueId}.png`, file);

    if (error) {
      console.error("Error uploading file:", error.message);
      throw error;
    } else {
      return { status: true, key: data.fullPath };
    }
  } catch (error) {
    console.log("🚀 ~ saveImagetoBucket ~ error:", error);
    return { status: false, error: error.message };
  }
};

export const getModels = async () => {
  const url =
    "https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Models?select=*";
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
  };
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return { status: true, records: data };
    // Handle success response
  } catch (error) {
    console.error("Error:", error);
    return { status: false, error: error.message };
    // Handle error
  }
};

export const updateModelImages = async (values, imagesUrls) => {
  const url = `https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Models?id=eq.${values.id}`;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
  const requestData = {
    images: imagesUrls,
  };
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestData),
  };
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return { status: true };
    // Handle success response
  } catch (error) {
    console.error("Error:", error);
    return { status: false, error: error.message };
    // Handle error
  }
};
