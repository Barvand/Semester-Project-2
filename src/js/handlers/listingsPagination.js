import { fetchListingsWithPagination } from "../auth/postData/readPagination.js";
import { displayProducts } from "../render/productCards.js";

let currentPage = 2; // Global variable to keep track of the current page
const limit = 50; // Number of items to load per request

// Function to load and display more listings
async function loadMoreListings() {
  try {
    const response = await fetchListingsWithPagination(currentPage, limit);
    const listings = response.data;

    // Ensure listings exist and append them to the container
    if (listings && listings.length > 0) {
      const listingContainer = document.querySelector(".listings-grid");
      displayProducts(listings, listingContainer);
      // Increment the page number after successfully loading more listings
      currentPage++;
    } else {
      // Hide the "Load More" button if no more items are available
      const loadMoreBtn = document.querySelector(".load-more button");
      if (loadMoreBtn) {
        loadMoreBtn.style.display = "none";
      }
    }
  } catch (error) {
    console.error("Error loading more listings:", error);
  }
}

// Function to render the "Load More" button
export function renderLoadMoreBtn() {
  const parentElement = document.querySelector(".load-more");
  const existingBtn = parentElement.querySelector("button");

  // If the button already exists, no need to create a new one
  if (existingBtn) return;

  const btn = document.createElement("button");
  btn.textContent = "Load more";
  btn.classList.add("fw-bold", "btn", "btn-primary", "text-white");
  parentElement.appendChild(btn);

  btn.addEventListener("click", async () => {
    await loadMoreListings(); // Fetch and display the next set of items
  });
}
