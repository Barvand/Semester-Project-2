import { getListings } from "../auth/postData/read.js";
import { displayProducts } from "../render/productCards.js";
import { calculateHoursLeft } from "../render/productCards.js";

export async function renderCarousel() {
  const listings = await getListings();
  const listingsArray = listings.data;

  // Filter listings that expire within 100 hours
  const now = new Date();
  const filteredListings = listingsArray.filter((listing) => {
    const expirationDate = new Date(listing.endsAt); // Convert endsAt to a Date object

    // If endsAt is in the past, exclude the listing
    if (expirationDate < now) {
      return false;
    }

    const timeDiff = (expirationDate - now) / (1000 * 60 * 60); // Difference in hours
    return timeDiff > 1 && timeDiff <= 100; // Listings expiring within 100 hours
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

  generateCarousel(filteredListings);
}

function generateCarousel(listings) {
  const indicators = document.querySelector(".carousel-indicators");
  const carouselInner = document.querySelector(".carousel-inner");

  // Group listings into chunks of 4
  const chunkSize = 4;
  for (let i = 0; i < listings.length; i += chunkSize) {
    const chunk = listings.slice(i, i + chunkSize);

    // Create carousel indicators
    const indicator = document.createElement("button");
    indicator.type = "button";
    indicator.dataset.bsTarget = "#carouselIndicators";
    indicator.dataset.bsSlideTo = i / chunkSize;
    indicator.ariaLabel = `Slide ${i / chunkSize + 1}`;
    if (i === 0) {
      indicator.classList.add("active");
      indicator.ariaCurrent = "true";
    }
    indicators.appendChild(indicator);

    // Create carousel items
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (i === 0) {
      carouselItem.classList.add("active");
    }

    // Create a container for the cards inside the carousel item
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("row");

    // Render the chunk of products within the card container
    displayProducts(chunk, cardContainer); // Ensure this function handles the addition of "col-md-3" classes to cards

    // Append the card container to the carousel item
    carouselItem.appendChild(cardContainer);
    carouselInner.appendChild(carouselItem);
  }
}
