
 //https://developer.chrome.com/extensions/background_pages

 chrome.runtime.onInstalled.addListener(function() {
     chrome.contextMenus.create({
         "id": "sampleContextMenu",
         "title": "Sample Context Menu",
         "contexts": ["selection"]
     });
 });
/*
Invoking activeTab
The following user gestures enable activeTab:

Executing a browser action
Executing a page action
Executing a context menu item
Executing a keyboard shortcut from the commands API
Accepting a suggestion from the omnibox API
Content available under the CC-By 3.0 license
*/