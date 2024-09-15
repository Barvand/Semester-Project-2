import { API_BASE_URL } from "../../constants.js";
import { fetchToken } from "../../fetchToken.js";

const queryParams = "_bids=true&_seller=true&_active=true";

export async function fetchListingsWithPagination(
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
