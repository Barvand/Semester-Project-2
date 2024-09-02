export async function renderBidsHeader(parentElement) {
  const header = document.createElement("h2"); // Creating a new header element
  header.textContent = "Bids"; // Setting the text content of the header
  header.classList.add(
    "border",
    "border-3",
    "rounded-1",
    "col-12",
    "col-md-2",
    "col-lg-2",
    "text-center",
    "mt-2",
  );
  parentElement.appendChild(header); // Appending the header to the parent element
}

export async function renderBidsProductsPage(listing, parentElement) {
  renderBidsHeader(parentElement);
  renderBidsWrapper(listing, parentElement);
}

async function renderBidsWrapper(listing, parentElement) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("d-flex", "justify-content-between", "text-center");

  renderBids(listing, wrapperDiv);
  renderUsers(listing, wrapperDiv);

  parentElement.appendChild(wrapperDiv);
}

async function renderBids(listing, parentElement) {
  const renderBidsContainer = document.createElement("div");
  renderBidsContainer.classList.add("p-1");
  parentElement.appendChild(renderBidsContainer);

  const bidsTitle = document.createElement("h3");
  bidsTitle.textContent = "Bids";
  renderBidsContainer.appendChild(bidsTitle);

  // Sort bids by amount in descending order (highest first)
  const sortedBids = listing.data.bids.sort((a, b) => b.amount - a.amount);

  // Loop through each sorted bid and render it
  sortedBids.forEach((bidData) => {
    const bid = document.createElement("p");
    bid.classList.add("text-danger", "fw-bold");
    bid.textContent = `${bidData.amount} Credits`;
    renderBidsContainer.appendChild(bid);
  });
}

async function renderUsers(listing, parentElement) {
  const renderUsersContainer = document.createElement("div");
  renderUsersContainer.classList.add("p-1");
  parentElement.appendChild(renderUsersContainer);

  const userNameTitle = document.createElement("h3");
  userNameTitle.textContent = "User";
  renderUsersContainer.appendChild(userNameTitle);

  // Sort bids by amount in descending order (highest first)
  const sortedBids = listing.data.bids.sort((a, b) => b.amount - a.amount);

  // Loop through each sorted bid and render the user info
  sortedBids.forEach((bidData) => {
    const userName = document.createElement("a");
    userName.textContent = bidData.bidder.name;
    userName.classList.add(
      "text-black",
      "fw-bold",
      "d-block",
      "mb-3",
      "text-capitalize",
    );
    userName.href = `/profiles/profile/?name=${bidData.bidder.name}`;
    renderUsersContainer.appendChild(userName);
  });
}
