// import * as listeners from "../js/handlers/index.js";
// import { getListings } from "./auth/postData/read.js";

// listeners.setRegisterFormListener();
// listeners.setLoginFormListener();

// // const body = document.querySelector("body");

// function renderListing(listing, parentElement) {
//   const cardDivElement = cardDiv(parentElement);
//   cardImage(listing, cardDivElement);
//   productTitle(listing, cardDivElement);
//   productDescription(listing, parentElement);
// }

// function cardDiv(parentElement) {
//   const cardDiv = document.createElement("div");
//   cardDiv.className = "card"; // Assigning Bootstrap 'card' class
//   parentElement.appendChild(cardDiv);
//   return cardDiv;
// }

// function cardImage(listing, parentElement) {
//   const cardImage = document.createElement("img");
//   cardImage.className = "card-img-top"; // Assigning Bootstrap 'card-img-top' class
//   cardImage.src = listing.media[0].url; // Assuming 'listing.image' is the image URL
//   cardImage.alt = listing.alt || "Listing image"; // Fallback alt text if not provided
//   parentElement.appendChild(cardImage);
// }

// function productTitle(listing, parentElement) {
//   const productTitle = document.createElement("h3");
//   productTitle.className = "card-text"; // Assigning Bootstrap 'card-img-top' class
//   productTitle.innerText = listing.title; // Assuming 'listing.image' is the image URL
//   parentElement.appendChild(productTitle);
// }

// function productDescription(listing, parentElement) {
//   const productDescription = document.createElement("h3");
//   productDescription.className = "card-text"; // Assigning Bootstrap 'card-img-top' class
//   productDescription.innerText = listing.description; // Assuming 'listing.image' is the image URL
//   parentElement.appendChild(productDescription);
// }

// async function renderAllPosts(parentElement) {
//   try {
//     const response = await getListings();
//     const listings = response.data;

//     console.log(listings)

//     if (Array.isArray(listings)) {
//       // Check if listings is indeed an array
//       listings.forEach((listing) => {
//         renderListing(listing, parentElement);
//       });
//     } else {
//       console.error("Listings data is not an array:", listings);
//     }
//   } catch (error) {
//     console.error("Error rendering posts:", error);
//   }
// }

// // // Initialize rendering of all posts
// // renderAllPosts(body);
