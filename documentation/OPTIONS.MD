# LeetCode Problem Solver Extension: Options Page Documentation

## Overview

This document details the JavaScript code for the options page (`options.js`) of the LeetCode Problem Solver Chrome extension. The options page allows users to configure their Gemini API key, which is essential for the extension to function.

## Code Structure

```javascript
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["apiKey"], (result) => {
    const apiKey = result.apiKey;
    if (apiKey) {
      document.getElementById("apiKey").value = apiKey;
    }
    document.getElementById("saveBtn").addEventListener("click", () => {
      const apiKey = document.getElementById("apiKey").value;
      if (!apiKey) {
        return;
      }
      chrome.storage.sync.set({ apiKey }, () => {
        document.getElementById("success-message").style.display = "block";
        setTimeout(() => {
          window.close();
        }, 1000);
      });
    });
  });
});
```

## Functionality

The options page script performs three main functions:

1. Load the existing API key (if any) when the page loads
2. Save a new API key when the user clicks the save button
3. Display a confirmation message and close the options page after saving

## Detailed Flow

### Page Initialization

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Code execution starts here
});
```

The script begins by adding an event listener for the `DOMContentLoaded` event, ensuring that the code runs only after the HTML document has been fully loaded and parsed.

### Loading Existing API Key

```javascript
chrome.storage.sync.get(["apiKey"], (result) => {
  const apiKey = result.apiKey;
  if (apiKey) {
    document.getElementById("apiKey").value = apiKey;
  }
  // Event listener setup continues here
});
```

On page load, the script:

1. Retrieves the previously saved API key from Chrome's sync storage
2. If an API key exists, populates the input field with this value
3. This provides a better user experience as users don't need to re-enter their API key if they're just checking or updating settings

### Save Button Event Listener

```javascript
document.getElementById("saveBtn").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKey").value;
  if (!apiKey) {
    return;
  }
  // Storage operations continue here
});
```

The script adds a click event listener to the save button that:

1. Retrieves the current value from the API key input field
2. Performs basic validation by checking if the API key is empty
3. If empty, the function returns early, preventing the save operation

### Saving the API Key

```javascript
chrome.storage.sync.set({ apiKey }, () => {
  document.getElementById("success-message").style.display = "block";
  setTimeout(() => {
    window.close();
  }, 1000);
});
```

If the API key passes validation, the script:

1. Saves the API key to Chrome's sync storage
2. Makes the success message visible by changing its display style
3. Sets a timeout to automatically close the options page after 1 second

## Chrome API Usage

The script utilizes Chrome's Storage API:

- `chrome.storage.sync.get()`: Retrieves the stored API key
- `chrome.storage.sync.set()`: Saves the API key to sync storage

Sync storage was chosen because it:

- Synchronizes the API key across all of the user's Chrome instances where they're signed in
- Persists the API key between browser sessions
- Is more appropriate for small amounts of configuration data like API keys

## HTML Elements Referenced

The script interacts with several HTML elements that must be present in the `options.html` file:

- `apiKey`: An input field for entering the Gemini API key
- `saveBtn`: A button element for triggering the save operation
- `success-message`: An element (likely a div) that displays a confirmation message

## User Experience Considerations

The script includes several user experience enhancements:

1. **Automatic population**: Users don't need to re-enter their API key if they've saved one previously
2. **Visual feedback**: A success message appears when the API key is saved
3. **Automatic closure**: The options page closes automatically after saving, returning the user to their previous context

## Error Handling

The script includes basic error prevention:

- It checks if the API key is empty before saving
- It uses a callback for the Chrome storage operation to ensure the success message is shown only after the save is complete

However, it could be enhanced with more robust error handling, such as:

- Validating the API key format
- Showing error messages for failed save operations
- Testing the API key with a sample request before accepting it
- I will leave this enhancement for you. Feel free to contribute in this project.
