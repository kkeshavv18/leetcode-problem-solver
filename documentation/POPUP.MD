# Chrome Extension: Solution Generator

This project is a Chrome Extension script that:

- Injects a content script into the currently active tab.
- Extracts a problem description, user code, and programming language from the page.
- Sends this data to a backend service (using an API key) to generate a solution.
- Displays the generated solution within the extension and provides an easy way to copy it.

## Features

- **Manual content script injection:** Enables functionality on dynamically loaded pages.
- **API Key Management:** Fetches and utilizes API keys securely stored in Chrome's `storage.sync`.
- **Inter-script Communication:** Facilitates seamless messaging between the background, content, and popup scripts.
- **User Feedback:** Includes loading indicators to show processing and error handling for potential issues.
- **One-Click Copy:** Allows users to quickly copy the generated solution to their clipboard with a single click.

## How It Works

### 1. Click the Generate Button

When the user clicks the "Generate Solution" button in the extension's popup:

- A loading message is displayed to indicate activity.
- The script retrieves the API key from Chrome's `storage.sync`.
- The `content.js` script is injected into the currently active tab of the browser.

### 2. Extract Problem Details

Once injected, the `content.js` script:

- Receives a message from the popup script to initiate the extraction process.
- Extracts the following information from the webpage:
  - **Problem Statement:** The description of the coding problem.
  - **User's Code:** Any code the user has already written.
  - **Programming Language:** The language associated with the user's code or the problem.

### 3. Generate Solution

- The extracted problem details, along with the API key, are sent to the gemini api endpoint.
- The gemini api processes the request and returns a generated solution.

### 4. Display and Copy Solution

- The generated solution received from the backend is displayed in the output field of the extension's popup but the output element is hidden.
- A "Copy to Clipboard" button allows the user to easily copy the displayed solution.
