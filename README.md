# Leetcode Problem Solver Chrome Extension

A Chrome extension that automatically generates solutions for LeetCode problems using the Google Gemini API.

## Features

- 🚀 Automatically extracts problem statements, programming language and user code from LeetCode pages
- 🤖 Generates solutions according to user selected programming language and code template given in leetcode code editor using Google's Gemini AI
- 📋 One-click copy of generated solutions
- ⚙️ Simple API key configuration
- 🔒 Secure storage of your API key

## Installation

### From Chrome Web Store

_(Coming Soon)_

### Manual Installation

1. Clone this repository or download as ZIP

```bash
git clone https://github.com/yourusername/leetcode-problem-solver.git
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top-right corner

4. Click "Load unpacked" and select the extension directory

5. The extension icon will appear in your Chrome toolbar

## Setup

1. Get your Google Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

2. Enter your API key in the field and click "Save"

## Usage

1. Navigate to any LeetCode problem page (e.g., https://leetcode.com/problems/two-sum/)

2. Click the extension icon in your Chrome toolbar to open the popup

3. Click "Generate Solution"

4. Wait a few seconds for the solution to be generated

5. Click "Copy to Clipboard" to copy the solution

6. Paste the solution into the LeetCode editor

## How It Works

The extension works through the following process:

1. **Content Script**: When you're on a LeetCode problem page, a content script extracts the problem description, programming language and code template from the leetcode problems page.

2. **Background Service**: The background script sends the problem description to the Google Gemini API, which generates a solution.

3. **Popup Interface**: The popup script provides a button to copy it to your clipboard.

## File Structure

```
leetcode-problem-solver/
├── background-service-worker/
│   └── background.js
├── content-script/
│   └── content.js
├── documentation/
│   ├── BACKGROUND.MD
│   ├── CONTENT.MD
│   ├── MANIFEST.MD
│   ├── OPTIONS.MD
│   └── POPUP.MD
├── images/
│   └── icon.png
├── manifest.json
├── README.md
├── options.html
├── options.css
└── options.js
```

## Technical Details

- Built with Manifest V3
- Uses Chrome Storage API for saving the API key
- Implements message passing between extension components
- Integrates with Google's Generative Language API (Gemini)

## API Reference

This extension uses the Google Gemini API. For more information, visit:

- [Google AI Studio API Key](https://aistudio.google.com/app/apikey)
- [Gemini API Documentation](https://ai.google.dev/api/all-methods)

## Privacy

This extension:

- Only accesses LeetCode problem pages
- Only sends problem descriptions to the Google Gemini API
- Stores your API key locally in Chrome's secure storage
- Does not collect any personal data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgements

- [Google Gemini API](https://ai.google.dev/)
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/get-started)
- [LeetCode](https://leetcode.com/) for providing the coding challenges

---

**Disclaimer**: This extension is meant for educational purposes and to help understand coding problems. Using automated solutions for competitive programming or interviews may violate terms of service of certain platforms. Furthermore, this extension is using gemini model 1.5, so it may not provide correct solutions for all the leetcode problems.
