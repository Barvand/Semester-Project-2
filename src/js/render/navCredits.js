import { getProfile } from "../auth/profileData/index.js";
import { load } from "../storage/load.js";

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

    // Create and append user info
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("d-flex", "align-items-center");

    const userAvatar = document.createElement("img");
    userAvatar.classList.add("avatar-profile-img", "rounded-circle");
    userAvatar.src = profile.data.avatar.url;
    userAvatar.alt = profile.data.avatar.alt;

    const userName = document.createElement("p");
    userName.textContent = profile.data.name;
    userName.classList.add("mb-0", "ms-2"); // Adds margin-left for spacing

    userInfoDiv.appendChild(userAvatar);
    userInfoDiv.appendChild(userName);

    const userInfoColumn = document.querySelector(
      ".col-12.col-md-4.d-flex.justify-content-end.align-items-center",
    );
    userInfoColumn.appendChild(userInfoDiv);
  } catch (error) {
    console.error("Error fetching or displaying credits:", error);
  }
}
