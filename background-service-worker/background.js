chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["apiKey"], (result) => {
    if (!result.apiKey) {
      chrome.tabs.create({ url: "options.html" });
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "GENERATE_SOLUTION") {
    const { apiKey, problemStatement, userCode, programmingLanguage } = message;

    const geminiPrompt = `Generate the actual solution code in ${programmingLanguage} programming language for the following LeetCode problem statement. Do not include any explanation or comments. Also donot include Just provide the code.:
    ${problemStatement} 
    and the user code is:
     ${userCode}.`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    // Using an immediately invoked async function
    (async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: geminiPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.2,
            },
          }),
        });

        if (!res.ok) {
          console.error("Error Fetching solution");
          throw new Error("Error fetching solution: ");
        }

        const data = await res.json();
        const rawResult =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No solution found.";
        const cleanedResult = cleanCodeBlock(rawResult, programmingLanguage);
        sendResponse({
          result: cleanedResult,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        sendResponse({ error: "Fetch failed" });
      }
    })();

    return true; // Required for async sendResponse
  }

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
});
