# readme.md

## content.js

This is a content script that gets injected into web pages matching the pattern `"*://*.leetcode.com/problems/*"` as defined in the `manifest.json` file. Its primary purpose is to extract the problem statement from the currently viewed LeetCode problem page.

### Functionality:

-   **`getProblemDescription()` Function**:
    -   This function queries the Document Object Model (DOM) of the LeetCode problem page.
    -   It specifically looks for a `<meta>` tag with the `name` attribute set to `"description"`.
    -   If such a meta tag is found, it retrieves the value of its `content` attribute, which typically contains the problem statement.
    -   The extracted `problemStatement` is logged to the console for debugging purposes.
    -   The function returns the extracted `problemStatement` or `null` if the meta tag is not found.
-   **Message Listener (`chrome.runtime.onMessage.addListener`)**:
    -   Listens for messages sent from other parts of the extension (specifically the popup script, `popup.js`).
    -   It checks if the received message has an `action` property equal to `"GET_PROBLEM_DESCRIPTION"`.
    -   If the action matches, it calls the `getProblemDescription()` function to retrieve the problem statement.
    -   It then sends a response back to the sender (the popup script) containing the extracted `problemStatement`.

This script enables the extension to understand the specific LeetCode problem the user is currently viewing, which is then used as the prompt for the Gemini API to generate a solution.