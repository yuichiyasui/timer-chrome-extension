chrome.action.onClicked.addListener((tab) => {
  if (typeof tab.id === "undefined") {
    return;
  }

  chrome.tabs.sendMessage(tab.id, { action: "toggle" });
});
