function getProblemDescription() {
  const metaDescriptionElement = document.querySelector(
    'meta[name="description"]'
  );
  const problemStatement = metaDescriptionElement
    ? metaDescriptionElement.getAttribute("content")
    : null;
  console.log(problemStatement);
  return problemStatement;
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_PROBLEM_DESCRIPTION") {
    const problemStatement = getProblemDescription();
    sendResponse({ problemStatement });
  }
});
