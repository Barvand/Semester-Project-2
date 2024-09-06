import { setCreateBiddingFormListener } from "../handlers/bids.js";

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

export async function createBiddingTable(listing, parentElement) {
  renderBidsHeader(parentElement);

  // Create the table and its components
  const table = document.createElement("table");
  table.classList.add("table", "table-striped");

  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Create the header row
  const headerRow = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.scope = "col";
  th1.textContent = "#";

  const th2 = document.createElement("th");
  th2.scope = "col";
  th2.textContent = "Bids";

  const th3 = document.createElement("th");
  th3.scope = "col";
  th3.textContent = "User";

  const th4 = document.createElement("th");
  th4.scope = "col";
  th4.textContent = "Active";

  // Append header cells to the header row
  headerRow.appendChild(th1);
  headerRow.appendChild(th2);
  headerRow.appendChild(th3);
  headerRow.appendChild(th4);

  // Append the header row to thead
  thead.appendChild(headerRow);

  // Check if there are any bids
  if (listing.data.bids.length === 0) {
    const noBidsMessage = document.createElement("p");
    noBidsMessage.classList.add("text-muted");
    noBidsMessage.textContent = "No users have placed a bid yet.";
    parentElement.appendChild(noBidsMessage);
    return; // Exit the function since there's nothing else to render
  }

  // Sort bids by amount in descending order (highest first)
  const sortedBids = listing.data.bids.sort((a, b) => b.amount - a.amount);

  // Create and append rows to tbody
  sortedBids.forEach((bidData, index) => {
    const row = document.createElement("tr");

    const th = document.createElement("th");
    th.scope = "row";
    th.textContent = index + 1;

    const td1 = document.createElement("td");
    td1.textContent = `${bidData.amount} Credits`;

    const td2 = document.createElement("td");
    const userName = document.createElement("a");
    userName.textContent = bidData.bidder.name;
    userName.href = `/profiles/profile/?name=${bidData.bidder.name}`;
    td2.appendChild(userName);

    const td3 = document.createElement("td");
    td3.textContent = bidData.active ? "Yes" : "No";

    row.appendChild(th);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);

    tbody.appendChild(row);
  });

  // Append thead and tbody to the table
  table.appendChild(thead);
  table.appendChild(tbody);

  // Finally, append the table to the parent element
  parentElement.appendChild(table);
}

export async function createBidButton(parentElement) {
  // Create the div element to hold the form
  const divElement = document.createElement("div");
  divElement.classList.add("m-2");

  // Create the form element
  const formElement = document.createElement("form");
  formElement.setAttribute("id", "bidForm"); // Corrected setAttribute usage
  formElement.classList.add("d-flex", "justify-content-between", "gap-3");

  // Create the label for the amount input
  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", "bidAmount");
  labelElement.innerText = "Bid Amount:";
  // You can keep the label hidden but ensure accessibility
  labelElement.classList.add("d-none"); // If hidden intentionally

  // Create the input field for entering the bid amount
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("id", "bidAmount");
  inputElement.setAttribute("name", "bidAmount");
  inputElement.setAttribute("min", "0");
  inputElement.setAttribute("required", true);
  inputElement.placeholder = "Enter your bid";
  inputElement.classList.add("p-1");

  // Create the submit button
  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.classList.add(
    "btn",
    "btn-custom",
    "btn-success",
    "text-white",
    "fw-bold",
  );
  submitButton.innerText = "Submit Bid";

  // Append label, input field, and submit button to the form
  formElement.appendChild(labelElement);
  formElement.appendChild(inputElement);
  formElement.appendChild(submitButton);

  // Append the form to the div container
  divElement.appendChild(formElement);

  // Append the div container to the parent element
  parentElement.appendChild(divElement);

  setCreateBiddingFormListener();
}
