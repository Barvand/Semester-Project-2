import { removeListing } from "../auth/postData/index.js";

// Example of calling from an async function
export async function deleteListingFormListener() {
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  // Display a confirmation dialog to the user
  const confirmed = window.confirm(
    "Are you sure you want to delete this post?",
  );

  if (confirmed) {
    try {
      // Remove the post with the given ID
      await removeListing(id);
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting post:", error);
    }
  }
}
