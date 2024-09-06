import { getListings } from "../auth/postData/read.js";
import { displayProducts } from "../render/productCards.js";

export async function renderCarousel() {
  const carouselParent = document.querySelector(".carousel");

  const listings = await getListings();

  // Log the data structure to understand it
  console.log(listings);

  // Check if listings contains an array
  if (Array.isArray(listings)) {
    generateCarousel(listings);
  } else if (Array.isArray(listings.data)) {
    // Adjust this based on the actual structure
    generateCarousel(listings.data);
  } else {
    console.error("Expected an array of listings, but got:", listings);
  }
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
    indicator.dataset.bsTarget = "#carouselExampleIndicators";
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
