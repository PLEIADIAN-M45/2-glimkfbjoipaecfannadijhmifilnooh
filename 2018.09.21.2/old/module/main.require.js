function initApplication() {
    var script = document.createElement('script');
    script.id = chrome.runtime.id
    script.src = chrome.runtime.getURL('/lib/require/require.js')
    script.dataset.main = chrome.runtime.getURL('/module/main.js')
    document.body.appendChild(script);
}

function s0() {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('injected.js');
    s.onload = function() {
        //console.log(this);
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}

s0()

document.onreadystatechange = function() {
    //console.log(document.readyState);
    switch (document.readyState) {
        case "interactive":
            // s0()
            break;
        case "complete":
            //s0()
            initApplication();
            break;
        default:
            // statements_def
            break;
    }
}