import { getListing } from "../auth/postData/read.js";
import { load } from "../storage/load.js";
import { deleteListingFormListener } from "../handlers/deleteListing.js";

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
  const divElement = document.createElement("div");
  divElement.classList.add("card");
  parentElement.appendChild(divElement);

  createProductImage(listing, divElement);
  createProductTitle(listing, divElement);
  createProductDescription(listing, divElement);
  createDisplayBids(listing, divElement);
  createProductSeller(listing, divElement);

  // only displays the delete button if currentUser name matches the seller name.
  const currentUser = load("profile");
  if (currentUser.name === listing.data.seller.name) {
    deleteListingBtn(parentElement);
  } else {
    return;
  }
}

async function createProductImage(listing, parentElement) {
  if (listing.data.media && listing.data.media.length > 0) {
    const productImage = document.createElement("img");
    productImage.src = listing.data.media[0].url;
    productImage.alt = listing.data.media[0].alt;
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
    productBids.innerText = listing.data._count.bids;
    parentElement.appendChild(productBids);
  } else {
    const noBids = document.createElement("p");
    noBids.innerText = `No bids yet`;
    parentElement.appendChild(noBids);
  }
}

async function createProductSeller(listing, parentElement) {
  const sellerName = document.createElement("a");
  sellerName.innerText = listing.data.seller.name;
  sellerName.href = `/profiles/profile/?name=${listing.data.seller.name}`;
  parentElement.appendChild(sellerName);

  const sellerImage = document.createElement("img");
  sellerImage.src = listing.data.seller.avatar.url;
  sellerImage.classList.add("rounded-end-circle");
  sellerName.appendChild(sellerImage);
}

function deleteListingBtn(parentElement) {
  const deletePost = document.createElement("p");
  deletePost.classList.add(
    "btn",
    "btn-danger",
    "mt-3",
    "lg-w-25",
    "text-center",
  );
  deletePost.innerText = `Delete post`;
  parentElement.appendChild(deletePost);

  // Add event listener for the delete button
  deletePost.addEventListener("click", (event) => {
    deleteListingFormListener();
  });
}
