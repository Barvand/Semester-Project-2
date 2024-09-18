import { getListings } from "../auth/postData/read.js";
import { displayProducts } from "../render/productCards.js";
import { renderLoadMoreBtn } from "../filters/listingsPagination.js";

export async function renderAllPosts() {
  try {
    let currentPage = 1; // Global variable to keep track of the current page
    const limit = 50; // Number of items to load per request
    const response = await getListings(currentPage, limit);
    const listings = response.data;
    const listingContainer = document.querySelector(".listings-grid");

    listingContainer.innerHTML = "";

    displayProducts(listings, listingContainer);
    renderLoadMoreBtn();
  } catch (error) {
    console.error("Error rendering posts:", error);
  }
}
