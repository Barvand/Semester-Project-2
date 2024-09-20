const registrationErrorEmail = document.querySelector(
  ".login-error-message-registration-email",
);
const registrationErrorPassword = document.querySelector(
  ".login-error-message-registration-password",
);

const registrationForm = document.getElementById("registerForm");
const registrationEmail = document.getElementById("email");
const registrationPassword = document.getElementById("password");

export async function formRegistrationValidation() {
  let isValid = true;

  if (registrationEmail.value.length === 0) {
    registrationErrorEmail.textContent = ""; // Clear error if empty
    registrationEmail.classList.remove("input-error"); // Ensure no error class is applied
  } else if (registrationEmail.value.length < 6) {
    registrationErrorEmail.textContent = `Email should be more than 6 characters.`;
    registrationEmail.classList.add("input-error"); // Add error class
    isValid = false; // Mark as invalid
  } else if (!registrationEmail.value.includes("@stud.noroff.no")) {
    registrationErrorEmail.textContent = `Only emails with "@stud.noroff.no are allowed to register`;
    registrationEmail.classList.add("input-error"); // Add error class
    isValid = false; // Mark as invalid
  }

  // Validate password input
  if (registrationPassword.value.length === 0) {
    registrationErrorPassword.textContent = ""; // Clear error if empty
    registrationPassword.classList.remove("input-error"); // Add error class
    isValid = false; // Mark as invalid
  } else {
    // Initialize variables to track requirements
    const hasUppercase = /[A-Z]/.test(registrationPassword.value);
    const hasLowercase = /[a-z]/.test(registrationPassword.value);
    const hasDigit = /\d/.test(registrationPassword.value);
    const hasSpecialChar = /[$@#&!%*?]/.test(registrationPassword.value); // Adjust special chars as needed

    // Check each requirement and provide specific error messages
    let errorMessages = [];

    if (!hasUppercase) {
      errorMessages.push("at least one uppercase letter");
    }
    if (!hasLowercase) {
      errorMessages.push("at least one lowercase letter");
    }
    if (!hasDigit) {
      errorMessages.push("at least one digit");
    }
    if (!hasSpecialChar) {
      errorMessages.push(
        "at least one special character (e.g., $, @, #, &, !, %)",
      );
    }

    // If there are any error messages, display them
    if (errorMessages.length > 0) {
      registrationErrorPassword.textContent = `Password must include: ${errorMessages.join(", ")}.`;
      registrationPassword.classList.add("input-error"); // Add error class
      isValid = false; // Mark as invalid
    } else {
      // Clear error if valid
      registrationErrorPassword.textContent = ""; // Clear any previous error message
      registrationPassword.classList.remove("input-error"); // Remove error class
    }
  }
}

registrationForm.addEventListener("change", (event) => {
  event.preventDefault();
  formRegistrationValidation();
});

const createListingForm = document.getElementById("createListingForm");

const errorMessageListingTitle = document.querySelector(
  ".error-message-listing-title",
);
const errorMessageListingDescription = document.querySelector(
  ".error-message-listing-description",
);
const errorMessageListingDeadline = document.querySelector(
  ".error-message-listing-deadline",
);

const listingDeadline = document.getElementById("deadline-date");
const listingTitle = document.getElementById("title");
const listingDescription = document.getElementById("description");

export async function formListingValidation() {
  let isValid = true;

  // Clear previous error messages and styles
  errorMessageListingTitle.textContent = "";
  listingTitle.classList.remove("input-error");

  errorMessageListingDescription.textContent = "";
  listingDescription.classList.remove("input-error");

  errorMessageListingDeadline.textContent = "";
  listingDeadline.classList.remove("input-error");

  // Validate listing title
  if (listingTitle.value.length === 0) {
    errorMessageListingTitle.textContent = "Title cannot be empty.";
    listingTitle.classList.add("input-error");
    isValid = false; // Mark as invalid
  } else if (listingTitle.value.length < 3) {
    errorMessageListingTitle.textContent =
      "Title should be more than 3 characters.";
    listingTitle.classList.add("input-error");
    isValid = false; // Mark as invalid
  }

  // Validate listing description
  if (listingDescription.value.length === 0) {
    errorMessageListingDescription.textContent = "Description cannot be empty.";
    listingDescription.classList.add("input-error");
    isValid = false; // Mark as invalid
  } else if (listingDescription.value.length < 10) {
    errorMessageListingDescription.textContent =
      "Description should be more than 10 characters.";
    listingDescription.classList.add("input-error");
    isValid = false; // Mark as invalid
  }

  // Validate listing deadline
  if (listingDeadline.value.length === 0) {
    errorMessageListingDeadline.textContent = "Deadline cannot be empty.";
    listingDeadline.classList.add("input-error");
    isValid = false; // Mark as invalid
  } else {
    const deadlineDate = new Date(listingDeadline.value);
    const currentDate = new Date();
    if (deadlineDate <= currentDate) {
      errorMessageListingDeadline.textContent =
        "Deadline must be a future date.";
      listingDeadline.classList.add("input-error");
      isValid = false; // Mark as invalid
    }
  }

  return isValid; // Return the validity status
}

// Attach form validation to a change event
createListingForm.addEventListener("change", (event) => {
  event.preventDefault();
  formListingValidation();
});
