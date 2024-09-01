// Function to dynamically create and display product cards
export async function displayProducts(products, parentElement) {
  products.forEach((product) => {
    // Create the main col div
    const colDiv = document.createElement("div");
    colDiv.className = "col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 mb-4";
    parentElement.appendChild(colDiv);

    createCardDiv(product, colDiv);
  });
}

// Create the card div
async function createCardDiv(product, parentElement) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card border-0";
  parentElement.appendChild(cardDiv);

  const hoursLeft = calculateHoursLeft(product.endsAt);

  createImageAndOverlay(cardDiv, product, hoursLeft);
  cardBody(cardDiv, product);
}

// Create the image container with the overlay
async function createImageAndOverlay(parentElement, product, time) {
  const imageContainer = document.createElement("a");
  imageContainer.className = "bg-black position-relative";
  imageContainer.href = `/listings/listing/?id=${product.id}`;
  parentElement.appendChild(imageContainer);

  const overlayText = document.createElement("p");
  overlayText.className =
    "text-white p-2 position-absolute top-0 end-0 third-bg-color rounded";
  overlayText.textContent = `Ends in ${time} hours`;

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
}

// Create the card body
async function cardBody(parentElement, product) {
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Create the card title
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title text-secondary";
  cardTitle.textContent = product.title;
  cardBody.appendChild(cardTitle);

  createBidsCount(product, cardBody);

  parentElement.appendChild(cardBody);
}

async function createBidsCount(product, parentElement) {
  const cardBids = document.createElement("p");
  cardBids.className = "card-text";

  if (product._count && typeof product._count.bids !== "undefined") {
    cardBids.textContent = `${product._count.bids} Bids`;
  } else {
    cardBids.textContent = "No bid data available"; // Or you can leave it empty
  }

  parentElement.appendChild(cardBids);
}

function calculateHoursLeft(endsAt) {
  const endsAtDate = new Date(endsAt);
  const currentDate = new Date();
  const diffInMs = endsAtDate - currentDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)); // Convert milliseconds to hours
  return diffInHours;
}
