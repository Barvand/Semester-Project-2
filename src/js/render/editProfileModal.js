import { load } from "../storage/load.js";
import { getProfile } from "../auth/profileData/read.js";

export async function renderEditModal(profile) {
  const profileDiv = document.querySelector(".current-avatar");
  profileDiv.classList.add("d-flex");
  profileDiv.innerHTML = "";

  const profileImage = document.createElement("img");
  profileImage.src = profile.data.avatar.url;
  profileImage.alt = profile.data.avatar.alt;
  profileImage.classList.add("avatar-profile-img");

  const profileName = document.createElement("p");
  profileName.textContent = profile.data.name;
  profileName.classList.add("text-center", "fw-bold");

  profileDiv.appendChild(profileImage);
  profileDiv.appendChild(profileName);
}
