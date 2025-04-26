# LeetCode Problem Solver Extension: Manifest Documentation

## Overview

This document details the `manifest.json` file for the LeetCode Problem Solver Chrome extension. The manifest file is the backbone of any Chrome extension, defining its capabilities, permissions, and structure.

## Manifest File Structure

```json
{
  "manifest_version": 3,
  "name": "Leetcode Problem Solver",
  "version": "1.0",
  "description": "A Chrome extension to solve Leetcode problems.",
  "permissions": ["activeTab", "scripting", "storage"],
  "background": {
    "service_worker": "background-service-worker/background.js"
  },
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": "images/icon.png"
  },
  "content_scripts": [
    {
      "matches": ["*://*.leetcode.com/problems/*"],
      "js": ["content-script/content.js"]
    }
  ],
  "options_page": "options.html",
  "host_permissions": [
    "*://*.leetcode.com/*",
    "https://generativelanguage.googleapis.com/*"
  ],
  "web_accessible_resources": [
    {
      "resources": ["content.js"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

## Key Components

### Basic Information

- **Manifest Version**: Uses Manifest V3, the latest Chrome extension framework
- **Name**: "Leetcode Problem Solver"
- **Version**: 1.0
- **Description**: "A Chrome extension to solve Leetcode problems."

### Permissions

The extension requires the following permissions:

- **activeTab**: Allows the extension to access the currently active tab
- **scripting**: Enables the extension to execute scripts in web pages
- **storage**: Allows the extension to use Chrome's storage API, likely for storing the API key

### Background Script

```json
"background": {
  "service_worker": "background-service-worker/background.js"
}
```

The extension uses a service worker (`background.js`) located in the `background-service-worker` directory. This script runs in the background and manages the extension's core functionality, including:

- Handling extension installation
- Managing API communications
- Processing messages from the content script and popup

### Popup

```json
"action": {
  "default_popup": "popup/popup.html",
  "default_icon": "images/icon.png"
}
```

- **Popup HTML**: When users click the extension icon, `popup/popup.html` is displayed
- **Icon**: The extension uses `images/icon.png` as its toolbar icon

### Content Scripts

```json
"content_scripts": [
  {
    "matches": ["*://*.leetcode.com/problems/*"],
    "js": ["content-script/content.js"]
  }
]
```

- **Matches**: The content script runs only on LeetCode problem pages (URLs that match `*://*.leetcode.com/problems/*`)
- **Script**: The `content-script/content.js` file is injected into matching pages

### Options Page

```json
"options_page": "options.html"
```

The extension provides an options page (`options.html`) where users can configure settings, most importantly the Gemini API key.

### Host Permissions

```json
"host_permissions": [
  "*://*.leetcode.com/*",
  "https://generativelanguage.googleapis.com/*"
]
```

The extension requests permission to interact with:

- All LeetCode domains
- Google's Generative Language API (Gemini)

### Web Accessible Resources

```json
"web_accessible_resources": [
  {
    "resources": ["content.js"],
    "matches": ["<all_urls>"]
  }
]
```

Makes `content.js` accessible to web pages, allowing it to be referenced by any URL. This is typically used for resources that need to be loaded by web pages or other extension components.

### Detailed Flow Description:

1. **User Interaction**:

   - User navigates to a LeetCode problem page
   - User clicks the extension icon in the browser toolbar
   - The popup opens and user clicks the "Generate Solution" button

2. **Data Collection**:

   - Popup script sends a message to the content script requesting problem information
   - Content script runs functions to extract:
     - Problem description from meta tags
     - User's current code from the editor
     - Selected programming language

3. **API Request**:

   - Popup retrieves the API key from Chrome storage
   - Popup sends all collected data to the background script
   - Background script constructs a prompt for Gemini AI
   - Background script makes an HTTPS request to Gemini API

4. **Solution Processing**:

   - Gemini API returns a solution
   - Background script cleans the code (removes markdown formatting)
   - Background script sends the processed solution back to popup
   - Popup displays the copy to the clipboard button
   - On clicking that button, the actual code returned by background script is copied to the clipboard

5. **Error Handling**:
   - Each component includes error handling for failed API calls, missing data, etc.
   - User is notified if any step fails

## Security Considerations

- The extension uses limited permissions, requesting only what it needs
- Host permissions are restricted to the necessary domains
- Storage permission implies the extension is storing sensitive information (like API keys)

## Browser Compatibility

Being a Manifest V3 extension, it is compatible with:

- Google Chrome (version 88+)
- Microsoft Edge (version 89+)
- Other Chromium-based browsers that support Manifest V3
