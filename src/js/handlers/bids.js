import { createBids } from "../auth/postData/create.js";
import { createBiddingTable } from "../render/bidForm.js";
// Trick from course assignment video - Creates an object with the keys and values with a single line of code.
/**
 * setCreatePostFormListener retrieves all required data from the html form and creates the post. This function does not require any
 * params, as its hardcoded atm.
 * It will send a post request with all the data to the API with the function createPost();
 * The API wants the tags to be an array, therefore this function converts string into an Array otherwise it does not work.
 * returns the user to the feed page after creation of the post.
 */
export async function setCreateBiddingFormListener() {
  const form = document.querySelector("#bidForm");
  const parentElement = document.querySelector(".bids");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(event.target);
      const bidAmount = formData.get("bidAmount"); // Get bid amount value

      // Create bid object to be sent to the API
      const amount = {
        amount: Number(bidAmount),
      };

      try {
        // Send the bid amount to the API
        await createBids(amount);

        location.reload();
      } catch (error) {
        console.error("Error placing bid:", error);
      }
    });
  } else {
    console.error("Bid form not found.");
  }
}
