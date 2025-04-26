function getProblemDescription() {
  const metaDescriptionElement = document.querySelector(
    'meta[name="description"]'
  );
  const problemStatement = metaDescriptionElement
    ? metaDescriptionElement.getAttribute("content")
    : null;
  return problemStatement;
}
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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_PROBLEM_DESCRIPTION") {
    const problemStatement = getProblemDescription();
    const userCode = getUserCode();
    const programmingLanguage = getProgrammingLanguage();
    sendResponse({ problemStatement, userCode, programmingLanguage });
  }
});
