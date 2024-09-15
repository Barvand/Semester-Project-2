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

    console.log(listing);
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
  textElementDiv.classList.add("col-12", "col-md-4", "p-2", "text-center");
  parentElement.appendChild(textElementDiv);

  const bidsProfileSection = document.querySelector(".bids");

  const hoursLeft = calculateHoursLeft(listing.data.endsAt);

  // createProductImage(listing, imageElementDiv);
  productImageCarousel(listing, imageElementDiv);
  createProductSeller(listing, textElementDiv);
  createProductTitle(listing, textElementDiv);
  createProductDescription(listing, textElementDiv);
  createDisplayBids(listing, textElementDiv, hoursLeft);
  timerAndButton(listing, textElementDiv, hoursLeft);
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

// async function createProductImage(listing, parentElement) {
//   if (listing.data.media && listing.data.media.length > 0) {
//     const productImage = document.createElement("img");
//     productImage.src = listing.data.media[0].url;
//     productImage.alt = listing.data.media[0].alt;
//     productImage.classList.add("img-fluid");
//     parentElement.appendChild(productImage);
//   } else {
//     // If no media is available, display a placeholder image
//     const placeholderImg = document.createElement("img");
//     placeholderImg.src = "/images/No-image-available.jpg";
//     placeholderImg.alt = "No image available";
//     parentElement.appendChild(placeholderImg);
//   }
// }

async function createProductTitle(listing, parentElement) {
  const productTitle = document.createElement("h1");
  productTitle.classList.add("card-text", "border-bottom", "border-secondary");
  productTitle.innerText = listing.data.title;
  parentElement.appendChild(productTitle);
}

async function createProductDescription(listing, parentElement) {
  if (listing.data.description === null) {
    const productDescription = document.createElement("p");
    productDescription.innerText = `No description has been added`;
    parentElement.appendChild(productDescription);
  } else {
    const productDescription = document.createElement("p");
    productDescription.innerText = listing.data.description;
    parentElement.appendChild(productDescription);
  }
}

async function createDisplayBids(listing, parentElement, hoursLeft) {
  const productBids = document.createElement("p");

  if (listing.data.bids.length > 0) {
    const latestBid = listing.data.bids[listing.data.bids.length - 1]; // Get the last bid
    const bidderName = latestBid.bidder.name; // Access the bidder's name from the latest bid

    if (hoursLeft > 0) {
      productBids.textContent = `${bidderName} bid $${latestBid.amount}`;
      productBids.classList.add("fw-bold");
    } else if (hoursLeft <= 0) {
      productBids.textContent = `${bidderName} paid $${latestBid.amount}`;
      productBids.classList.add("fw-bold");
    }
  }

  parentElement.appendChild(productBids);
}

console.log(getListing("7d88bea9-5482-4556-87c0-ee4e4f9d1baa"));

async function timerAndButton(listing, parentElement, hoursLeft) {
  const productEnds = document.createElement("p");
  productEnds.classList.add("p-1", "rounded");
  productEnds.textContent = `Offer expires in: ${hoursLeft} hours`;
  parentElement.appendChild(productEnds);

  const bidBtn = document.createElement("button");
  bidBtn.classList.add(
    "btn",
    "btn-primary",
    "text-white",
    "btn-custom",
    "fw-bold",
    "w-100",
  );
  bidBtn.textContent = `Place a bid`;
  parentElement.appendChild(bidBtn);

  const sectionBids = document.querySelector(".bids");
  sectionBids.scrollIntoView({ behavior: "smooth" });

  if (hoursLeft < 0 && listing.data._count && listing.data._count.bids > 1) {
    productEnds.classList.add("bg-success", "text-white", "fw-bold");
    productEnds.textContent = `Item has been sold`;
    bidBtn.style.display = "none";
  } else if (
    hoursLeft > 0 &&
    listing.data._count &&
    listing.data._count.bids < 1
  ) {
    productEnds.classList.add("bg-warning");
    productEnds.textContent = `Be the first to bid!`;
  } else if (hoursLeft > 0) {
    productEnds.classList.add("bg-black", "text-white", "text-center");
    productEnds.textContent = `Ends in ${hoursLeft} hours`;
  } else {
    productEnds.classList.add("bg-danger", "text-white", "text-center");
    productEnds.textContent = `Offer is expired`;
    bidBtn.style.display = "none";
  }
}

export async function createProductSeller(listing, parentElement) {
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
    "text-white",
  );
  deletePost.innerText = `Delete post`;
  parentElement.appendChild(deletePost);

  // Add event listener for the delete button
  deletePost.addEventListener("click", (event) => {
    deleteListingFormListener();
  });
}

export async function productImageCarousel(listing, parentElement) {
  const carousel = document.createElement("div");
  carousel.id = "carouselProduct";
  carousel.classList.add("carousel", "slide");
  parentElement.appendChild(carousel);

  const carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");
  carousel.appendChild(carouselInner);

  // Loop through the media array and create a carousel item for each image
  listing.data.media.forEach((mediaItem, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item", "listing-image-wrapper");

    // Add 'active' class only to the first item
    if (index === 0) {
      carouselItem.classList.add("active");
    }

    const productImage = document.createElement("img");
    productImage.src = mediaItem.url;
    productImage.alt = mediaItem.alt || "Product image";
    productImage.classList.add("img-fluid", "w-100", "listing-image"); // Add margin or any other styling if needed

    carouselItem.appendChild(productImage);
    carouselInner.appendChild(carouselItem);
  });

  // Create the previous button
  const prevButton = document.createElement("button");
  prevButton.classList.add("carousel-control-prev");
  prevButton.type = "button";
  prevButton.setAttribute("data-bs-target", "#carouselProduct");
  prevButton.setAttribute("data-bs-slide", "prev");

  const prevIcon = document.createElement("span");
  prevIcon.classList.add("carousel-control-prev-icon");
  prevIcon.setAttribute("aria-hidden", "true");

  const prevText = document.createElement("span");
  prevText.classList.add("visually-hidden");
  prevText.textContent = "Previous";

  prevButton.appendChild(prevIcon);
  prevButton.appendChild(prevText);
  carousel.appendChild(prevButton);

  // Create the next button
  const nextButton = document.createElement("button");
  nextButton.classList.add("carousel-control-next");
  nextButton.type = "button";
  nextButton.setAttribute("data-bs-target", "#carouselProduct");
  nextButton.setAttribute("data-bs-slide", "next");

  const nextIcon = document.createElement("span");
  nextIcon.classList.add("carousel-control-next-icon");
  nextIcon.setAttribute("aria-hidden", "true");

  const nextText = document.createElement("span");
  nextText.classList.add("visually-hidden");
  nextText.textContent = "Next";

  nextButton.appendChild(nextIcon);
  nextButton.appendChild(nextText);
  carousel.appendChild(nextButton);
}
