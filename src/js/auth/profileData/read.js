import { API_BASE_URL } from "../../constants.js";
import { fetchToken } from "../../fetchToken.js";

const action = "/auction/profiles";
const queryParams = "_listings=true";

export async function getProfiles() {
  const getProfileURL = `${API_BASE_URL}${action}?${queryParams}`;
  const response = await fetchToken(getProfileURL);
  const result = await response.json();

  console.log(result);
  return result;
}

export async function getProfile(name) {
  if (!name) {
    throw new Error("GET requires a profile name");
  }

  const getProfileURL = `${API_BASE_URL}${action}/${name}?${queryParams}`;
  const response = await fetchToken(getProfileURL);

  return await response.json();
}

getProfiles();
