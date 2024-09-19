import { getProfile } from "../auth/profileData/index.js";
import { load } from "../storage/load.js";
import { displayProducts } from "./productCards.js";
import { renderEditModal } from "./editProfileModal.js";
import { isUserLoggedIn } from "../handlers/isUserLoggedIn.js";

export async function renderProfile() {
  const container = document.querySelector(".profile-page");
  // Get the post ID from the query string
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const name = params.get("name");

  try {
    // Fetch the post data based on the ID
    const profile = await getProfile(name);

    // this renders the user data.
    renderProfilePage(profile);
    renderEditModal(profile);

    // displays listings of the USER
    displayListings(profile);
    // displays winnings of the user
    displayWinnings(profile);
  } catch (error) {
    console.error("Error fetching or rendering post:", error);
  }
}

export async function renderProfilePage(profile) {
  const divElement = document.querySelector(".profile-page");
  divElement.classList.add("container-fluid", "p-0");

  // Container for the text to give it some padding
  const textContainer = document.createElement("div");
  textContainer.classList.add("card-body", "p-4", "d-flex");
  divElement.appendChild(textContainer);

  profileBannerDiv(profile, divElement);
  parentProfileInfo(profile, divElement);

  const flexContainer = document.createElement("div");
  flexContainer.classList.add(
    "d-flex",
    "flex-column",
    "justify-content-center",
    "container",
    "p-0",
  );
  textContainer.appendChild(flexContainer);
}

async function profileBannerDiv(profile, parentElement) {
  const currentUser = load("profile");

  if (currentUser.name === profile.data.name) {
    const profileBannerDiv = document.createElement("div");
    profileBannerDiv.classList.add("profile-banner");
    profileBannerDiv.style.backgroundImage = `url(${profile.data.banner.url})`;

    const editProfileDiv = document.createElement("div");
    editProfileDiv.classList.add("edit-profile", "col-12", "col-md-1");
    profileBannerDiv.appendChild(editProfileDiv);

    const editProfileText = document.createElement("p");
    editProfileText.classList.add(
      "p-1",
      "btn",
      "btn-custom",
      "bg-black",
      "text-white",
      "m-2",
    );
    editProfileText.innerText = "Edit profile";
    editProfileDiv.appendChild(editProfileText);

    editProfileText.setAttribute("data-bs-toggle", "modal");
    editProfileText.setAttribute("data-bs-target", "#editProfileModal");
    editProfileText.style.cursor = "pointer";
    parentElement.appendChild(profileBannerDiv);
  } else {
    const profileBannerDiv = document.createElement("div");
    profileBannerDiv.classList.add("profile-banner");
    profileBannerDiv.style.backgroundImage = `url(${profile.data.banner.url})`;
    parentElement.appendChild(profileBannerDiv);
  }
}

async function parentProfileInfo(profile, parentElement) {
  const profileInfoDiv = document.createElement("div");
  profileInfoDiv.classList.add(
    "row",
    "d-flex",
    "align-items-center",
    "mt-3",
    "profile-info",
    "justify-content-center",
  );

  createProfileAvatar(profile, profileInfoDiv);
  createSellerInfo(profile, profileInfoDiv);
  parentElement.appendChild(profileInfoDiv);
}

async function createProfileAvatar(profile, parentElement) {
  const avatarWrapper = document.createElement("div");

  // Set the background image using the correct syntax
  avatarWrapper.style.backgroundImage = `url(${profile.data.avatar.url})`;

  avatarWrapper.classList.add(
    "avatar-wrapper",
    "col-12",
    "col-md-6",
    "col-lg-3",
  );

  // Append the created avatar wrapper to the parent element
  parentElement.appendChild(avatarWrapper);
}

async function createSellerInfo(profile, parentElement) {
  const sellerInfoDiv = document.createElement("div");
  sellerInfoDiv.classList.add(
    "col-12",
    "col-md-3",
    "d-flex",
    "flex-column",
    "align-items-center",
  );

  const sellerName = document.createElement("h1");
  sellerName.textContent = profile.data.name;

  const listingsAndBidsDiv = document.createElement("div");
  listingsAndBidsDiv.classList.add("listings-bids", "d-flex", "flex-row");

  const quantityOfListings = document.createElement("p");
  quantityOfListings.classList.add("p-1", "border", "me-1", "border-1");
  quantityOfListings.textContent = `Listings: ${profile.data._count.listings}`;
  listingsAndBidsDiv.appendChild(quantityOfListings);

  const quantityOfWinnings = document.createElement("p");
  quantityOfWinnings.classList.add("p-1", "border", "me-1", "border-1");
  quantityOfWinnings.textContent = `Wins: ${profile.data._count.wins}`;
  listingsAndBidsDiv.appendChild(quantityOfWinnings);

  sellerInfoDiv.appendChild(sellerName);
  sellerInfoDiv.appendChild(listingsAndBidsDiv);
  renderBioUser(profile, sellerInfoDiv);
  parentElement.appendChild(sellerInfoDiv);
}

async function renderBioUser(profile, parentElement) {
  if (profile.data.bio === null) {
    const emptyBio = document.createElement("p");
    emptyBio.classList.add("card-text", "p-1", "mb-4", "bio-text");
    emptyBio.innerText = `User has not updated their Bio yet...`;
    parentElement.appendChild(emptyBio);
  } else {
    const bioParagraph = document.createElement("p");
    bioParagraph.classList.add("card-text", "p-1", "mb-4", "bio-text");
    bioParagraph.innerText = profile.data.bio;

    // Ensure bioHeaderParentElement is defined and refers to the correct element.
    parentElement.appendChild(bioParagraph);
  }
}

async function displayWinnings(profile) {
  const winningsParent = document.querySelector(".profile-winnings-container");
  const profileWins = profile.data.wins;
  const header = document.createElement("h2");
  header.textContent = `Winnings`;

  winningsParent.appendChild(header);
  if (profileWins.length === 0) {
    const p = document.createElement("p");
    p.textContent = `This user has no winnings yet.`;
    winningsParent.appendChild(p);
  }

  displayProducts(profileWins, winningsParent);
}

async function displayListings(profile) {
  const listingParent = document.querySelector(".profile-listing-container");
  const profileListing = profile.data.listings;

  const header = document.createElement("h2");
  header.textContent = `Listings`;
  listingParent.appendChild(header);

  if (profileListing.length === 0) {
    const paragraph = document.createElement("p");
    paragraph.textContent = `This user does not have any listings yet`;
    listingParent.appendChild(paragraph);
  }

  displayProducts(profileListing, listingParent);
}
