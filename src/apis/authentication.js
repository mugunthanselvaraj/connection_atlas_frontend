import { DOMAIN } from "./config";
export const registerApi = async (bodyObject) => {
  // Set up options for the fetch request
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  };

  try {
    const response = await fetch(`${DOMAIN}/users`, requestOptions);
    console.log(response);
    if (response.ok) {
      const result = await response.json();
      return [result, ""];
    } else {
      const error = await response.json();
      return ["", error];
    }
    //console.log("Response:", response.errors);
    //const errorMessage = await response.message;
  } catch (error) {
    console.error("Error", error);
    return ["", error];
  }
};

export const loginApi = async (bodyObject) => {
  // Set up options for the fetch request
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  };

  try {
    const response = await fetch(`${DOMAIN}/users/sign_in`, requestOptions);

    if (response.ok) {
      return [response, ""];
    } else {
      return ["", response];
    }
    //console.log("Response:", response.errors);
    //const errorMessage = await response.message;
  } catch (error) {
    console.error("Error", error);
    return ["", error];
  }
};

export const logOutApi = async (jwtToken) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: jwtToken,
    },
  };

  try {
    const response = await fetch(`${DOMAIN}/users/sign_out`, requestOptions);

    if (response.ok) {
      return [response, ""];
    } else {
      return ["", response];
    }
    //console.log("Response:", response.errors);
    //const errorMessage = await response.message;
  } catch (error) {
    console.error("Error", error);
    return ["", error];
  }
};
