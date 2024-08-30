import { getProfile } from "../auth/profileData/index.js";
import { load } from "../storage/load.js";

export async function renderProfile(parentElement) {
  // Get the post ID from the query string
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const name = params.get("name");
  try {
    // Fetch the post data based on the ID
    const profile = await getProfile(name);

    console.log(profile);

    // Render the post with the fetched data
    createProfilePage(profile, parentElement);
  } catch (error) {
    console.error("Error fetching or rendering post:", error);
  }
}

export async function createProfilePage(profile, parentElement) {
  const divElement = document.createElement("div");
  divElement.classList.add("card");
  parentElement.appendChild(divElement);

  createProfileName(profile, divElement);
  createProfileAvatar(profile, divElement);
  createProfileBio(profile, divElement);
  createProfileBanner(profile, divElement);
  createAvailableCredits(profile, divElement);
}

async function createProfileName(profile, parentElement) {
  const profileName = document.createElement("h1");
  profileName.innerText = profile.data.name;
  parentElement.appendChild(profileName);
}

async function createProfileBio(profile, parentElement) {
  const profileBio = document.createElement("p");
  profileBio.innerText = profile.data.bio;
  parentElement.appendChild(profileBio);
}

async function createProfileAvatar(profile, parentElement) {
  const profileAvatar = document.createElement("img");
  profileAvatar.src = profile.data.avatar.url;
  profileAvatar.alt = profile.data.avatar.alt;
  profileAvatar.classList.add("rounded-circle", "w-25");
  parentElement.appendChild(profileAvatar);
}

async function createProfileBanner(profile, parentElement) {
  const profileBanner = document.createElement("img");
  profileBanner.src = profile.data.banner.url;
  profileBanner.alt = profile.data.banner.alt;
  parentElement.appendChild(profileBanner);
}

async function createAvailableCredits(profile, parentElement) {
  const credits = document.createElement("p");
  credits.innerText = `Credits ${profile.data.credits}`;
  parentElement.appendChild(credits);
}
