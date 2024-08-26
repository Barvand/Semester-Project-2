import { load } from "../js/storage/index.js";

/**
 * Takes the token from the local storage. This function is used as authorization header.
 * @returns {Object} - the header data, authorization and content Type.
 *
 * @example
 * const token = load("token");
 * return {
 * "content-type": "aaplication/json",
 * Authorization: `Bearer token`.
 * };
 */
export function headers() {
  const token = load("token");

  return {
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Fetches a token from the specified URL with the given options and headers.
 *
 * @param {string} url - The URL to send the fetch request to.
 * @param {Object} options - Additional options for the fetch request (e.g., method, body).
 * @returns {Promise<Response>} - A promise that resolves to the fetch response.
 *
 * @example
 * const url = 'https://api.example.com/token';
 * const options = {
 *   method: 'POST',
 *   body: JSON.stringify({ username: 'user', password: 'pass' })
 * };
 * fetchToken(url, options)
 *   .then(response => response.json())
 *   .then(data => console.log(data)) to see if info is correct.
 *   .catch(error => console.error('Error:', error));
 */
export async function fetchToken(url, options) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
