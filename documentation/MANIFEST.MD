# readme.md

## manifest.json

This file is the manifest for the "Leetcode Problem Solver" Chrome extension. It defines the extension's metadata, permissions, background scripts, content scripts, browser action (popup), and options page.

### Key Sections:

- **`manifest_version`**: Specifies the version of the manifest file format. Currently set to `3`.
- **`name`**: The name of the extension, "Leetcode Problem Solver".
- **`version`**: The current version of the extension, "1.0".
- **`description`**: A brief description of the extension's purpose: "A Chrome extension to solve Leetcode problems."
- **`permissions`**: An array of permissions the extension requests from the user.
  - `activeTab`: Allows the extension to access information about the currently active tab.
  - `scripting`: Enables the use of the `chrome.scripting` API for injecting scripts into web pages.
  - `storage`: Permits the extension to store and retrieve user data (in this case, the Gemini API key).
- **`background`**: Defines the background service worker script that runs in the background to handle events and API calls.
  - `service_worker`: Specifies the JavaScript file for the service worker (`background.js`).
- **`action`**: Configures the extension's toolbar icon and its associated popup.
  - `default_popup`: Specifies the HTML file (`popup.html`) to be displayed when the icon is clicked.
  - `default_icon`: Sets the icon for the extension (located at `images/icon.png`).
- **`content_scripts`**: An array of content scripts to be injected into web pages that match the specified `matches` pattern.
  - `matches`: An array of URL patterns where the content script will be injected (`"*://*.leetcode.com/problems/*"` targets LeetCode problem pages).
  - `js`: An array of JavaScript files to be injected (`["content.js"]`).
- **`options_page`**: Specifies the HTML file (`options.html`) for the extension's options page, accessible via the Chrome extensions management page.
- **`host_permissions`**: An array of host permissions that allow the extension to interact with specific websites.
  - `"*://*.leetcode.com/*"`: Grants permission to access all pages on the `leetcode.com` domain.
  - `"https://generativelanguage.googleapis.com/*"`: Grants permission to communicate with the Google Generative Language API.

This file is crucial for the Chrome browser to understand the extension's structure, capabilities, and security requirements.
