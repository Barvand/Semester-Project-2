import { displayProducts } from "../render/productCards.js";
import { API_BASE_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { renderAllPosts } from "../filters/listingsPagination.js";

export async function searchBar() {
  const searchInput = document.querySelector("#searchBar");
  const searchResultsContainer = document.querySelector(".listings-grid");
  const loadMoreBtn = document.querySelector(".load-more");

  document
    .getElementById("SearchForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission

      const query = searchInput.value.trim(); // Get search term from the input field

      if (!query) {
        // Restore original state if the search term is cleared
        searchResultsContainer.innerHTML = "";
        await renderAllPosts(); // Call renderAllPosts to reload the original listings
        if (loadMoreBtn) {
          loadMoreBtn.style.display = "block"; // Show the "Load More" button
        }
        return; // Exit the function if no query
      }

      if (loadMoreBtn) {
        loadMoreBtn.style.display = "none";
      }

      try {
        const apiUrl = `${API_BASE_URL}/auction/listings/search?q=${query}&_bids=true&_seller=true`;
        const response = await fetchToken(apiUrl);
        const results = await response.json();
        const resultData = results.data;

        searchResultsContainer.innerHTML = "";
        displayProducts(resultData, searchResultsContainer);

        if (resultData.length === 0) {
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
