/**
 * Call all your dependencies using the plugin
 */




var c = chrome.extension.getURL("Injector");


require([c], function(FM) {
  
    chrome.storage.local.get({ something });
});


/*
require(["Injector!myFancyModule"], function(FM) {
    chrome.storage.local.get({ something });
});


console.log(chrome.extension.getURL("Injector"));
*/