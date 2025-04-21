# readme.md

## options.js

This script runs on the `options.html` page of the "Leetcode Problem Solver" Chrome extension. It handles the logic for allowing users to input and save their Gemini API key.

### Functionality:

-   **`DOMContentLoaded` Listener**:
    -   Ensures that the script runs only after the entire HTML document has been loaded and parsed.
-   **Retrieving Existing API Key (`chrome.storage.sync.get(["apiKey"], ...)`**:
    -   When the options page loads, this code retrieves any previously saved `apiKey` from the `chrome.storage.sync` API.
    -   If an API key is found in storage, it populates the value of the input field with the ID `"apiKey"` in the `options.html` page.
-   **"Save" Button Event Listener (`document.getElementById("saveBtn").addEventListener("click", ...)`**:
    -   Attaches an event listener to the button with the ID `"saveBtn"`.
    -   When the "Save" button is clicked:
        -   It retrieves the value entered by the user in the input field with the ID `"apiKey"`.
        -   It checks if the API key is not empty. If it's empty, no action is taken.
        -   If the API key is provided, it uses `chrome.storage.sync.set({ apiKey }, ...)` to save the API key to Chrome's synchronized storage. This ensures that the API key is associated with the user's Chrome profile and can be accessed across their devices.
        -   After successfully saving the API key:
            -   It makes the success message element (with the ID `"success-message"`) visible.
            -   It then uses `setTimeout` to close the options window after a brief delay (1000 milliseconds).

This script provides a simple and persistent way for users to configure the extension with their Gemini API key, which is essential for the extension's core functionality.