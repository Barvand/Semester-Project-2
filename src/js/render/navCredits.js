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
    const credits = profile.data.credits;

    // Display credits in the designated column
    const userCredits = document.querySelector(".credits");
    userCredits.innerHTML = `<p> Balance <i class="fa-solid fa-dollar-sign"></i> ${credits} </p>`;
    userCredits.classList.add("p-0", "m-0");

    const parentElement = document.querySelector(".profile-dropdown");

    createProfileDropdown(profile, parentElement);
  } catch (error) {
    console.error("Error fetching or displaying credits:", error);
  }
}

async function createProfileDropdown(profile, parentElement) {
  const divElement = document.createElement("div");
  divElement.classList.add("btn-group");
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
  button.textContent = `${profile.data.name}`;
  button.setAttribute("data-bs-toggle", "dropdown");
  button.setAttribute("aria-expanded", "false");

  const userAvatar = document.createElement("img");
  userAvatar.classList.add("avatar-profile-img", "rounded-circle");
  userAvatar.src = profile.data.avatar.url;
  userAvatar.alt = profile.data.avatar.alt;
  button.insertBefore(userAvatar, button.firstChild);
  const list = document.createElement("ul");
  list.classList.add("dropdown-menu");

  const anchorOne = document.createElement("a");
  anchorOne.classList.add("dropdown-item", "dropdown-profile");
  anchorOne.href = `/profiles/profile/?name=${profile.data.name}`;
  anchorOne.textContent = `Profile`;

  const anchorTwo = document.createElement("a");
  anchorTwo.classList.add("dropdown-item", "dropdown-logout");
  anchorTwo.textContent = `Logout`;
  anchorTwo.addEventListener("click", () => {
    logout();
  });

  list.appendChild(anchorOne);
  list.appendChild(anchorTwo);

  divElement.appendChild(button);
  divElement.appendChild(list);
}
