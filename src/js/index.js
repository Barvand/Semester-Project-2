import * as listeners from "../js/handlers/index.js";
import { renderSingleListing } from "./render/productPage.js";
import { renderProfile } from "./render/profilePage.js";
import { searchBar } from "./filters/index.js";
import { displayCredits } from "./render/navbar.js";
import { renderEndingSoonHomepage } from "./render/homepage.js";
import { renderNavUser } from "./render/navbar.js";
import { sortByMostBids } from "./filters/index.js";
import { sortNewToOldBtn } from "./filters/index.js";
import { deleteClickPost } from "../js/handlers/index.js";
import { renderMoreImageFields } from "./render/ListingForm.js";
import { renderProfilesPage } from "./handlers/profilesHandler.js";
import { renderAllPosts } from "./handlers/listingsPage.js";

displayCredits();
renderNavUser();
renderMoreImageFields();

listeners.setRegisterFormListener();
listeners.setLoginFormListener();
listeners.setCreateListingFormListener();
listeners.setUpdateProfileFormListener();

searchBar();

const individualListing = document.querySelector(".listing-page");
const listingContainer = document.querySelector(".listings-grid");
const profileContainer = document.querySelector(".profile-page");

const path = location.pathname;

switch (path) {
  case "/home/":
    renderEndingSoonHomepage();
    break;
  case "/listings/":
    renderAllPosts(listingContainer);
    sortByMostBids();
    sortNewToOldBtn();
    break;
  case "/listings/listing/":
    renderSingleListing(individualListing);
    deleteClickPost();
    break;
  case "/profiles/profile/":
    renderProfile(profileContainer);

    break;
  case "/profiles/":
    renderProfilesPage();
}
