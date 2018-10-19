function webNavigation_callback(details) {
    console.log(details);
};

chrome.webNavigation.onHistoryStateUpdated.addListener(webNavigation_callback)

console.log(123);