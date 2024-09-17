import { removeListing } from "../auth/postData/index.js";
import { load } from "../storage/load.js";

export async function deleteListingFormListener() {
  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  const profile = load("profile");

  console.log(profile.name);

  try {
    // Attempt to remove the post with the given ID
    await removeListing(id);

    // Show a success message to the user
    showDeletionMessage();

    // Redirect to the profile page after a delay
    setTimeout(() => {
      window.location.href = `/profiles/profile/?name=${profile.name}`;
    }, 2000); // 3000ms = 3 seconds
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting post:", error);
  }
}

function showDeletionMessage() {
  const messageContainer = document.querySelector(".modal-body");
  messageContainer.classList.add("alert", "alert-success");
  messageContainer.textContent =
    "Post deleted successfully. Redirecting to your profile...";

  setTimeout(() => {
    messageContainer.remove();
  }, 2000);
}

export async function deleteClickPost() {
  const deleteBtn = document.querySelector(".deletion-delete-btn");

  // Attach the event listener correctly
  deleteBtn.addEventListener("click", async () => {
    // Call the deleteListingFormListener function when the button is clicked
    await deleteListingFormListener();
  });
}
