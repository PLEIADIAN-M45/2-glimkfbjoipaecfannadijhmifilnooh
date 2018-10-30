var getURL = chrome.runtime.getURL;
localStorage.baseUrl = getURL('module/');

localStorage.chrome_runtime_id = chrome.runtime.id;
localStorage.chrome_runtime_baseUrl = chrome.runtime.getURL('/');


function injectScript(attrs) {
    var script = document.createElement('script');
    script.async = 1;
    script.onload = function() { this.remove(); };
    Object.entries(attrs).forEach(([name, value]) => { script.setAttribute(name, value); });
    (document.head || document.documentElement).appendChild(script);
}



injectScript({ "src": getURL("/core/xmlSpider.js") });

document.onreadystatechange = function() {
    switch (document.readyState) {
        case "loading":
            break;
        case "interactive":
            injectScript({ "src": getURL('/lib/require/require.js'), "data-main": getURL('/module/main.js') })
            break;
        case "complete":
            break;
    }
}