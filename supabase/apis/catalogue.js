export const getLlms = async () => {
  const url =
    "https://dszdntohmezzveoalhfz.supabase.co/rest/v1/FAMOAI_AIModels?select=*";

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
