export async function h1Header(text, parentElement) {
  const header = document.createElement("h1");
  header.innerText = `${text}`;
  header.classList.add(
    "border",
    "border-1",
    "bg-secondary",
    "text-white",
    "text-center",
    "p-1",
    "rounded",
    "mt-2",
    "mb-2",
  );
  parentElement.appendChild(header);
}

export async function h2Header(text, parentElement) {
  const header = document.createElement("h2");
  header.innerText = `${text}`;
  header.classList.add(
    "border",
    "border-1",
    "bg-primary",
    "text-white",
    "text-center",
    "p-1",
    "rounded",
    "mt-2",
    "mb-2",
  );
  parentElement.appendChild(header);
}
