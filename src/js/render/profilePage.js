import { getProfile } from "../auth/profileData/index.js";
import { load } from "../storage/load.js";
import { displayProducts } from "./productCards.js";
import { calculateHoursLeft } from "./productCards.js";

export async function renderProfile(parentElement) {
  // Get the post ID from the query string
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const name = params.get("name");

  const listingContainer = document.querySelector(".profile-listing-container");
  try {
    // Fetch the post data based on the ID
    const profile = await getProfile(name);

    const profileListing = profile.data.listings;

    // this renders the user data.
    renderProfilePage(profile, parentElement);

    // displays listings of the USER
    displayProducts(profileListing, listingContainer);
  } catch (error) {
    console.error("Error fetching or rendering post:", error);
  }
}

export async function renderProfilePage(profile, parentElement) {
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

// async function createProfileName(profile, parentElement) {
//   const profileName = document.createElement("h1");
//   profileName.innerText = profile.data.name;
//   parentElement.appendChild(profileName);
// }

// async function createProfileBio(profile, parentElement) {
//   const profileBio = document.createElement("p");
//   profileBio.innerText = profile.data.bio;
//   parentElement.appendChild(profileBio);

// }

// async function createAvailableCredits(profile, parentElement) {
//   const credits = document.createElement("p");
//   credits.innerText = `Credits ${profile.data.credits}`;
//   parentElement.appendChild(credits);
// }

// async function createProfileAvatar(profile, parentElement) {
//   const avatarWrapper = document.createElement("div")
//   avatarWrapper.classList.add("avatar-wrapper", "m-1");
//   parentElement.appendChild(avatarWrapper);

//   const profileAvatar = document.createElement("img");
//   profileAvatar.src = profile.data.avatar.url;
//   profileAvatar.alt = profile.data.avatar.alt;
//   profileAvatar.classList.add(
//     "rounded-circle",
//     "border-white",
//     "profile-avatar",
//   );
//   avatarWrapper.appendChild(profileAvatar);
// }

// async function createProfileBanner(profile) {
//   const profileBanner = document.querySelector(".profile-banner");
//  profileBanner.style.backgroundImage = `url(${profile.data.banner.url})`;
// }

// async function createAvatar(profile) {
//   const profileAvatar = document.querySelector(".profile-avatar");
//   profileAvatar.src = `${profile.data.avatar.url}`
//   profileAvatar.alt = `${profile.data.avatar.alt}`
// }

// async function createProfileName(profile) {
//   const profileName = document.querySelector(".profile-name");
//   profileName.innerText = `${profile.data.name}`
// }

// async function createBioText(profile) {
//   const bioText = document.querySelector(".bio-text");
//   bioText.innerText = `${profile.data.bio}`
// }

async function profileBannerDiv(profile, parentElement) {
  const profileBannerDiv = document.createElement("div");
  profileBannerDiv.classList.add("profile-banner");
  profileBannerDiv.style.backgroundImage = `url(${profile.data.banner.url})`;

  const editProfileDiv = document.createElement("div");
  editProfileDiv.classList.add("edit-profile", "col-12", "col-md-1");
  profileBannerDiv.appendChild(editProfileDiv);

  const editProfileText = document.createElement("p");
  editProfileText.classList.add("p-1");
  editProfileText.innerText = "Edit profile";
  editProfileDiv.appendChild(editProfileText);

  parentElement.appendChild(profileBannerDiv);
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
  avatarWrapper.classList.add(
    "avatar-wrapper",
    "col-12",
    "col-md-6",
    "col-lg-3",
  );

  const profileAvatar = document.createElement("img");
  profileAvatar.classList.add("profile-avatar", "rounded-circle");
  profileAvatar.src = profile.data.avatar.url;
  profileAvatar.alt = profile.data.avatar.alt;

  avatarWrapper.appendChild(profileAvatar);
  parentElement.appendChild(avatarWrapper);
}

async function createSellerInfo(profile, parentElement) {
  const sellerInfoDiv = document.createElement("div");
  sellerInfoDiv.classList.add("col-12", "col-md-6");

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
