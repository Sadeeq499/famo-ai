export const getStats = async () => {
  const url = "https://m0eh6s.buildship.run/famoai/get?module=portal";

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
