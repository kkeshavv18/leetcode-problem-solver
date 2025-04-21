# readme.md

## background.js

This script runs as a background service worker for the "Leetcode Problem Solver" Chrome extension. It now includes logic to check for the API key upon installation and handles the communication with the Google Gemini API to generate solutions for LeetCode problems.

### Functionality:

- **`chrome.runtime.onInstalled.addListener(...)`**:
  - This listener is triggered when the extension is first installed or updated.
  - It retrieves the stored `apiKey` from `chrome.storage.sync`.
  - If no `apiKey` is found (meaning the user hasn't set it yet), it opens the `options.html` page in a new tab, prompting the user to enter their API key.
- **Message Listener (`chrome.runtime.onMessage.addListener`)**:
  - Listens for messages sent from the popup script (`popup.js`).
  - Specifically looks for messages with the `action` property set to `"GENERATE_SOLUTION"`.
- **Solution Generation (`if (message.action === "GENERATE_SOLUTION")`)**:
  - Extracts the `apiKey` and `problemStatement` from the received message.
  - Constructs the URL for the Gemini `generateContent` API endpoint, including the user's API key.
  - Uses the `fetch` API to make a `POST` request to the Gemini API:
    - Sets the `Content-Type` header to `"application/json"`.
    - The `body` of the request includes the prompt for Gemini, instructing it to provide a JavaScript solution for the given problem statement without explanations.
    - Sets a `temperature` of `0.2` in the `generationConfig` to encourage more focused and deterministic responses.
  - Handles the API response:
    - Checks if the response status is successful (`res.ok`). If not, logs an error.
    - Parses the JSON response.
    - Extracts the generated solution from the `data.candidates` array.
    - Sends a response back to the sender (the popup script) containing the `result` (the solution or a "No solution found." message) or an `error` message if the fetch failed.
  - Returns `true` from the message listener callback to indicate that the `sendResponse` will be called asynchronously.

This script now ensures a smoother initial setup by guiding new users to the options page to configure their API key before they can use the extension's core functionality. It continues to act as the central hub for handling the Gemini API communication.
