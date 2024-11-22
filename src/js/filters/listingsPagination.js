import { getListings } from "../auth/postData/read.js";
import { displayProducts } from "../render/productCards.js";
import { h1Header } from "../render/headers.js";

export async function renderAllPosts() {
  try {
    let currentPage = 1; // Track the current page
    const limit = 100; // Number of items to load per request
    const listingContainer = document.querySelector(".listings-grid");

    listingContainer.innerHTML = ""; // Clear existing listings

    async function loadPage(page) {
      const response = await getListings(page, limit);
      const listings = response.data;

      // Get the current date
      const now = new Date();

      // Filter out expired listings
      const validListings = listings.filter((listing) => {
        const endsAtDate = new Date(listing.endsAt);
        return endsAtDate > now; // Keep only valid listings
      });

      // Append valid listings to the container
      displayProducts(validListings, listingContainer);

      // Render the Load More button based on valid listings
      renderLoadMoreBtn(async () => {
        currentPage++; // Increment page number
        await loadPage(currentPage); // Load the next page
      }, validListings);
    }

    // Load the first page
    h1Header("Listings", listingContainer);
    await loadPage(currentPage);
  } catch (error) {
    console.error("Error rendering posts:", error);
  }
}

// Function to render the "Load More" button
export function renderLoadMoreBtn(loadMoreCallback, array) {
  const parentElement = document.querySelector(".load-more");
  const existingBtn = parentElement.querySelector("button");

  // If the button already exists, check the items length
  if (existingBtn) {
    if (array.length === 0) {
      existingBtn.style.display = "none"; // Hide the button if no items
    }
    return;
  }

  // Create a new button if it doesn't exist
  const btn = document.createElement("button");
  btn.textContent = "Load more";
  btn.classList.add("fw-bold", "btn", "btn-primary", "text-white");
  parentElement.appendChild(btn);

  // Attach the provided loadMoreCallback as the event listener for pagination
  btn.addEventListener("click", async () => {
    await loadMoreCallback(); // Trigger the callback to load more items
  });

  // Check items length to hide or show the button initially
  if (array.length === 0) {
    btn.style.display = "none"; // Hide the button if no items
  }
}
