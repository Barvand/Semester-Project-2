import { API_BASE_URL } from "../../constants.js";
import { fetchToken } from "../../fetchToken.js";

const action = "/auction/listings";
const method = "delete";

export async function removeListing(id) {
  if (!id) {
    throw new Error("Delete requires a listing ID ");
  }

  const removePostURL = `${API_BASE_URL}${action}/${id}`;

  const response = await fetchToken(removePostURL, {
    method,
  });

  console.log(response);

  return await response.json();
}
