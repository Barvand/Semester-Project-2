import { API_BASE_URL } from "../constants.js";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_BASE_URL + action;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    // Check if registration was successful
    if (response.ok) {
      const result = await response.json();

      window.location.href = `/profiles/profile/?name=${profile.name}`;
    } else {
      // Handle failed registration
      const errorMessage = await response.json();
      const detailedErrorMessage = errorMessage.errors[0].message;

      const displayError = document.querySelector(
        ".error-message-registration",
      );

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
        displayError.innerText = detailedErrorMessage;
      }

      return {
        success: false,
        error: errorMessage.message || response.statusText,
      };
    }
  } catch (error) {
    console.error("Registration failed:", error);

    const displayError = document.querySelector(".error-message-registration");
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
        "Network error or unexpected issue occurred. Please try again.";
    }

    return { success: false, error: "Network error or unexpected issue" };
  }
}
