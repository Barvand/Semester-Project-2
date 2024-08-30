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
  const errorDiv = document.querySelector("#error-message"); // Select the error message div

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);

      // Clear any previous error messages
      if (errorDiv) {
        errorDiv.textContent = "";
        errorDiv.style.display = "none";
      }

      // Check if the user is logged in
      const token = localStorage.getItem("token");
      const profile = localStorage.getItem("profile");

      if (!token || !profile) {
        // User is not logged in
        if (errorDiv) {
          errorDiv.textContent = "You must be logged in to create a listing.";
          errorDiv.style.display = "block";
        }

        return;
      }

      // Create post object
      const listing = {
        title: formData.get("title"),
        description: formData.get("description"),
        endsAt: formData.get("deadline-date"),
        media: [
          {
            url: formData.get("media-url"), // Retrieve the URL from the form
            alt: formData.get("media-alt"), // Retrieve the ALT text from the form
          },
        ],
      };

      // Validation to ensure required fields are present
      if (!listing.title || !listing.endsAt) {
        if (errorDiv) {
          errorDiv.textContent = "Title and deadline are required fields.";
          errorDiv.style.display = "block";
        }
        return;
      }

      try {
        // Send it to the API
        const response = await createListing(listing); // await the response

        if (response.ok) {
          console.log("Listing created:", listing);

          // After post creation, redirect to the feed page or show success message
          // For example:
          // window.location.href = "/feed";
        } else {
          throw new Error(`Failed to create listing: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error creating listing:", error);

        // Display error message to the user
        if (errorDiv) {
          errorDiv.textContent = `Error creating listing: ${error.message}`;
          errorDiv.style.display = "block";
        }
      }
    });
  }
}
