import { supabase } from "../config";

export const createGeneration = async (values) => {
  try {
    // const url =
    //   "https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Generations";
    const url =
      "https://famoai.azurewebsites.net/api/Generate?code=NtFeVMyLPs0hRawU6H3qlG1fceP48o3Ofmn30hsMVDWbAzFux-Zuyw==";
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //apikey: apiKey,
        // Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(values),
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
  } catch (error) {
    console.error("Error:", error);
    return { status: false, error: error.message };
  }
};

export const getGenerations = async (start, limit) => {
  const url = `https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Generations?select=*&order=created_at.desc&offset=${start}&limit=${limit}`;

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

export const updateGenerationModel = async (values) => {
  console.log(values);
  const url = `https://famoai.azurewebsites.net/api/GenerateNew?code=SCIxWe4_7cF9M4p7IdYKThQyxq5zJtM2fVMJaifts5lGAzFuHtJpWg==`;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...values,
    }),
  };
  try {
    const response = await fetch(url, requestOptions);
    console.log("🚀 ~ updateGeneration ~ response:", response);

    if (!response.ok) {
      console.error(
        `Network response error: ${response.status} ${response.statusText}`
      );

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

export const updateGeneration = async (values) => {
  console.log("🚀 ~ updateGeneration ~ values:", values);
  const url = `https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Generations?id=eq.${values.id}`;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(values),
  };
  try {
    const response = await fetch(url, requestOptions);
    console.log("🚀 ~ updateGeneration ~ response:", response);

    if (!response.ok) {
      console.error(
        `Network response error: ${response.status} ${response.statusText}`
      );

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

export const deleteGeneration = async (values) => {
  console.log("🚀 ~ updateGeneration ~ values:", values);
  const url = `https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Generations?id=eq.${values.id}`;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
  };
  try {
    const response = await fetch(url, requestOptions);
    console.log("🚀 ~ updateGeneration ~ response:", response);
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

export const countGenerations = async () => {
  try {
    // Count all records in the table
    const { data, count } = await supabase
      .from("FAMOAI_Generations")
      .select("*", { count: "exact", head: true });
    return { status: true, count };
  } catch (error) {
    return { status: false, error: error.message };
  }
};
