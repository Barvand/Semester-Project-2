import { getProfile } from "../auth/profileData/read.js";
import { load } from "../storage/load.js";
import { updateProfile } from "../auth/profileData/update.js";

/**
 * Sets up a listener on the profile edit form to handle profile updates.
 *
 * This function:
 * - Loads the existing profile data from localStorage.
 * - Populates the form fields with the loaded data.
 * - Fetches additional profile data and fills in the corresponding fields.
 * - Adds a submit event listener to handle form submission.
 * - Updates the profile through the API and localStorage.
 * - Displays a success message and redirects the user to their profile page.
 *
 * @async
 * @function updateProfileFormListener
 * @throws Will log an error message if the form element is not found or if the profile update process fails.
 */
export async function setUpdateProfileFormListener() {
  const form = document.querySelector("#editProfileForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);

      // Convert FormData to an object
      const profile = Object.fromEntries(formData.entries());

      // Create the avatar object if fields are provided
      const avatar =
        profile.avatarUrl || profile.avatarAlt
          ? {
              url: profile.avatarUrl || "",
              alt: profile.avatarAlt || "",
            }
          : undefined;

      // Create the banner object if fields are provided
      const banner =
        profile.bannerUrl || profile.bannerAlt
          ? {
              url: profile.bannerUrl || "",
              alt: profile.bannerAlt || "",
            }
          : undefined;

      // Structure the profile object to only include avatar, banner, and bio
      const profileUpdateData = {
        bio: profile.bio || "", // Include bio if it's defined
        avatar, // Include avatar if it's defined
        banner, // Include banner if it's defined
      };
      try {
        // Send it to the API for updating the profile
        await updateProfile(profileUpdateData);

        // Refresh the page after a successful update
        location.reload();
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    });
  }
}

setUpdateProfileFormListener();
