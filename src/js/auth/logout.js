import { remove } from "../storage/index.js"; // Assuming 'remove' is a function from your storage module

export async function logout() {
  // Remove profile and token from storage
  remove("profile");
  remove("token");

  // Optionally, redirect to the login page or homepage
  window.location.href = "index.html"; // Adjust this URL as needed
}
