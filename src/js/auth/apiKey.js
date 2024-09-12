import { API_BASE_URL } from "../constants.js";

const action = "/auth/create-api-key";
const method = "post";

export async function createApiKey() {
  const createApiKeyURL = API_BASE_URL + action;
  const body = JSON.stringify({
    name: "My API Key name", // Example data to be sent in the body
  });

  try {
    const response = await fetch(createApiKeyURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQmFydmFuZHkiLCJlbWFpbCI6ImJhcnZhbmR5QHN0dWQubm9yb2ZmLm5vIiwiaWF0IjoxNzI0OTI4NjI3fQ.l-egs86P9W1xWn9w3Ym46o1O0rvkSjJuM7w9yc026wI`,
      },
      method,
      body,
    });

    if (response.ok) {
      const apiKeyData = await response.json();

      console.log(apiKeyData);
      return apiKeyData; // Optionally return the created API key data
    } else {
      const errorMessage = await response.text();
      console.error("Failed to create API Key:", errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error during API key creation:", error);
    // Handle or throw the error based on your needs
  }
}
