export const getCategories = async () => {
  const url =
    "https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Categories?select=*";
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

export const getSubCategories = async () => {
  const url =
    "https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Categories?select=*&or=(parent.is.null,parent.eq.)";
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

export const createCategory = async (values) => {
  try {
    const url =
      "https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Categories";
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

    const requestData = { category: values.category, parent: values.parent };

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
  } catch (error) {
    console.error("Error:", error);
    return { status: false, error: error.message };
  }
};

export const updateCategory = async (values) => {
  const url = `https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Categories?id=eq.${values.id}`;
  // https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Categories?select=*&or=(parent.is.null,parent.eq.)
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
  const requestData = {
    category: values.category,
    parent: values.parent,
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
