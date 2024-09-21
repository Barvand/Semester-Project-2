import { createProfileCards } from "../render/profiles.js";
import { API_BASE_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { renderProfilesPage } from "../handlers/profilesHandler.js";
import { h1Header } from "../render/headers.js";

export async function searchBarProfiles() {
  const searchInput = document.querySelector("#searchBar-profiles");
  const searchResultsContainer = document.querySelector(
    ".profiles-page-container",
  );
  const loadMoreBtn = document.querySelector(".load-more-profiles-btn");

  document
    .getElementById("SearchFormProfiles")
    .addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission

      const query = searchInput.value.trim(); // Get search term from the input field

      if (!query) {
        // Restore original state if the search term is cleared
        searchResultsContainer.innerHTML = "";
        await renderProfilesPage(); // Call renderAllPosts to reload the original listings
        if (loadMoreBtn) {
          loadMoreBtn.style.display = "block"; // Show the "Load More" button
        }
        return; // Exit the function if no query
      }

      if (loadMoreBtn) {
        loadMoreBtn.style.display = "none";
      }

      try {
        const apiUrl = `${API_BASE_URL}/auction/profiles/search?q=${query}&_listings=true&_wins=true`;
        const response = await fetchToken(apiUrl);
        const profile = await response.json();
        const profileData = profile.data;

        searchResultsContainer.innerHTML = "";
        h1Header("Profiles", searchResultsContainer);
        createProfileCards(profileData, searchResultsContainer);

        if (profileData.length === 0) {
          const errorMessage = document.createElement("div");
          errorMessage.textContent = "No search result found, try again";
          errorMessage.classList.add("alert", "alert-danger", "text-center");
          searchResultsContainer.appendChild(errorMessage);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    });
}
