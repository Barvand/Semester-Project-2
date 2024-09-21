import { API_BASE_URL } from "../../constants.js";
import { fetchToken } from "../../fetchToken.js";
import * as storage from "../../storage/index.js";

const action = "/auction/profiles";
const method = "put";

export async function updateProfile(profileData) {
  const profile = storage.load("profile");

  const updateProfileURL = `${API_BASE_URL}${action}/${profile.name}`;

  const response = await fetchToken(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });

  return await response.json();
}
