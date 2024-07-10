chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id ?? chrome.tabs.TAB_ID_NONE },
    files: ["main.js"],
  });
});

console.log("Background script loaded");
