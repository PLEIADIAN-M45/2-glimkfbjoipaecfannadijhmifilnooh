var server = { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111", "26": "wa111", "16": "ku711", "": location.host.split('.')[1] } [location.port];
var rootUrl = chrome.runtime.getURL("/");
var baseUrl = chrome.runtime.getURL(server);
var extensionId = chrome.runtime.id;


localStorage.$extensionId = extensionId;
localStorage.$server = server;
localStorage.$rootUrl = rootUrl;
localStorage.$baseUrl = baseUrl;


//localStorage.baseUrl = chrome.runtime.getURL('/module/' + host);


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
    "src": chrome.runtime.getURL('lib/require/require.js'),
    "data-main": chrome.runtime.getURL('main.js')
})



//injectScript({ src: chrome.runtime.getURL(server + "/main.js"), })
















/*
$("head").append('<script type="module" src="./foo.js"></script>');
$("head").append('<script src="module" src="./foo.js"></script>');
*/

//<script type="module" src="./foo.js"></script>


//["chrome-extension://glimkfbjoipaecfannadijhmifilnooh/"]
//var c = ["chrome-extension:/", extensionId, "module", server].join("/");
//console.log(c);























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


//<!-- advanced setup: using public CDN with local file fallback -->
/*
<script data-main="main" src="http://requirejs.org/docs/release/2.1.14/minified/require.js"></script>
<script>window.require || document.write('<script data-main="main" src="local/path/require.js"></script>')</script>
*/




//importScripts