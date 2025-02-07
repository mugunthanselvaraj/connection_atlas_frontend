import { DOMAIN_VERSION_1 } from "./config";
export const addEvent = async (jwtToken, bodyObject) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwtToken,
    },
    body: JSON.stringify(bodyObject),
  };

  try {
    const response = await fetch(`${DOMAIN_VERSION_1}/events`, requestOptions);
    console.log(response);
    if (response.ok) {
      const result = await response.json();
      return [result, ""];
    } else if (response.status == 401) {
      return ["", { message: "You are unauthorized" }];
    } else {
      const error = await response.json();
      return ["", error];
    }
  } catch (error) {
    return ["", error];
  }
};
