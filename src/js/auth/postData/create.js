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

  // error handling div
  const displayError = document.querySelector(".error-message-listing");

  try {
    const response = await fetchToken(createPostURL, {
      method,
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      createListingSuccessMessage(displayError);


    } else {
      // Handle failed listing
      const errorMessage = await response.json();
      const detailedErrorMessage = errorMessage.errors[0].message;

      createListingErrorMessage(displayError, detailedErrorMessage);

      return {
        success: false,
        error: errorMessage.message || response.statusText,
      };
    }
  } catch (error) {
    console.error("Placing a listing has failed:", error);
  }
}

function createListingErrorMessage(errorElement, message) {
  if (errorElement) {
    errorElement.innerHTML = "";
    errorElement.classList.add(
      "text-danger",
      "text-center",
      "alert",
      "alert-danger",
    );
    errorElement.innerText = message;
  }
}

async function createListingSuccessMessage(errorElement) {
  if (errorElement) {
    errorElement.innerHTML = "";
    errorElement.classList.add(
      "alert",
      "alert-success",
      "text-center",
      "text-success",
    );
    errorElement.textContent =
      "Successfully placed a listing. redirecting to the listings page";
    setTimeout(() => {
      window.location.href = "/listings/";
    }, 2000); // 2000ms = 2 seconds
  }
}