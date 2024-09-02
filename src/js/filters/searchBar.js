import { getListings } from "../auth/postData/read.js";
import { displayProducts } from "../render/productCards.js";

export async function searchBar() {
  const searchInput = document.getElementById("searchBar");
  const searchResultsContainer = document.querySelector(".listings-grid");

  let allListings = [];

  try {
    const response = await getListings();
    allListings = response.data; // Ensure `response.data` is an array
    if (!Array.isArray(allListings)) {
      throw new Error("Expected an array of listings.");
    }
  } catch (error) {
    console.error("Failed to fetch or process listings:", error);
    searchResultsContainer.innerHTML = "Failed to load listings.";
    return;
  }

  function performSearch(query) {
    searchResultsContainer.innerHTML = "";

    // If query is an empty string, display all listings
    if (query === "") {
      displayProducts(allListings, searchResultsContainer);
      return;
    }

    // Filter listings based on the query
    const filteredListings = allListings.filter((listing) => {
      return (
        listing.title.toLowerCase().includes(query.toLowerCase()) ||
        listing.id.toString().toLowerCase().includes(query.toLowerCase())
      );
    });

    // Render search results
    displayProducts(filteredListings, searchResultsContainer);
  }

  // Initial call to performSearch to display all listings
  performSearch("");

  // Event listener for input field value changes
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim();
    performSearch(query);
  });
}
