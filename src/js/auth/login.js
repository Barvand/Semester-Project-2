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

    // If login is successful
    if (response.ok) {
      const { data } = await response.json(); // Destructure 'data' from response
      const { accessToken, ...user } = data; // Destructure 'accessToken' and the rest of the user data

      console.log("Access Token:", accessToken); // Log the token to verify

      // Save token and user profile to storage
      storage.save("token", accessToken);
      storage.save("profile", user);

      // Redirect or handle successful login
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
