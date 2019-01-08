function injectScript(attrs) {
    var script = document.createElement('script');
    Object.entries(attrs).forEach(([name, value]) => { script.setAttribute(name, value); });
    document.head.appendChild(script);
};

function __set(key, value, json) { localStorage[key] = value };
__set("extensionId", chrome.runtime.id);
__set("rootUrl", chrome.runtime.getURL("/"));
__set("baseUrl", chrome.runtime.getURL("app"));
__set("server", (location.port) ? { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111", "26": "wa111", "16": "ku711" } [location.port] : location.host.split('.')[1]);
__set("pathname", location.pathname.split(".")[0].split("/").pop());
injectScript({ "src": chrome.runtime.getURL('lib/require/require.js'), "data-main": chrome.runtime.getURL('app/main.js') })







































/*
NEWS

//https://youtu.be/-Cr19IiuiMA
*/

//injectScript({ src: chrome.runtime.getURL(server + "/main.js"), })


/*
function injectScript(attrs) {
    var script = document.createElement('script');
    script.async = 1;
    script.onload = function() {
        //this.id = chrome.runtime.id;
        //console.log(this);
        //this.remove();
    };
    Object.entries(attrs).forEach(([name, value]) => { script.__setAttribute(name, value); });
    (document.head || document.documentElement).appendChild(script);
}*/














/*
$("head").append('<script type="module" src="./foo.js"></script>');
$("head").append('<script src="module" src="./foo.js"></script>');
*/

//<script type="module" src="./foo.js"></script>


//["chrome-extension://glimkfbjoipaecfannadijhmifilnooh/"]
//var c = ["chrome-extension:/", extensionId, "module", server].join("/");
//console.log(c);




//var server = { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111", "26": "wa111", "16": "ku711", "": location.host.split('.')[1] } [location.port];
/*
var rootUrl = chrome.runtime.getURL("/");
//var baseUrl = chrome.runtime.getURL(server);
var baseUrl = chrome.runtime.getURL("app");

var extensionId = chrome.runtime.id;


localStorage.extensionId = extensionId;
localStorage.server = server;
localStorage.rootUrl = rootUrl;
localStorage.baseUrl = baseUrl;
*/
//localStorage.baseUrl = chrome.runtime.getURL('/module/' + host);
/*

var pathname = location.pathname.split(".")[0].split("/").pop();
var server =

    { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111", "26": "wa111", "16": "ku711", "": location.host.split('.')[1] } [location.port];


*/























//console.log(localStorage.baseUrl);
//console.log(localStorage.baseUrl);



/*
chrome://flags/#enable-devtools-experiments
*/

//a09777511437@gmail.com




/*

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


//<!-- advanced __setup: using public CDN with local file fallback -->
/*
<script data-main="main" src="http://requirejs.org/docs/release/2.1.14/minified/require.js"></script>
<script>window.require || document.write('<script data-main="main" src="local/path/require.js"></script>')</script>
*/




//importScripts