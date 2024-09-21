import { API_BASE_URL } from "../constants.js";


const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_BASE_URL + action;
  const body = JSON.stringify(profile);

  const displayError = document.querySelector(".error-message-registration");

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

      displayError.textContent = "You have created an account";
      displayError.classList.add(
        "text-success",
        "alert",
        "alert-success",
        "fw-bold",
      );

     
      /* eslint-disable no-undef */
      const registrationModal = bootstrap.Modal.getInstance(
        document.getElementById("registerModal"),
      );
      if (registrationModal) {
        setTimeout(() => {
          registrationModal.hide();

          /* eslint-disable no-undef */
          const loginModal = new bootstrap.Modal(
            document.getElementById("loginModal"),
          );
          loginModal.show();
        }, 2000); // 2000 milliseconds = 2 seconds
      }
    } else {
      // Handle failed registration
      const errorMessage = await response.json();
      const detailedErrorMessage = errorMessage.errors[0].message;

      if (displayError) {
        displayError.innerHTML = ""; // Clear any existing content
        displayError.classList.add(
          "text-danger",
          "text-center",
          "alert",
          "alert-danger",
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
