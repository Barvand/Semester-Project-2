import { getListings } from "../auth/postData/read.js";
import { displayProducts } from "../render/productCards.js";

// Track the current sorting state
let isNewToOld = true; // Initially sorting from New to Old
let isHighToLow = true;

async function fetchAndDisplayListings(page, limit, sort, sortOrder) {
  try {
    const allListings = await getListings(page, limit, sort, sortOrder);
    const listings = allListings.data; // Adjust based on your API response structure

    // Display the sorted listings
    const listingContainer = document.querySelector(".listings-grid");
    listingContainer.innerHTML = ""; // Clear existing listings
    displayProducts(listings, listingContainer);
  } catch (error) {
    console.error("Error fetching sorted listings:", error);
  }
}

export async function sortNewToOld() {
  const page = 1;
  const limit = 50;
  const sort = "created";
  const sortOrder = isNewToOld ? "desc" : "asc"; // Toggle sort order

  // Fetch and display sorted listings
  await fetchAndDisplayListings(page, limit, sort, sortOrder);

  // Toggle the sorting state
  isNewToOld = !isNewToOld;
}

export async function sortNewToOldBtn() {
  const sortNewBtn = document.getElementById("sortNewToOld");

  // Check if button exists before adding event listener
  if (sortNewBtn) {
    // Add event listener to the button
    sortNewBtn.addEventListener("click", async () => {
      await sortNewToOld();

      // Change the button text based on the current sorting state
      if (isNewToOld) {
        sortNewBtn.textContent = "Newest first";
      } else {
        sortNewBtn.textContent = "Oldest first";
      }
    });
  } else {
    console.error("Button with id 'sortNewToOld' not found");
  }
}

// Does not use the sort in the URL as unable to make it work with the count of bids,
// fetch array and sort instead

export async function fetchAndSortAllListings(sortOrder) {
  try {
    const allListings = [];
    const limit = 100; // Maximum allowed per request
    let page = 1;
    let hasMoreListings = true;

    // Fetch listings from multiple pages
    while (hasMoreListings) {
      const response = await getListings(page, limit); // Fetch a batch of listings
      const listings = response.data;

      if (listings.length < limit) {
        hasMoreListings = false;
      }

      allListings.push(...listings);
      page++;
    }

    // Filter out listings with no bids
    const filteredListings = allListings.filter(
      (listing) => (listing._count?.bids || 0) > 0,
    );

    // Sort listings based on the number of bids
    filteredListings.sort((a, b) => {
      const bidsA = a._count?.bids || 0;
      const bidsB = b._count?.bids || 0;
      return sortOrder === "desc" ? bidsA - bidsB : bidsB - bidsA;
    });

    // Update the UI with sorted listings
    const listingContainer = document.querySelector(".listings-grid");
    listingContainer.innerHTML = ""; // Clear existing listings
    displayProducts(filteredListings, listingContainer); // Display all sorted listings
  } catch (error) {
    console.error("Error fetching and sorting listings:", error);
  }
}

export async function sortByMostBids() {
  const mostBidsBtn = document.getElementById("sortHighestBids");
  const icon = mostBidsBtn.querySelector("i");
  mostBidsBtn.addEventListener("click", async () => {
    // Toggle sorting order
    isHighToLow = !isHighToLow;
    const sortOrder = isHighToLow ? "desc" : "asc"; // Determine sort order based on current state

    await fetchAndSortAllListings(sortOrder);

    // Toggle icon rotation
    icon.classList.toggle("rotateIcon");
  });
}
