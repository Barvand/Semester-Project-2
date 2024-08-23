import { login } from "../auth/login.js";

// Trick from course assignment video - Creates an object with the keys and values with a single line of code.
export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      // send it to the API
      login(profile);
    });
  }
}
