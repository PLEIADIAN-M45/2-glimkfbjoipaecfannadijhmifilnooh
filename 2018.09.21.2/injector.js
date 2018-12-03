var host = { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111", "26": "wa111", "16": "ku711", "": location.host.split('.')[1] } [location.port];
var getURL = chrome.runtime.getURL;

localStorage.baseUrl = getURL('/module');
localStorage.extensionId = chrome.runtime.id;
localStorage.host = host;

console.log(host);

//localStorage.chrome_runtime_baseUrl = chrome.runtime.getURL('/');


function injectScript(attrs) {
    var script = document.createElement('script');
    script.async = 1;
    script.onload = function() { this.remove(); };
    Object.entries(attrs).forEach(([name, value]) => { script.setAttribute(name, value); });
    (document.head || document.documentElement).appendChild(script);
}


injectScript({ "src": getURL("/module/xmlSpider.js") });
document.onreadystatechange = function() {
    switch (document.readyState) {
        case "loading":
            break;
        case "interactive":
            injectScript({ "src": getURL('/lib/require/require.js'), "data-main": getURL('/module/main.js') })
            //injectScript({ "src": getURL('project/scripts/require.js'), "data-main": getURL('project/scripts/main.js') })
            break;
        case "complete":
            break;
    }
}