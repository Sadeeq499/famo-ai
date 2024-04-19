export async function getAllUsers() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    cache: "no-store",
  };

  const data = await fetch("/api/users", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
  return data;
}

export async function createUser(userData) {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    redirect: "follow",
    cache: "no-store",
  };

  const data = await fetch("/api/users", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
  return data;
}

export async function updateUser(userId, userData) {
  var requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    redirect: "follow",
    cache: "no-store",
  };

  const data = await fetch(`/api/users?id=${userId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
  return data;
}

export async function deleteUser(userId) {
  var requestOptions = {
    method: "DELETE",
    redirect: "follow",
    cache: "no-store",
  };

  const data = await fetch(`/api/users?id=${userId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
  return data;
}
