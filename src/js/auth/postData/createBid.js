import { API_BASE_URL } from "../../constants.js";
import { fetchToken } from "../../fetchToken.js";

const action = "/auction/listings";
const method = "post";

export async function createBids(postData) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const createBiddingUrl = `${API_BASE_URL}${action}/${id}/bids`;

  try {
    const response = await fetchToken(createBiddingUrl, {
      method,
      body: JSON.stringify(postData),
    });

    const displayError = document.querySelector(".error-message");

    // Check if registration was successful
    if (response.ok) {
      displayError.textContent = `Bid has been placed, please wait.`;
      displayError.classList.add(
        "alert",
        "alert-success",
        "text-center",
        "text-success",
      );

      // Remove classes to make sure the alert turns green if the user is displayed an error first
      // and submits a bid afterwards.
      displayError.classList.remove("text-danger", "alert-danger");
      displayError.textContent = "Bid has been placed, please wait";

      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000ms = 2 seconds
    } else {
      // Handle failed registration
      const errorMessage = await response.json();
      const detailedErrorMessage = errorMessage.errors[0].message;

      if (displayError) {
        displayError.innerHTML = "";
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
  }
}
