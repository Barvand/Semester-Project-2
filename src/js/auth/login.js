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
      method,
      body,
    });

    if (response.ok) {
      // If login is successful
      const { accessToken, ...user } = await response.json();

      // Save token and user profile to storage
      storage.save("token", accessToken);
      storage.save("profile", user);

      // Redirect to another page
      console.log(user);
    } else {
      // If login fails
      // Handle the error
      const errorMessage = await response.text();
      console.error("Login failed:", errorMessage);

      const displayError = document.getElementsByClassName("error-message")[0]; // Access the first element in the collection
      displayError.innerHTML = ""; // Clear any existing content
      displayError.classList.add(
        "text-white",
        "text-center",
        "bg-danger",
        "p-2",
        "rounded",
      );
      displayError.innerText = "Username or password is invalid!"; // Set the text content
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Login failed:", error);
    // You can display an error message to the user if needed
  }
}
