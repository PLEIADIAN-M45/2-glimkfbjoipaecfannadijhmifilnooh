var host = (location.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [location.port] : location.host.split(".")[1];
localStorage.host = host;
localStorage.extensionId = chrome.runtime.id;
localStorage.baseUrl = chrome.runtime.getURL('/module/' + host);

function injectScript(attrs) {
    var script = document.createElement('script');
    script.async = 1;
    script.onload = function() {
        this.id = chrome.runtime.id;
        //console.log(this);
        //this.remove();
    };

    Object.entries(attrs).forEach(([name, value]) => { script.setAttribute(name, value); });
    (document.head || document.documentElement).appendChild(script);
}



injectScript({
    "src": chrome.runtime.getURL('/lib/require/require.js'),
    "data-main": chrome.runtime.getURL('/module/app.js')
})






/*
var host = {
    "6326": "wa111",
    "6335": "wa111",
    "6317": "wa111",
    "6302": "wa111",
    "8876": "wa111",
    "26": "wa111",
    "16": "ku711",
    "": location.host.split('.')[1]
} [location.port];
*/

/*
var getURL = chrome.runtime.getURL;
localStorage.baseUrl = getURL('/module/' + host);
localStorage.extensionId = chrome.runtime.id;
localStorage.host = host;
*/






/*
document.onreadystatechange = function() {
    switch (document.readyState) {
        case "loading":
            break;
        case "interactive":
            break;
        case "complete":
            break;
    }
}
*/




/*
var head = document.getElementsByTagName('head')[0],
    script = document.createElement('script');

script.src = url;
head.appendChild(script);
*/
















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