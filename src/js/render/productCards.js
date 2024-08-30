// Function to dynamically create and display product cards
export async function displayProducts(products) {
  const gridContainer = document.querySelector(".listings-grid");

  products.forEach((product) => {
    // Calculate hours left
    const hoursLeft = calculateHoursLeft(product.endsAt);

    // Create the main col div
    const colDiv = document.createElement("div");
    colDiv.className = "col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 mb-4";

    // Create the card div
    const cardDiv = document.createElement("a");
    cardDiv.className = "card border-0";
    cardDiv.href = `/listings/listing/?id=${product.id}`;

    // Create the image container with the overlay
    const imageContainer = document.createElement("div");
    imageContainer.className = "bg-black position-relative";

    const overlayText = document.createElement("p");
    overlayText.className =
      "text-white p-2 position-absolute top-0 end-0 third-bg-color rounded";
    overlayText.textContent = `Ends in ${hoursLeft} hours`;

    // Append the overlay text to the image container
    imageContainer.appendChild(overlayText);

    // Check if media exists and has at least one item
    if (product.media && product.media.length > 0) {
      // Create the image element
      const img = document.createElement("img");
      img.src = product.media[0].url;
      img.alt = product.media[0].alt || "Product image";
      img.className = "card-img-top";

      // Append the image to the image container
      imageContainer.appendChild(img);
    } else {
      // If no media is available, display a placeholder image
      const placeholderImg = document.createElement("img");
      placeholderImg.src = "/images/No-image-available.jpg";
      placeholderImg.alt = "No image available";
      placeholderImg.className = "card-img-top";

      // Append the placeholder image to the image container
      imageContainer.appendChild(placeholderImg);
    }

    // Create the card body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Create the card title
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title text-secondary";
    cardTitle.textContent = product.title;

    // Create the card text (bids count)
    const cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = `${product._count.bids} Bids`;

    // Append title and text to card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    // Append image container and card body to card div
    cardDiv.appendChild(imageContainer);
    cardDiv.appendChild(cardBody);

    // Append card div to col div
    colDiv.appendChild(cardDiv);

    // Append col div to the grid container
    gridContainer.appendChild(colDiv);
  });
}

function calculateHoursLeft(endsAt) {
  const endsAtDate = new Date(endsAt);
  const currentDate = new Date();
  const diffInMs = endsAtDate - currentDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)); // Convert milliseconds to hours
  return diffInHours;
}
