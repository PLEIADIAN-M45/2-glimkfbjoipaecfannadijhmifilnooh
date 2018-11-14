var host = { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111", "26": "wa111", "16": "ku711", "": location.host.split('.')[1] } [location.port];
var getURL = chrome.runtime.getURL;
localStorage.baseUrl = getURL('/module');
localStorage.chrome_runtime_id = chrome.runtime.id;
//localStorage.chrome_runtime_baseUrl = chrome.runtime.getURL('/');


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
            //mytest();
            break;
        case "interactive":
            //mytest();
            mytest();
            //injectScript({ "src": getURL('/lib/require/require.js'), "data-main": getURL('/module/main.js') })
            break;
        case "complete":
            //mytest();

            break;
    }
}


console.log(12);


//mytest();

function mytest() {

 
    injectScript({ "src": getURL('test.js') })
    //setTimeout(function() { console.log(window.angular); }, 2000)
}