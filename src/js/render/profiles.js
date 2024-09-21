export async function createProfileCards(profiles, parentElement) {
  if (!Array.isArray(profiles)) {
    console.error("Expected an array of products. Received:", profiles);
    return;
  }

  // Create and append product cards
  profiles.forEach((profile) => {
    // Ensure product has the necessary data
    if (!profile || !profile.name) {
      console.error("Invalid profile:", profile);
      return;
    }

    // Create and append the product card
    profileCards(profile, parentElement);
  });
}

export async function profileCards(profiles, parentElement) {
  // Create the card container
  const cardBody = document.createElement("a");
  cardBody.classList.add(
    "card-hover",
    "col-12",
    "col-md-6",
    "col-lg-4",
    "col-xl-3",
    "mb-4",
    "rounded",
  );
  cardBody.href = `/profiles/profile/?name=${profiles.name}`;

  // Create and configure the card image
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top");
  cardImage.src = profiles.avatar.url;
  cardImage.alt = profiles.name; // Use profile name for better alt text

  // Create and configure the card body
  const cardTitleBody = document.createElement("div");
  cardTitleBody.classList.add("card-body");

  // Create and configure the card title
  const cardTitle = document.createElement("h2");

  // Truncate the name if it's longer than 10 characters
  cardTitle.textContent =
    profiles.name.length > 10
      ? profiles.name.substring(0, 10) + "…"
      : profiles.name;

  // Append elements to form the card
  cardTitleBody.appendChild(cardTitle); // Add cardTitle to cardTitleBody
  cardBody.appendChild(cardImage); // Add cardImage to cardBody
  cardBody.appendChild(cardTitleBody); // Add cardTitleBody to cardBody
  parentElement.appendChild(cardBody); // Add the complete cardBody to parentElement
}
