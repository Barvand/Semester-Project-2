import { getListings } from "../auth/postData/read.js";
import { fetchListingsWithPagination } from "../auth/postData/readPagination.js";
import { displayProducts } from "../render/productCards.js";
import { renderLoadMoreBtn } from "../handlers/listingsPagination.js";

// Track the current sorting state
let isNewToOld = true; // Initially sorting from New to Old
let isHighToLow = true;

async function fetchAndDisplayListings(page, limit, sort, sortOrder) {
  try {
    const getListings = await fetchListingsWithPagination(
      page,
      limit,
      sort,
      sortOrder,
    );
    const listings = getListings.data; // Adjust based on your API response structure

    // Display the sorted listings
    const listingContainer = document.querySelector(".listings-grid");
    listingContainer.innerHTML = ""; // Clear existing listings
    displayProducts(listings, listingContainer);
  } catch (error) {
    console.error("Error fetching sorted listings:", error);
  }
}

export async function sortNewToOld() {
  const page = 1; // Reset to the first page when sorting changes
  const limit = 50;
  const sort = "created"; // Sort by creation date
  const sortOrder = isNewToOld ? "desc" : "asc"; // Toggle sorting order

  await fetchAndDisplayListings(page, limit, sort, sortOrder);

  // Toggle the sorting state
  isNewToOld = !isNewToOld;
}

export async function sortNewToOldBtn() {
  const sortNewBtn = document
    .getElementById("sortNewToOld")
    .addEventListener("click", sortNewToOld);
}

// Does not use the sort in the URL as unable to make it work with the count of bids,
// fetch array and sort instead

export async function fetchAndSortListings(page, limit, sortOrder) {
  try {
    // Fetch the latest listings
    const response = await getListings(); // Ensure getListings() fetches data correctly
    let listings = response.data; // Adjust based on your API response structure

    console.log(listings);

    // Sort listings based on the number of bids
    listings = listings.sort((a, b) => {
      const bidsA = a._count.bids || 0;
      const bidsB = b._count.bids || 0;
      return sortOrder === "desc" ? bidsB - bidsA : bidsA - bidsB;
    });

    // Update the UI with sorted listings
    const listingContainer = document.querySelector(".listings-grid");
    listingContainer.innerHTML = "";
    displayProducts(listings, listingContainer);
    renderLoadMoreBtn();
  } catch (error) {
    console.error("Error fetching and sorting listings:", error);
  }
}

export async function sortByMostBids() {
  const mostBidsBtn = document.getElementById("sortHighestBids");
  const icon = mostBidsBtn.querySelector("i");
  mostBidsBtn.addEventListener("click", () => {
    const page = 1;
    const limit = 50;
    const sortOrder = isHighToLow ? "desc" : "asc"; // Toggle sorting order

    isHighToLow = !isHighToLow;
    fetchAndSortListings(page, limit, sortOrder);
    icon.classList.toggle("rotateIcon");
  });
}
