import { createListing } from "../auth/postData/create.js";

// Trick from course assignment video - Creates an object with the keys and values with a single line of code.
/**
 * setCreatePostFormListener retrieves all required data from the html form and creates the post. This function does not require any
 * params, as its hardcoded atm.
 * It will send a post request with all the data to the API with the function createPost();
 * The API wants the tags to be an array, therefore this function converts string into an Array otherwise it does not work.
 * returns the user to the feed page after creation of the post.
 */
export async function setCreateListingFormListener() {
  const form = document.querySelector("#createListingForm");
  const errorDiv = document.querySelector(".error-message-listing"); // Select the error message div
  const listingBtn = document.querySelector(".btn-create-listing");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);

      // Check if the user is logged in
      const token = localStorage.getItem("token");
      const profile = localStorage.getItem("profile");

      if (!token || !profile) {
        // User is not logged in
        if (errorDiv) {
          errorDiv.textContent = "You must be logged in to create a listing.";
          errorDiv.style.display = "block";
          errorDiv.classList.add("alert", "alert-danger");
        }
        return;
      }

      // Create post object
      const mediaUrls = formData.getAll("media-url"); // Retrieve all media URLs from the form
      const mediaAlts = formData.getAll("media-alt"); // Retrieve all ALT texts from the form
      const tags = formData.getAll("tags"); // Retrieve all tags from the form

      const mediaArray = mediaUrls.map((url, index) => {
        return {
          url: url,
          alt: mediaAlts[index] || "", // Ensure alt text corresponds to the correct URL
        };
      });

      const listing = {
        title: formData.get("title"),
        description: formData.get("description"),
        endsAt: formData.get("deadline-date"),
        media: mediaArray, // Assign the constructed media array
        tags: tags, // Assign the tags array
      };

      try {
        // Send the listing to the API
        const response = await createListing(listing);
        listingBtn.style.display = "none";
      } catch (error) {
        // Check if the response contains an error field or some indicator of failure
        console.error("An error occurred while submitting the bid:", error);
      }
    });
  }
}
