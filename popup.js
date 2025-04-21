document.getElementById("generateBtn").addEventListener("click", () => {
  const loading = document.getElementById("loading");
  loading.style.display = "block";
  loading.textContent = "Generating the solution. Please wait...";

  chrome.storage.sync.get(["apiKey"], ({ apiKey }) => {
    if (!apiKey) {
      loading.textContent =
        "API key not found. Please set it in the options page.";
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.tabs.sendMessage(
        tab.id,
        { action: "GET_PROBLEM_DESCRIPTION" },
        (response) => {
          const problemStatement = response?.problemStatement;
          if (!problemStatement) {
            output.textContent = "Failed to Extract Problem Statement.";
            return;
          }
          chrome.runtime.sendMessage(
            { action: "GENERATE_SOLUTION", apiKey, problemStatement },
            (response) => {
              if (response?.error) {
                output.textContent = "Error generating solution.";
              } else {
                document.getElementById("copyBtn").style.display = "block";
                output.textContent = response.result;
                loading.style.display = "none";
              }
            }
          );
        }
      );
    });
  });
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const output = document.getElementById("output").textContent;
  const codeBlock = cleanCodeBlock(output);
  navigator.clipboard.writeText(codeBlock).then(() => {
    const copyBtn = document.getElementById("copyBtn");
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy to Clipboard";
    }, 2000);
  });
});

function cleanCodeBlock(code) {
  return code
    .trim()
    .replace(/^```javascript\s*/, "") // Remove starting ```javascript
    .replace(/```$/, "") // Remove ending ```
    .trim();
}
