import { createProfileCards } from "../render/profiles.js";
import { getProfiles } from "../auth/profileData/index.js";
import { h1Header } from "../render/headers.js";

let currentPage = 1; // Global variable to keep track of the current page
const limit = 100; // Number of items to load per request

// Function to handle fetching and displaying profiles for a specific page
export async function handleProfiles(parentElement) {
  try {
    const getAllProfiles = await getProfiles(currentPage, limit);
    const profiles = getAllProfiles.data;

    if (profiles.length > 0) {
      createProfileCards(profiles, parentElement);
      currentPage++;
    } else {
      // Hide the "Load More" button if no more items are available
      const loadMoreBtn = document.querySelector(".load-more-profiles button");
      if (loadMoreBtn) {
        loadMoreBtn.style.display = "block";
      }
    }
  } catch (error) {
    console.error("Error loading more profiles:", error);
  }
}

// Function to render the "Load More" button
export function renderLoadMoreBtnProfiles(container) {
  const parentElement = document.querySelector(".load-more-profiles-btn");
  const existingBtn = parentElement.querySelector("button");
  if (existingBtn) return;

  const btn = document.createElement("button");
  btn.textContent = "Load more";
  btn.classList.add("fw-bold", "btn", "btn-primary", "text-white");
  parentElement.appendChild(btn);

  // Make sure to pass the correct parentElement to handleProfiles when the button is clicked
  btn.addEventListener("click", async () => {
    await handleProfiles(container); // Pass the profiles container here
  });
}

export async function renderProfilesPage() {
  const profilesContainer = document.querySelector(".profiles-page-container");
  profilesContainer.innerHTML = "";

  h1Header("Profiles", profilesContainer);
  await handleProfiles(profilesContainer);
  renderLoadMoreBtnProfiles(profilesContainer);
}
