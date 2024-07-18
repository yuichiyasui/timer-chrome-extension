chrome.action.onClicked.addListener((tab) => {
  if (typeof tab.id === "undefined") {
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id ?? chrome.tabs.TAB_ID_NONE, {
      action: "toggle",
    });
  });
});
