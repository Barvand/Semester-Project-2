export async function createProfilesInfo(profiles, parentElement) {
  const profileCard = document.createElement("div");
  profileCard.classList.add("card", "rounded", "col-3", "flex-row");
  parentElement.appendChild(profileCard);

  const sellerInfoDiv = document.createElement("a");
  sellerInfoDiv.href = `/profiles/profile/?name=${profiles.name}`;
  sellerInfoDiv.classList.add("col-12", "d-flex");
  profileCard.appendChild(sellerInfoDiv);

  const sellerName = document.createElement("p");
  sellerName.innerText = profiles.name;
  sellerName.classList.add(
    "p-1",
    "text-wrap",
    "align-self-center",
    "lead",
    "fw-bold",
    "profile-name-listing",
    "text-black",
  );

  const sellerImage = document.createElement("img");
  sellerImage.src = profiles.avatar.url;
  sellerImage.alt = profiles.avatar.alt;
  sellerImage.classList.add("avatar-profile-img", "rounded-circle");

  sellerInfoDiv.appendChild(sellerImage);
  sellerInfoDiv.appendChild(sellerName);
}
