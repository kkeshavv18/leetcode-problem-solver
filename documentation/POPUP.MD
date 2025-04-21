# readme.md

## popup.js

This script runs when the `popup.html` of the "Leetcode Problem Solver" Chrome extension is opened. It handles user interactions within the popup, such as clicking the "Generate Solution" and "Copy the Solution" buttons, and communicates with other parts of the extension to fetch and display the solution.

### Functionality:

-   **"Generate Solution" Button Listener (`document.getElementById("generateBtn").addEventListener("click", ...)`**:
    -   Attaches an event listener to the button with the ID `"generateBtn"`.
    -   When clicked:
        -   Displays a loading indicator (`#loading`) with the text "Generating the solution. Please wait...".
        -   Retrieves the stored `apiKey` from `chrome.storage.sync`.
        -   If the API key is not found, it displays an error message in the output area (`#output`).
        -   If the API key is found:
            -   Queries the currently active tab in the current window using `chrome.tabs.query`.
            -   Sends a message to the `content.js` script running on that tab with the `action` `"GET_PROBLEM_DESCRIPTION"` to request the LeetCode problem statement.
            -   Handles the response from `content.js`:
                -   If the problem statement is successfully retrieved, it sends a message to the `background.js` service worker with the `action` `"GENERATE_SOLUTION"`, including the `apiKey` and the `problemStatement`.
                -   If the problem statement retrieval fails, it displays an error message in the output area.
            -   Handles the response from `background.js` (the generated solution or an error):
                -   If there's an `error` in the response, it displays an error message in the output area.
                -   If the solution is received successfully, it makes the "Copy to Clipboard" button (`#copyBtn`) visible, displays the solution in the output area, and hides the loading indicator.
-   **"Copy the Solution" Button Listener (`document.getElementById("copyBtn").addEventListener("click", ...)`**:
    -   Attaches an event listener to the button with the ID `"copyBtn"`.
    -   When clicked:
        -   Gets the text content from the output area (`#output`).
        -   Calls the `cleanCodeBlock()` function to remove any leading/trailing whitespace and Markdown code block markers.
        -   Uses the `navigator.clipboard.writeText()` API to copy the cleaned code to the clipboard.
        -   Provides visual feedback to the user by changing the button text to "Copied!" for a short duration.
-   **`cleanCodeBlock(code)` Function**:
    -   Takes a string (`code`) as input.
    -   Trims any leading or trailing whitespace from the string.
    -   Removes any leading ````javascript` or trailing ```` markers that might be present in the Gemini API's response.
    -   Returns the cleaned code string.

This script is the primary interface for the user to interact with the extension's core functionality of generating and copying LeetCode problem solutions.