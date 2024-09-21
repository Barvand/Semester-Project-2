import { register } from "../auth/register.js";

export function setRegisterFormListener() {
  const form = document.querySelector("#registerForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);

      // Convert FormData to an object
      const profile = Object.fromEntries(formData.entries());

      // Create the avatar object if fields are provided
      const avatar =
        profile.avatarUrl || profile.avatarAlt
          ? {
              url: profile.avatarUrl || "",
              alt: profile.avatarAlt || "",
            }
          : undefined;

      // Create the banner object if fields are provided
      const banner =
        profile.bannerUrl || profile.bannerAlt
          ? {
              url: profile.bannerUrl || "",
              alt: profile.bannerAlt || "",
            }
          : undefined;

      // Structure the profile object
      const profileWithOptionalFields = {
        name: profile.name,
        username: profile.username,
        email: profile.email,
        password: profile.password,
        bio: profile.bio || "", // Include bio if it's defined
        avatar, // Include avatar if it's defined
        banner, // Include banner if it's defined
      };

      // Send it to the API
      register(profileWithOptionalFields);
    });
  }
}
