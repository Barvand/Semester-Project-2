import { getListing } from "../auth/postData/read.js";
import { load } from "../storage/load.js";
import { deleteListingFormListener } from "../handlers/deleteListing.js";
import { calculateHoursLeft } from "./productCards.js";
import { createBiddingTable } from "./bidForm.js";
import { createBidButton } from "./bidForm.js";

export async function renderSingleListing(parentElement) {
  // Get the post ID from the query string
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id"); // Extract the ID from the query string
  try {
    // Fetch the post data based on the ID
    const listing = await getListing(id);

    // Render the post with the fetched data
    createProductPage(listing, parentElement);
  } catch (error) {
    console.error("Error fetching or rendering post:", error);
  }
}

export async function createProductPage(listing, parentElement) {
  const imageElementDiv = document.createElement("div");
  imageElementDiv.classList.add(
    "listing-image-wrapper",
    "col-12",
    "col-md-8",
    "rounded",
  );
  parentElement.appendChild(imageElementDiv);

  const textElementDiv = document.createElement("div");
  textElementDiv.classList.add("col-12", "col-md-4", "p-2");
  parentElement.appendChild(textElementDiv);

  const bidsProfileSection = document.querySelector(".bids");

  const hoursLeft = calculateHoursLeft(listing.data.endsAt);

  createProductImage(listing, imageElementDiv);
  createProductSeller(listing, textElementDiv);
  createProductTitle(listing, textElementDiv);
  createProductDescription(listing, textElementDiv);
  createDisplayBids(listing, textElementDiv);
  createPlaceABidBtn(textElementDiv);
  createTimer(listing, textElementDiv, hoursLeft);
  createBiddingTable(listing, bidsProfileSection);
  createBidButton(bidsProfileSection);

  // only displays the delete button if currentUser name matches the seller name.
  const currentUser = load("profile");
  if (currentUser.name === listing.data.seller.name) {
    deleteListingBtn(textElementDiv);
  } else {
    return;
  }
}

async function createProductImage(listing, parentElement) {
  if (listing.data.media && listing.data.media.length > 0) {
    const productImage = document.createElement("img");
    productImage.src = listing.data.media[0].url;
    productImage.alt = listing.data.media[0].alt;
    productImage.classList.add("img-fluid");
    parentElement.appendChild(productImage);
  } else {
    // If no media is available, display a placeholder image
    const placeholderImg = document.createElement("img");
    placeholderImg.src = "/images/No-image-available.jpg";
    placeholderImg.alt = "No image available";
    parentElement.appendChild(placeholderImg);
  }
}
async function createProductTitle(listing, parentElement) {
  const productTitle = document.createElement("h1");
  productTitle.classList.add("card-text", "border-bottom", "border-secondary");
  productTitle.innerText = listing.data.title;
  parentElement.appendChild(productTitle);
}

async function createProductDescription(listing, parentElement) {
  const productDescription = document.createElement("p");
  productDescription.innerText = listing.data.description;
  parentElement.appendChild(productDescription);
}

async function createDisplayBids(listing, parentElement) {
  if (listing.data._count.bids > 0) {
    const productBids = document.createElement("p");
    productBids.innerText = `Bids: ${listing.data._count.bids}`;
    parentElement.appendChild(productBids);
  } else {
    const noBids = document.createElement("p");
    noBids.innerText = `No bids yet`;
    parentElement.appendChild(noBids);
  }
}

async function createPlaceABidBtn(parentElement) {
  const bidBtn = document.createElement("btn");
  bidBtn.classList.add(
    "btn",
    "btn-primary",
    "text-white",
    "btn-custom",
    "fw-bold",
  );
  bidBtn.textContent = `Place a bid`;
  parentElement.appendChild(bidBtn);
}

async function createTimer(listing, parentElement, hoursLeft) {
  const productEnds = document.createElement("p");
  productEnds.classList.add("p-1", "text-muted");
  productEnds.textContent = `Offer expires in: ${hoursLeft} hours`;
  parentElement.appendChild(productEnds);
}

async function createProductSeller(listing, parentElement) {
  const sellerInfoDiv = document.createElement("a");
  sellerInfoDiv.classList.add("d-flex", "bg-secondary", "rounded");
  sellerInfoDiv.href = `/profiles/profile/?name=${listing.data.seller.name}`;
  parentElement.appendChild(sellerInfoDiv);

  const sellerName = document.createElement("p");
  sellerName.innerText = listing.data.seller.name;
  sellerName.classList.add(
    "p-1",
    "text-bg-secondary",
    "text-wrap",
    "align-self-center",
    "lead",
    "fw-bold",
    "profile-name-listing",
  );

  const sellerImage = document.createElement("img");
  sellerImage.src = listing.data.seller.avatar.url;
  sellerImage.classList.add("avatar-profile-img", "rounded-circle");

  sellerInfoDiv.appendChild(sellerImage);
  sellerInfoDiv.appendChild(sellerName);
}

function deleteListingBtn(parentElement) {
  const deletePost = document.createElement("p");
  deletePost.classList.add(
    "btn",
    "btn-danger",
    "mt-3",
    "lg-w-25",
    "text-center",
    "mt-auto",
  );
  deletePost.innerText = `Delete post`;
  parentElement.appendChild(deletePost);

  // Add event listener for the delete button
  deletePost.addEventListener("click", (event) => {
    deleteListingFormListener();
  });
}
