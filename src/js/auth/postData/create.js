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

export async function createBids(postData) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const createBiddingUrl = `${API_BASE_URL}${action}/${id}/bids`;

  try {
    const response = await fetchToken(createBiddingUrl, {
      method,
      body: JSON.stringify(postData),
    });

    // Check if registration was successful
    if (response.ok) {
      const result = await response.json();

      const displayError = document.querySelector(".error-message");
      displayError.textContent = `Bid has been placed, please wait.`;
      displayError.classList.add(
        "alert",
        "alert-success",
        "text-center",
        "text-success",
      );
      displayError.textContent = "Bid has been placed, please wait";

      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000ms = 2 seconds
    } else {
      // Handle failed registration
      const errorMessage = await response.json();
      const detailedErrorMessage = errorMessage.errors[0].message;

      const displayError = document.querySelector(".error-message");

      if (displayError) {
        displayError.innerHTML = ""; // Clear any existing content
        displayError.classList.add(
          "text-danger",
          "text-center",
          "alert",
          "alert-danger",
        );
        displayError.innerText = detailedErrorMessage;
      }

      return {
        success: false,
        error: errorMessage.message || response.statusText,
      };
    }
  } catch (error) {
    console.error("Bidding failed:", error);

    const displayError = document.querySelector(".error-message");
    if (displayError) {
      displayError.innerHTML = "";
      displayError.classList.add(
        "text-danger",
        "text-center",
        "border",
        "border-1",
        "border-danger",
        "p-2",
        "m-2",
        "rounded",
      );
      displayError.innerText =
        "Network error or unexpected issue occurred. Please try again.";
    }

    return { success: false, error: "Network error or unexpected issue" };
  }
}
