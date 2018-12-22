var host = { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111", "26": "wa111", "16": "ku711", "": location.host.split('.')[1] } [location.port];



var getURL = chrome.runtime.getURL;

localStorage.baseUrl = getURL('/module/' + host);
localStorage.extensionId = chrome.runtime.id;
localStorage.host = host;



function injectScript(attrs) {
    var script = document.createElement('script');
    script.async = 1;
    script.onload = function() { this.remove(); };
    Object.entries(attrs).forEach(([name, value]) => { script.setAttribute(name, value); });
    (document.head || document.documentElement).appendChild(script);
}


document.onreadystatechange = function() {
    switch (document.readyState) {
        case "loading":
            break;
        case "interactive":
            injectScript({ "src": getURL('/lib/require/require.js'), "data-main": getURL('/module/app.config.js') })
            break;
        case "complete":
            break;
    }
}






















//injectScript({ "src": getURL("/module/prototype.js") });
//injectScript({ "src": getURL("/module/xmlSpider.js") });



/*
<script data-main="main" src="local/path/require.js"></script>
*/


//<!-- advanced setup: using public CDN with local file fallback -->
/*
<script data-main="main" src="http://requirejs.org/docs/release/2.1.14/minified/require.js"></script>
<script>window.require || document.write('<script data-main="main" src="local/path/require.js"></script>')</script>
*/




//importScripts