function __injectScript(attrs) {
    var script = document.createElement('script');
    Object.entries(attrs).forEach(([name, value]) => { script.setAttribute(name, value); });
    document.head.appendChild(script);
};

function __set(key, value, json) { localStorage[key] = value };
__set("extensionId", chrome.runtime.id);
__set("rootUrl", chrome.runtime.getURL("/"));
__set("baseUrl", chrome.runtime.getURL("/"));
__set("server", (location.port) ? { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111", "26": "wa111", "16": "ku711" } [location.port] : location.host.split('.')[1]);
__injectScript({ "src": chrome.runtime.getURL('lib/require/require.js'), "data-main": chrome.runtime.getURL('/app/main.js') })