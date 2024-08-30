import * as listeners from "../js/handlers/index.js";
import { getListings } from "./auth/postData/read.js";
import { displayProducts } from "./render/productCards.js";

listeners.setRegisterFormListener();
listeners.setLoginFormListener();
listeners.setCreateListingFormListener();

const listingContainer = document.querySelector("listings-grid");

async function renderAllPosts(parentElement) {
  try {
    const response = await getListings();
    const listings = response.data;

    console.log(listings);

    displayProducts(listings);
  } catch (error) {
    console.error("Error rendering posts:", error);
  }
}

const path = location.pathname;

switch (path) {
  case "/listings/":
    renderAllPosts(listingContainer);
    break;
}
