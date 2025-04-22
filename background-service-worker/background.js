chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["apiKey"], (result) => {
    if (!result.apiKey) {
      chrome.tabs.create({ url: "options.html" });
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "GENERATE_SOLUTION") {
    const { apiKey, problemStatement } = message;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Give the solution in Javascript programming language. Only give the executable code without any explaination for the following problem: ${problemStatement}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
        },
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          console.error("Error Fetching solution");
          throw new Error("Error fetching solution: ");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        sendResponse({
          result:
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No solution found.",
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        sendResponse({ error: "Fetch failed" });
      });

    return true; // Required for async sendResponse
  }
});
