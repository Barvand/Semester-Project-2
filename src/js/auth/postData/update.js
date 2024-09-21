import { API_BASE_URL } from "../../constants.js";

import { fetchToken } from "../../fetchToken.js";

const action = "/listings";
const method = "put";

/**
 * Updates a post with the given post data.
 * @param {Object} postData - The data of the post to update.
 * @param {string|number} postData.id - The ID of the post to update.
 * @throws {Error} - Throws an error if postData.id is not provided.
 * @returns {Promise<Object>} - A promise that resolves to the JSON-parsed response of the updated post.
 */
export async function updatePost(postData) {
  if (!postData.id) {
    throw new Error("Update required a postID ");
  }

  const updatePostURL = `${API_BASE_URL}${action}/${postData.id}`;

  const response = await fetchToken(updatePostURL, {
    method,
    body: JSON.stringify(postData),
  });

  return await response.json();
}
