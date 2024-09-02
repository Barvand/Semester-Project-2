import { API_BASE_URL } from "../constants.js";
import * as storage from "../storage/index.js";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
  const loginURL = API_BASE_URL + action;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST", // Ensure this is the correct method for login
      body,
    });

    if (response.ok) {
      // If login is successful
      const { data } = await response.json(); // Destructure 'data' from response
      const { accessToken, ...user } = data; // Destructure 'accessToken' and the rest of the user data

      // Save token and user profile to storage
      storage.save("token", accessToken);
      storage.save("profile", user);

      // Redirect to the user's profile page
      window.location.href = `/profiles/profile/?name=${user.name}`;
    } else {
      // If login fails
      const errorResponse = await response.json(); // Parse the response as JSON
      const detailedErrorMessage = errorResponse.errors[0].message;

      const displayError = document.querySelector(".error-message-login"); // Use the correct class selector
      if (displayError) {
        displayError.innerHTML = ""; // Clear any existing content
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
        displayError.innerText = detailedErrorMessage; // Set the error message
      }
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Login failed:", error);

    const displayError = document.querySelector(".error-message-login"); // Use the correct class selector
    if (displayError) {
      displayError.innerHTML = ""; // Clear any existing content
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
        "An unexpected error occurred. Please try again."; // Set the network error message
    }
  }
}
