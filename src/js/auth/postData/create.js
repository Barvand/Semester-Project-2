import { API_BASE_URL } from "../../constants.js";
import { fetchToken } from "../../fetchToken.js";

const action = "/auction/listings";
const method = "post";

/**
 * Sends postData to an API endpoint and returns the JSON response
 * @param {array} postData - The data to be posted to the API
 * @returns {Promise<Object>} - The JSON response from the API
 */
export async function createListing(postData) {
  const createPostURL = API_BASE_URL + action;

  const response = await fetchToken(createPostURL, {
    method,
    body: JSON.stringify(postData),
  });

  return await response.json();
}
