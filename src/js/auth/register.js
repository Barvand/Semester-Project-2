import { API_BASE_URL } from "../constants.js";

const action = "auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_BASE_URL + action;
  const body = JSON.stringify(profile);

  const response = await fetch(registerURL, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body,
  });

  const result = await response.json();
  console.log(result);

  return result;
}
