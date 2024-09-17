export async function renderMoreImageFields() {
  document
    .getElementById("add-media-btn")
    .addEventListener("click", function () {
      // Get the media container where the inputs will be added
      const mediaContainer = document.querySelector("#media-container");

      // Create a new div to hold the new media inputs
      const newMediaItem = document.createElement("div");
      newMediaItem.classList.add("media-item");

      // Create the new input fields for media URL and ALT text
      const mediaUrlInput = document.createElement("input");
      mediaUrlInput.setAttribute("type", "url");
      mediaUrlInput.setAttribute("name", "media-url");
      mediaUrlInput.setAttribute("placeholder", "Image URL");

      const mediaAltInput = document.createElement("input");
      mediaAltInput.setAttribute("type", "text");
      mediaAltInput.setAttribute("name", "media-alt");
      mediaAltInput.setAttribute("placeholder", "ALT text");

      // Append the new inputs to the new media item div
      newMediaItem.appendChild(mediaUrlInput);
      newMediaItem.appendChild(mediaAltInput);

      // Append the new media item to the media container
      mediaContainer.appendChild(newMediaItem);
    });
}
