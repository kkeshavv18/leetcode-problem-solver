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
