# LeetCode Helper Extension: Content Script

## Overview

This document details the content script part of the LeetCode Problem Solver Extension. This script runs directly in the context of LeetCode problem pages and is responsible for extracting problem information, user code, and sending this data to the extension's background script.

## Functionality

The content script performs three main functions:

1. Extract the problem description from the page's metadata
2. Retrieve the user's current code from the editor
3. Identify the programming language currently selected
4. Communicate with the background script when requested

## Implementation Details

### Problem Description Extraction

The script extracts the problem description from the page's meta description tag:

```javascript
function getProblemDescription() {
  const metaDescriptionElement = document.querySelector(
    'meta[name="description"]'
  );
  const problemStatement = metaDescriptionElement
    ? metaDescriptionElement.getAttribute("content")
    : null;
  return problemStatement;
}
```

This function:

- Locates the meta description tag in the page's HTML
- Extracts the "content" attribute which contains the problem description
- Returns null if the description isn't found

### User Code Extraction

The script retrieves the user's current code from the LeetCode editor:

```javascript
function getUserCode() {
  const codeElement = document.querySelector(".view-lines");
  if (codeElement) {
    const temporaryDiv = document.createElement("div");
    temporaryDiv.innerHTML = codeElement.innerHTML;
    const code = temporaryDiv.querySelectorAll(".view-line");
    const userCode = Array.from(code)
      .map((line) => line.textContent || "")
      .join("\n");
    return userCode;
  }
  return "There is no user code. Please write the code based on the problem statement.";
}
```

This function:

- Targets the `.view-lines` element that contains the code editor content
- Creates a temporary div to safely parse the HTML
- Extracts each line of code from the individual `.view-line` elements
- Joins the lines with newline characters to preserve formatting
- Returns a default message if no code is found

### Programming Language Detection

The script determines which programming language is currently selected:

```javascript
function getProgrammingLanguage() {
  const buttons = Array.from(document.querySelectorAll("button"));
  const languageButtonParent = buttons.find((button) => {
    const hasChevron = button.querySelector("svg.fa-chevron-down");
    return hasChevron;
  });
  const temporaryDiv = document.createElement("div");
  temporaryDiv.innerHTML = languageButtonParent.innerHTML;
  const programmingLanguage =
    temporaryDiv.querySelector("button").textContent || "JavaScript"; // Default to JavaScript if not found
  return programmingLanguage;
}
```

This function:

- Locates all buttons on the page
- Finds the language selection dropdown by looking for a button with a chevron-down icon
- Creates a temporary div to safely parse the HTML
- Extracts the text content of the button, which contains the language name
- Defaults to JavaScript if the language cannot be determined

### Message Handling

The script listens for messages from other parts of the extension:

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_PROBLEM_DESCRIPTION") {
    const problemStatement = getProblemDescription();
    const userCode = getUserCode();
    const programmingLanguage = getProgrammingLanguage();
    sendResponse({ problemStatement, userCode, programmingLanguage });
  }
});
```

This listener:

- Waits for a message with the action "GET_PROBLEM_DESCRIPTION"
- When received, it calls each utility function to gather the necessary data
- Combines the results into a single response object
- Sends the data back to the requesting component (typically the popup or background script)

## DOM Interaction

The content script interacts with LeetCode's DOM structure to extract information. This approach relies on specific CSS selectors:

- `.view-lines` and `.view-line` for the code editor content
- `meta[name="description"]` for the problem description
- Button elements with specific icon classes for language detection

## Error Handling

The script includes basic fallbacks:

- Returns null if no problem description is found
- Returns a descriptive message if no user code is found
- Defaults to JavaScript if the programming language cannot be determined

## Integration with Background Script

This content script communicates with the background script through Chrome's message passing system. It doesn't initiate actions on its own but responds to requests for information that can only be accessed from within the page context.
