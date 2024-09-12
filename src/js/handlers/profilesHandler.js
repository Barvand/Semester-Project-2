import { getProfiles } from "../auth/profileData/index.js";
import { createProfilesInfo } from "../render/profiles.js";
import { displayProducts } from "../render/productCards.js";
import { API_BASE_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

let currentPage = 1;
const limit = 25; // Number of profiles per page
let totalPages = 1; // Initialize totalPages

// Function to handle fetching and displaying profiles for a specific page
export async function handleProfiles(page = 1) {
  const parentElement = document.querySelector(".profiles-page-container");

  try {
    const getAllProfiles = await getProfilesPage(page, limit);
    const profiles = getAllProfiles.data;
    const totalProfiles = getAllProfiles.total; // Assuming API provides total profiles
    totalPages = Math.ceil(totalProfiles / limit); // Update totalPages

    parentElement.innerHTML = ""; // Clear previous profiles and pagination controls

    profiles.forEach((profile) => {
      if (!profile || !profile.name) {
        console.error("Invalid profile:", profile);
        return;
      }

      // Pass each individual profile to displayProfiles
      createProfilesInfo(profile, parentElement);
    });

    updatePaginationControls(page, totalPages, parentElement); // Update pagination controls
  } catch (error) {
    console.error("Error fetching profiles:", error);
  }
}

// Function to update pagination controls
function updatePaginationControls(page, totalPages, parentElement) {
  // Create the div container
  const paginationControls = document.createElement("div");
  paginationControls.classList.add("pagination-controls");

  // Create the "Previous" button
  const prevPageButton = document.createElement("button");
  prevPageButton.id = "prev-page";
  prevPageButton.disabled = page === 1;
  prevPageButton.textContent = "Previous";

  // Create the span for page number
  const pageNumberSpan = document.createElement("span");
  pageNumberSpan.id = "page-number";
  pageNumberSpan.textContent = page;

  // Create the "Next" button
  const nextPageButton = document.createElement("button");
  nextPageButton.id = "next-page";
  nextPageButton.textContent = "Next";
  nextPageButton.disabled = page === totalPages;

  // Append the buttons and span to the div
  paginationControls.appendChild(prevPageButton);
  paginationControls.appendChild(pageNumberSpan);
  paginationControls.appendChild(nextPageButton);

  // Append pagination controls to the parent element
  parentElement.appendChild(paginationControls);

  // Set up event listeners after adding controls
  setUpPaginationEventListeners();
}

// Function to set up event listeners for pagination buttons
function setUpPaginationEventListeners() {
  const prevPageButton = document.getElementById("prev-page");
  const nextPageButton = document.getElementById("next-page");

  // Ensure the buttons exist before adding event listeners
  if (prevPageButton && nextPageButton) {
    prevPageButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        handleProfiles(currentPage);
      }
    });

    nextPageButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        handleProfiles(currentPage);
      }
    });
  }
}

// Initial load
handleProfiles(currentPage);

async function getProfilesPage(page, limit) {
  const response = await fetchToken(
    `${API_BASE_URL}/auction/profiles?page=${page}&limit=${limit}&sortOrder=asc`,
  );
  return response.json(); // Assuming the API returns JSON
}
