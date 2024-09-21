import { getProfile } from "../auth/profileData/index.js";
import { load } from "../storage/load.js";
import { logout } from "../auth/logout.js";

export async function renderNavigation() {
  const currentUser = load("profile");

  if (!currentUser) {
    return;
  }

  try {
    const profile = await getProfile(currentUser.name);

    createProfileDropdown(currentUser, profile);
    renderNavUser(profile);
  } catch (error) {
    console.error("Error fetching or displaying credits:", error);
  }
}

async function createProfileDropdown(currentUser, profile) {
  const divElement = document.querySelector(".profile-btn");
  divElement.innerHTML = "";
  divElement.classList.add("flex-column");

  const button = document.createElement("button");
  button.classList.add(
    "btn",
    "btn-sm",
    "d-flex",
    "flex-column",
    "align-items-center",
  );
  button.type = "button";
  button.setAttribute("data-bs-toggle", "dropdown");
  button.setAttribute("aria-expanded", "false");

  const userAvatar = document.createElement("img");
  userAvatar.classList.add("avatar-profile-img", "rounded-circle");
  userAvatar.src = currentUser.avatar.url;
  userAvatar.alt = currentUser.avatar.alt;
  button.appendChild(userAvatar);

  const list = document.createElement("ul");
  list.classList.add("dropdown-menu", "dropdown-menu-end");

  const listItemOne = document.createElement("li");
  listItemOne.classList.add("nav-item");

  const anchorOne = document.createElement("a");
  anchorOne.classList.add("nav-link", "fw-bold");
  anchorOne.href = `/profiles/profile/?name=${currentUser.name}`;
  anchorOne.textContent = `Profile`;
  listItemOne.appendChild(anchorOne);

  const listItemTwo = document.createElement("li");
  listItemTwo.classList.add("nav-item");
  const anchorTwo = document.createElement("a");
  anchorTwo.classList.add("nav-link");
  anchorTwo.textContent = `Logout`;
  anchorTwo.style.cursor = "pointer";
  anchorTwo.addEventListener("click", () => {
    logout();
  });
  listItemTwo.appendChild(anchorTwo);

  list.appendChild(listItemOne);
  list.appendChild(listItemTwo);

  divElement.appendChild(button);
  divElement.appendChild(list);
}

export async function renderNavUser(profile) {
  const registerBtn = document.querySelector(".register-btn");
  const loginBtn = document.querySelector(".login-btn");
  const balance = document.querySelector(".nav-balance");

  // Load the current user's profile
  const currentUser = load("profile");

  // Check if the user is logged in
  if (!currentUser) {
    // Show register and login buttons if not logged in
    registerBtn.style.display = "block";
    loginBtn.style.display = "block";

    return;
  } else {
    // Update buttons if user is logged in
    registerBtn.textContent = "Profiles";
    registerBtn.href = "/profiles/";

    // Remove modal-related attributes from the register button
    registerBtn.removeAttribute("data-bs-toggle");
    registerBtn.removeAttribute("data-bs-target");

    balance.textContent = `Available balance $${profile.data.credits}`;
    balance.classList.add("d-block");
    balance.classList.remove("d-none");

    loginBtn.style.display = "none";
    loginBtn.removeAttribute("data-bs-target");
  }
}
