import { load } from "../storage/load.js";

export function isUserLoggedIn(parentElement) {
  // Retrieve the current user's profile from local storage or any other source
  const currentUser = load("profile");

  if (currentUser) {
    return true;
  } else {
    // User is not logged in, display an error message
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Please log in to see this content.";
    errorMessage.classList.add("alert", "alert-danger", "text-center");
    parentElement.appendChild(errorMessage); // Append error message to the body or another container

    // Optionally, you can redirect the user to a login page
    // window.location.href = "/login";

    return false;
  }
}
