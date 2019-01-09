import utils from '/injector.js';


console.log(chrome.runtime.getURL("/test.html"));
window.open(chrome.runtime.getURL("/test.html"))

