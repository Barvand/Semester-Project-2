// Function to dynamically create and display product cards
export function displayProducts(products, parentElement) {
  // Ensure `products` is an array
  if (!Array.isArray(products)) {
    console.error("Expected an array of products. Received:", products);
    return;
  }

  // Create and append product cards
  products.forEach((product) => {
    // Ensure product has the necessary data
    if (!product || !product.title || !product.id) {
      console.error("Invalid product:", product);
      return;
    }

    // Create the main col div
    const colDiv = document.createElement("div");
    colDiv.className =
      "card-hover col-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 mb-4 rounded";
    parentElement.appendChild(colDiv);

    // Create and append the product card
    createCardDiv(product, colDiv);
  });
}

// Create the card div
async function createCardDiv(product, parentElement) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card border-1 rounded";
  parentElement.appendChild(cardDiv);

  const timeLeft = calculateTimeLeft(product.endsAt);

  createImageAndOverlay(cardDiv, product, timeLeft);
  cardBody(cardDiv, product);
}

async function createImageAndOverlay(parentElement, product, timeLeft) {
  const imageContainer = document.createElement("a");
  imageContainer.className = "bg-black position-relative rounded";
  imageContainer.href = `/listings/listing/?id=${product.id}`;
  parentElement.appendChild(imageContainer);

  // Create the overlayText element
  const overlayText = document.createElement("p");
  overlayText.className = "fw-bold p-2 position-absolute top-0 end-0 rounded";
  imageContainer.appendChild(overlayText);

  function updateCountdown() {
    const updatedTimeLeft = calculateTimeLeft(product.endsAt); // Recalculate time left

    // Check if the time has expired
    if (
      updatedTimeLeft.days < 0 ||
      (updatedTimeLeft.days === 0 &&
        updatedTimeLeft.hours === 0 &&
        updatedTimeLeft.minutes === 0 &&
        updatedTimeLeft.seconds === 0)
    ) {
      // Time has expired
      if (product._count && product._count.bids > 0) {
        // Item sold
        overlayText.classList.add("bg-success", "text-white");
        overlayText.textContent = `Item sold`;
      } else {
        // Item expired without bids
        overlayText.classList.add("bg-danger", "text-white");
        overlayText.textContent = `Item expired`;
      }
    } else {
      // Time has not expired
      if (product._count && product._count.bids < 1) {
        overlayText.classList.add("bg-primary", "text-white");
        overlayText.textContent = `No bids yet`;
      } else {
        // Update the countdown text based on remaining time
        overlayText.classList.add("bg-black", "text-white");

        let countdownText = "";

        if (updatedTimeLeft.days > 1) {
          // More than 1 day left
          countdownText = `${updatedTimeLeft.days}d`;
        } else if (updatedTimeLeft.days === 1) {
          // Exactly 1 day left, show hours and minutes
          countdownText = `${updatedTimeLeft.hours}h ${updatedTimeLeft.minutes}m`;
        } else if (updatedTimeLeft.hours > 0) {
          // Less than 24 hours left, show hours and seconds
          countdownText = `${updatedTimeLeft.hours}h ${updatedTimeLeft.minutes}m ${updatedTimeLeft.seconds}s`;
        } else {
          // Less than an hour left, show minutes and seconds
          countdownText = `${updatedTimeLeft.minutes}m ${updatedTimeLeft.seconds}s`;
        }

        overlayText.textContent = `Ends in ${countdownText}`;
      }
    }
  }

  // Call updateCountdown immediately to show the initial time
  updateCountdown();

  // Update the countdown every second
  const interval = setInterval(updateCountdown, 1000);

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
  const cardTitle = document.createElement("h2");
  cardTitle.className = "card-title h4 text-capitalize";
  cardTitle.textContent = product.title;
  cardBody.appendChild(cardTitle);

  createBidsCount(product, cardBody);

  parentElement.appendChild(cardBody);
}

async function createBidsCount(product, parentElement) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("d-flex", "justify-content-between");
  parentElement.appendChild(cardDiv);

  const cardBids = document.createElement("p");
  cardBids.className = "card-text";

  // Check if _count exists
  if (product._count) {
    if (product._count.bids === 0) {
      return;
    }
    if (product._count.bids === undefined) {
      return;
    }

    // If there are bids, add the latest bid
    if (product.bids && product.bids.length > 0) {
      const latestBid = product.bids[product.bids.length - 1];
      const cardBids = document.createElement("p");
      cardBids.textContent = `$${latestBid.amount}`;
      cardBids.classList.add("fw-bold");
      cardDiv.appendChild(cardBids);
    }
    // Display total number of bids
    const allBids = document.createElement("p");
    allBids.textContent = `Bids: ${product._count.bids}`;
    allBids.classList.add("text-black");
    cardDiv.appendChild(allBids);
  }
}

export function calculateTimeLeft(endsAt) {
  const endsAtDate = new Date(endsAt);
  const currentDate = new Date();
  const diffInMs = endsAtDate - currentDate;

  if (diffInMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const diffInSeconds = Math.floor(diffInMs / 1000); // Convert milliseconds to seconds
  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(diffInSeconds % 60);

  return { days, hours, minutes, seconds };
}
