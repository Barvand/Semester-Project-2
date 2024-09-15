import * as listeners from "../js/handlers/index.js";
import { getListings } from "./auth/postData/read.js";
import { displayProducts } from "./render/productCards.js";
import { renderSingleListing } from "./render/productPage.js";
import { renderProfile } from "./render/profilePage.js";
import { searchBar } from "./filters/index.js";
import { displayCredits } from "./render/navCredits.js";
import { renderCarousel } from "./render/carousel.js";
import { renderNavUser } from "./render/navigation.js";
import { handleProfiles } from "./handlers/profilesHandler.js";
import { fetchListingsWithPagination } from "./auth/postData/readPagination.js";
import { renderLoadMoreBtn } from "./handlers/listingsPagination.js";

displayCredits();
renderCarousel();
renderNavUser();

listeners.setRegisterFormListener();
listeners.setLoginFormListener();
listeners.setCreateListingFormListener();
listeners.setUpdateProfileFormListener();

searchBar();

const individualListing = document.querySelector(".listing-page");
const listingContainer = document.querySelector(".listings-grid");
const profileContainer = document.querySelector(".profile-page");

async function renderAllPosts() {
  try {
    let currentPage = 1; // Global variable to keep track of the current page
    const limit = 50; // Number of items to load per request
    const response = await fetchListingsWithPagination(currentPage, limit);
    const listings = response.data;
    const listingContainer = document.querySelector(".listings-grid");

    displayProducts(listings, listingContainer);
    renderLoadMoreBtn();
  } catch (error) {
    console.error("Error rendering posts:", error);
  }
}

const path = location.pathname;

switch (path) {
  case "/listings/":
    renderAllPosts(listingContainer);
    break;
  case "/listings/listing/":
    renderSingleListing(individualListing);
    break;
  case "/profiles/profile/":
    renderProfile(profileContainer);
    break;
  case "/profiles/":
    handleProfiles();
}
