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

      // Validation to ensure required fields are present
      if (!listing.title || !listing.endsAt) {
        if (errorDiv) {
          errorDiv.textContent = "Title and deadline are required fields.";
          errorDiv.style.display = "block";
        }
        return;
      }

      try {
        // Send the listing to the API
        const response = await createListing(listing);

        // Check if the response contains an error field or some indicator of failure
        if (!response || response.error) {
          // Throw an error with the message from the response, if available
          throw new Error(response.error || "Failed to create listing");
        }

        // If no error, show a success message to the user
        showCreatingMessage();

        // Redirect to the profile page after a delay
        setTimeout(() => {
          window.location.href = `/listings/`;
        }, 2000); // 2000ms = 2 seconds
      } catch (error) {
        console.error("Error creating listing:", error);

        // Display error message to the user
        const errorDiv = document.getElementById("error-message"); // Assuming you have a div for error messages
        if (errorDiv) {
          errorDiv.textContent = `Error creating listing: ${error.message}`;
          errorDiv.style.display = "block";
          errorDiv.classList.add("alert", "alert-danger");
        }
      }
    });
  }
}

function showCreatingMessage() {
  const errorDiv = document.querySelector(".error-message-listing");
  errorDiv.classList.add("alert", "alert-success");
  errorDiv.textContent =
    "Post created successfully. Redirecting to your listings...";

  // Remove the message after 2 seconds
  setTimeout(() => {
    errorDiv.textContent = ""; // Clear the content
    errorDiv.style.display = "none"; // Hide the message
  }, 2000);
}
