import { API_BASE_URL } from "../../constants.js";
import { fetchToken } from "../../fetchToken.js";

const action = "/auction/profiles";
const queryParams = "_listings=true&&_wins=true";

export async function getProfiles() {
  const getProfileURL = `${API_BASE_URL}${action}?${queryParams}`;
  const response = await fetchToken(getProfileURL);
  const result = await response.json();

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

export async function fetchProfilesWithPagination(
  page,
  limit,
  sort = "name",
  sortOrder = "asc",
) {
  try {
    const getListingsURL = `${API_BASE_URL}/auction/profiles?page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}&${queryParams}`;

    const response = await fetchToken(getListingsURL);

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
