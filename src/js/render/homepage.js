import { getListings } from "../auth/postData/read.js";
import { displayProducts } from "./productCards.js";

export async function renderEndingSoonHomepage() {
  let currentPage = 1; // Global variable to keep track of the current page
  const limit = 50; // Number of items to load per request

  const listings = await getListings(currentPage, limit);
  const listingsArray = listings.data;

  const parentContainer = document.querySelector(".ending-listings");

  parentContainer.innerHTML = "";
  // Filter listings that expire within 100 hours
  const now = new Date();
  const filteredListings = listingsArray.filter((listing) => {
    const expirationDate = new Date(listing.endsAt); // Convert endsAt to a Date object

    // If endsAt is in the past, exclude the listing
    if (expirationDate < now) {
      return false;
    }

    const timeDiff = (expirationDate - now) / (1000 * 60 * 60); // Difference in hours
    return timeDiff > 1 && timeDiff <= 300; // Listings expiring within 100 hours
  });

  // If there are no valid listings, return early
  if (filteredListings.length === 0) {
    console.log("No valid listings to display.");
    return;
  }

  // Sort listings: highest bids first, no bids last
  filteredListings.sort((a, b) => {
    const aHasBids = a.bids.length > 0;
    const bHasBids = b.bids.length > 0;

    if (aHasBids && bHasBids) {
      // Both have bids, compare the highest bid
      const highestBidA = a.bids[a.bids.length - 1].amount;
      const highestBidB = b.bids[b.bids.length - 1].amount;
      return highestBidB - highestBidA; // Sort by highest bid amount
    } else if (aHasBids) {
      return -1; // a has bids, b does not, so a comes first
    } else if (bHasBids) {
      return 1; // b has bids, a does not, so b comes first
    } else {
      return 0; // Both have no bids, leave as is
    }
  });

  generateEndingSoonListings(filteredListings, parentContainer);
}

async function generateEndingSoonListings(listing, parentElement) {
  createHeader(parentElement);
  displayProducts(listing, parentElement); // Ensure this function handles the addition of "col-md-3" classes to cards
}

async function createHeader(parentElement) {
  const header = document.createElement("h2");
  header.textContent = `Ending soon`;
  header.classList.add(
    "border",
    "border-1",
    "bg-primary",
    "text-white",
    "text-center",
    "p-1",
    "rounded",
  );
  parentElement.appendChild(header);
}
