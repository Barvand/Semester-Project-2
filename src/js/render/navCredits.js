import { getProfile } from "../auth/profileData/index.js";
import { load } from "../storage/load.js";

export async function displayCredits() {
  // Load the current user's profile
  const currentUser = load("profile");

  // Check if the user is logged in
  if (!currentUser) {
    // If not logged in, exit the function early
    return;
  }

  try {
    // Fetch the profile data based on the current user's name
    const profile = await getProfile(currentUser.name);

    // Get the credits from the profile data
    const credits = profile.data.credits;

    // Find the element where credits will be displayed
    const userCredits = document.querySelector(".credits");

    // Display the credits and make the element visible
    userCredits.innerHTML = `<p> Balance <i class="fa-solid fa-dollar-sign"></i> ${credits} </p>`;
    userCredits.classList.remove("d-none");
  } catch (error) {
    console.error("Error fetching or displaying credits:", error);
  }
}
