import { API_BASE_URL } from "../../constants.js";
import { fetchToken } from "../../fetchToken.js";

const action = "/auction/listings";

const queryParams = "_bids=true&_seller=true";

export async function getListings(
  page,
  limit,
  sort = "created",
  sortOrder = "desc",
) {
  try {
    const getListingsURL = `${API_BASE_URL}/auction/listings?page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}&${queryParams}`;

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

export async function getListing(id) {
  if (!id) {
    throw new Error("GET requires a listing ID");
  }
  const getListingURL = `${API_BASE_URL}${action}/${id}?${queryParams}`;
  const response = await fetchToken(getListingURL);
  return await response.json();
}
