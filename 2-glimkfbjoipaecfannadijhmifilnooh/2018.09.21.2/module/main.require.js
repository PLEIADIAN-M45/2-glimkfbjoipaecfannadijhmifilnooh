function s0() {
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('/module/xml.js');
   // console.log('xml');

    s.onload = function() { this.remove(); };
    (document.head || document.documentElement).appendChild(s);
};




function s1() {
    var s = document.createElement('script');
    s.id = chrome.runtime.id;
    s.src = chrome.runtime.getURL('/lib/require/require.js');
    s.dataset.main = chrome.runtime.getURL('/module/main.js');
    (document.head || document.documentElement).appendChild(s);
}

function s3() {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('/lib/jquery/dexie.min.js');
    s.onload = function() {
       // console.log('dexie');
        s0();
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
};





s3();

document.onreadystatechange = function() {
    switch (document.readyState) {
        case "loading":
            break;
        case "interactive":
            s1();
            break;
        case "complete":
            break;
    }
}








/*
console.log(chrome.extension);
console.log(chrome.runtime);
*/
/*

function s3() {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('/lib/jquery/dexie.min.js');
    s.onload = function() {
        //console.log('dexie');
        s0();
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
};


function s4() {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL('/module/records.js');
    s.onload = function() {
        //console.log('records');
        s0();
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
};
*/










//console.log((document.readyState));



/*

window.onload = function() {
  var iframe = document.createElement('iframe');
  iframe.src = chrome.runtime.getURL("iframe.htm");
  document.body.appendChild(iframe);
};


var injectScript = (function() {
    var relative = document.getElementsByTagName('script')[0];

    return function(src, callback) {
        var script = document.createElement('script');
        script.async = 1;
        script.src = src;
        if (callback) script.onload = callback.call(script);
        relative.parentNode.insertBefore(script, relative);
        return script;
    }
})();


injectScript('http://some-site.disqus.com/embed.js', function() {
    // optional callback
});
*/