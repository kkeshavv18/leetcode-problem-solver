# LeetCode Helper Extension Background

## Overview

This document details the background script (`background.js`) of the LeetCode Problem Solver Extension. The extension helps users solve LeetCode coding problems by leveraging Google's Gemini AI to generate solutions based on problem statements.

## Functionality

The background script serves as the core controller for the extension and handles two main operations:

1. Initial setup when the extension is installed
2. Handling solution generation requests from the popup.js

## Technical Flow

### Installation Flow

When the extension is first installed:

1. The extension checks if an API key is already stored in Chrome's sync storage
2. If no API key is found, it automatically opens the options page to prompt the user to enter their Gemini API key

```
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["apiKey"], (result) => {
    if (!result.apiKey) {
      chrome.tabs.create({ url: "options.html" });
    }
  });
});
```

### Solution Generation Flow

The background script listens for messages from other parts of the extension:

1. It waits for a message with the action "GENERATE_SOLUTION"
2. When received, it extracts the necessary data:
   - API key for Gemini
   - Problem statement from LeetCode
   - User's partially completed code
   - Programming language
3. It constructs a prompt for the Gemini API
4. It makes an asynchronous API call to Gemini's generative API
5. Upon receiving a response, it processes the solution and sends it back to the requesting component

## API Integration

The extension integrates with Google's Gemini API:

- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
- API key: Stored in Chrome's sync storage and retrieved for each request
- Model: gemini-1.5-flash (optimized for quick responses)
- Temperature: 0.2 (low temperature for consistent, deterministic solutions)

## Request Processing

The message handler uses an immediately invoked async function (IIFE) to handle the asynchronous nature of the API call while working within Chrome's message passing system:

```javascript
(async () => {
  try {
    // API call and response handling
  } catch (err) {
    // Error handling
  }
})();

return true; // Required for async sendResponse
```

## Response Processing

After receiving the solution from Gemini:

1. The extension extracts the solution text from the API response
2. It cleans the code block to remove any formatting markers (like Markdown code block syntax)
3. It sends the cleaned solution back to the requesting component

## Code Cleaning Utility

The `cleanCodeBlock` function ensures that the solution is properly formatted:

````javascript
function cleanCodeBlock(code, programmingLanguage) {
  let result = code
    .trim()
    .replace(new RegExp("^```" + programmingLanguage + "\\s*", "i"), "")
    .replace(/```$/, "");

  if (result.startsWith("```")) {
    result = result.replace(/^```[a-zA-Z]*\s*/, "").replace(/```$/, "");
  }
  return result.trim();
}
````

This function:

1. Removes language-specific code block markers
2. Handles cases where the language isn't specified in the code block
3. Ensures consistent trimming of whitespace

## Error Handling

The extension includes basic error handling:

- Logs errors to the console
- Returns appropriate error messages to the requesting component
- Handles cases where the API might return unexpected or malformed responses

## Security Considerations

- The API key is stored in Chrome's sync storage for persistence
- API requests are made directly from the background script, keeping the key secure
- The extension uses HTTPS for all API communications
