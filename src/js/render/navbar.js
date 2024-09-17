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

    createProfileDropdown(currentUser, profile);
  } catch (error) {
    console.error("Error fetching or displaying credits:", error);
  }
}

async function createProfileDropdown(currentUser, profile) {
  const divElement = document.querySelector(".profile-btn");
  divElement.innerHTML = "";
  divElement.classList.add(
    "order-first",
    "order-md-last",
    "btn-group",
    "d-flex",
  );

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
  userAvatar.src = currentUser.avatar.url;
  userAvatar.alt = currentUser.avatar.alt;
  button.insertBefore(userAvatar, button.firstChild);

  const list = document.createElement("ul");
  list.classList.add("dropdown-menu", "dropdown-menu-end");

  const anchorOne = document.createElement("a");
  anchorOne.classList.add("dropdown-item", "nav-link", "fw-bold");
  anchorOne.href = `/profiles/profile/?name=${currentUser.name}`;
  anchorOne.textContent = `Profile`;

  const anchorTwo = document.createElement("p");
  anchorTwo.classList.add("dropdown-item", "nav-link", "fw-bold", "m-0");
  anchorTwo.textContent = `Logout`;
  anchorTwo.style.cursor = "pointer";
  anchorTwo.addEventListener("click", () => {
    logout();
  });

  const anchorThree = document.createElement("p");
  anchorThree.classList.add("dropdown-item", "fw-bold", "nav-link");
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

    return;
  } else {
    // Update buttons if user is logged in
    registerBtn.textContent = "Profiles";
    registerBtn.href = "/profiles/";

    // Remove modal-related attributes from the register button
    registerBtn.removeAttribute("data-bs-toggle");
    registerBtn.removeAttribute("data-bs-target");

    loginBtn.textContent = "Home";
    loginBtn.href = "/home/";
    loginBtn.removeAttribute("data-bs-toggle");
    loginBtn.removeAttribute("data-bs-target");
  }
}
