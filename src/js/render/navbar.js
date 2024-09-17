import { getProfile } from "../auth/profileData/index.js";
import { load } from "../storage/load.js";
import { logout } from "../auth/logout.js";

export async function displayCredits() {
  const currentUser = load("profile");

  if (!currentUser) {
    return;
  }

  try {
    const profile = await getProfile(currentUser.name);

    const parentElement = document.querySelector(".navbar-nav");

    createProfileDropdown(profile, parentElement);
  } catch (error) {
    console.error("Error fetching or displaying credits:", error);
  }
}

async function createProfileDropdown(profile, parentElement) {
  const divElement = document.createElement("div");
  divElement.classList.add(
    "order-first", // Applies to small screens and up
    "order-md-last", // Applies to medium screens and up
    "btn-group",
    "d-flex",
  );
  parentElement.appendChild(divElement);

  const button = document.createElement("button");
  button.classList.add(
    "btn",
    "btn-white",
    "btn-sm",
    "profile-btn",
    "d-flex",
    "flex-column",
    "align-items-center",
  );
  button.type = "button";
  button.setAttribute("data-bs-toggle", "dropdown");
  button.setAttribute("aria-expanded", "false");

  const userAvatar = document.createElement("img");
  userAvatar.classList.add("avatar-profile-img", "rounded-circle");
  userAvatar.src = profile.data.avatar.url;
  userAvatar.alt = profile.data.avatar.alt;
  button.insertBefore(userAvatar, button.firstChild);

  const list = document.createElement("ul");
  list.classList.add("dropdown-menu", "dropdown-menu-end");

  const anchorOne = document.createElement("a");
  anchorOne.classList.add("dropdown-item", "dropdown-profile", "fw-bold");
  anchorOne.href = `/profiles/profile/?name=${profile.data.name}`;
  anchorOne.textContent = `Profile`;

  const anchorTwo = document.createElement("a");
  anchorTwo.classList.add(
    "dropdown-item",
    "dropdown-logout",
    "btn",
    "btn-primary",
    "fw-bold",
  );
  anchorTwo.textContent = `Logout`;
  anchorTwo.addEventListener("click", () => {
    logout();
  });

  const anchorThree = document.createElement("p");
  anchorThree.classList.add("dropdown-item", "dropdown-profile", "fw-bold");
  anchorThree.textContent = `Balance $${profile.data.credits}`;

  list.appendChild(anchorOne);
  list.appendChild(anchorTwo);
  list.appendChild(anchorThree);

  divElement.appendChild(button);
  divElement.appendChild(list);
}

export async function renderNavUser() {
  const registerBtn = document.querySelector(".register-btn");
  const loginBtn = document.querySelector(".login-btn");

  // Load the current user's profile
  const currentUser = load("profile");

  // Check if the user is logged in
  if (!currentUser) {
    // Show register and login buttons if not logged in
    registerBtn.style.display = "block";
    loginBtn.style.display = "block";

    // Remove modal-related attributes from the register button
    registerBtn.removeAttribute("data-bs-toggle");
    registerBtn.removeAttribute("data-bs-target");

    return;
  } else {
    // Update buttons if user is logged in
    registerBtn.textContent = "Profiles";
    registerBtn.href = "/profiles/index.html";

    // Remove modal-related attributes from the register button
    registerBtn.removeAttribute("data-bs-toggle");
    registerBtn.removeAttribute("data-bs-target");

    loginBtn.style.display = "none";
  }
}
