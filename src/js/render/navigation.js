import { load } from "../../js/storage/index.js";
import { logout } from "../auth/logout.js";

export async function renderNavUser() {
  const registerBtn = document.querySelector(".register-btn");
  const loginBtn = document.querySelector(".login-btn");

  // Load the current user's profile
  const currentUser = load("profile");

  // Check if the user is logged in
  if (!currentUser) {
    // Show register and login buttons if not logged in
    registerBtn.style.display = "block";
    loginBtn.style.display = "block";

    // Remove modal-related attributes from the register button
    registerBtn.removeAttribute("data-bs-toggle");
    registerBtn.removeAttribute("data-bs-target");

    return;
  } else {
    // Update buttons if user is logged in
    registerBtn.textContent = "Profiles";
    registerBtn.href = "/profiles/index.html";

    // Remove modal-related attributes from the register button
    registerBtn.removeAttribute("data-bs-toggle");
    registerBtn.removeAttribute("data-bs-target");

    loginBtn.textContent = `Logout`;
    loginBtn.style.cursor = "pointer";
    loginBtn.addEventListener("click", () => {
      logout();
    });
  }
}
