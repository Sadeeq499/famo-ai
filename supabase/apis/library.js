export const getLibrary = async () => {
  const url =
    "https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Library?select=*";
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


export const deleteLibrary = async (id) => {
  const url = `https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Library?id=eq.${id}`;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
  };
  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return { status: true };
    // Handle success response
  } catch (error) {
    console.error('Error:', error);

    return { status: false, error: error.message };
    // Handle error
  }
};

export const createLibrary = async (
  { media, media_type, label }
) => {
  const url = "https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Library";
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const requestData = {
    media,
    media_type,
    tags: label,
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


export const updateLibrary = async (id, tags) => {
  const url = `https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_Library?id=eq.${id}`;
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY;

  const requestData = {
    tags,
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