import { getListings } from "../auth/postData/read.js";
import { displayProducts } from "../render/productCards.js";

let currentPage = 2; // Tracks the current page
let limit = 50; // Items per page
let sort = "created"; // Default sort field
let sortOrder = "desc"; // Default sort order

async function loadMoreListings() {
  try {
    const response = await getListings(currentPage, limit, sort, sortOrder);
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
    await loadMoreListings(); // Fetch and display the next set of items based on the current state
  });
}
