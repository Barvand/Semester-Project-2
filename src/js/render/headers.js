export async function h1Header(text, parentElement) {
  const header = document.createElement("h1");
  header.innerText = `${text}`;
  header.classList.add(
    "border-bottom",
    "border-1",
    "border-primary",
    "p-1",
    "mt-2",
    "mb-2",
  );
  parentElement.appendChild(header);
}

export async function h2Header(text, parentElement) {
  const header = document.createElement("h2");
  header.innerText = `${text}`;
  header.classList.add(
    "border-bottom",
    "border-1",
    "border-primary",
    "p-1",
    "mt-2",
    "mb-2",
  );
  parentElement.appendChild(header);
}
