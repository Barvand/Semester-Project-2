import { getListings } from "../auth/postData/read.js";
import { displayProducts } from "../render/productCards.js";
import { API_BASE_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

export async function searchBar() {
  const searchInput = document.querySelector("#searchBar");

  document
    .getElementById("SearchForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission

      const query = searchInput.value.trim(); // Get search term from the input field

      if (!query) {
        alert("Please enter a search term");
        return;
      }

      try {
        // Build the API URL with the search query and optional parameters
        const apiUrl = `${API_BASE_URL}/auction/profiles/search?q=${query}&sort=name&sortOrder=asc&limit=10&page=1&_listings=true&_wins=true`;

        const response = await fetchToken(apiUrl);

        const results = await response.json();

        console.log(results);

        const resultData = results.data;

        displaySearchResults(resultData); // Function to display the search results
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    });
}

function displaySearchResults(results) {
  const searchResultsContainer = document.querySelector(".searchbar-item");
  searchResultsContainer.innerHTML = ""; // Clear previous results

  // Handle if no results are returned
  if (results.length === 0) {
    searchResultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  // Loop through each profile in the results
  results.forEach((profile) => {
    const resultElement = document.createElement("div");
    resultElement.className = "search-result mb-3 p-2 border rounded"; // Styling for results

    // Handle cases where listings or wins might be missing
    const listings = profile._listings ? profile._listings.length : 0; // Assuming _listings is an array
    const wins = profile._wins ? profile._wins.length : 0; // Assuming _wins is an array

    resultElement.innerHTML = `
      <h3>${profile.name || "Unknown Name"}</h3>
      <p>Listings: ${listings}</p>
      <p>Wins: ${wins}</p>
      <a href="/profiles/${profile.id}" class="btn btn-primary">View Profile</a>
    `;

    // Append the result element to the container
    searchResultsContainer.appendChild(resultElement);
  });
}
