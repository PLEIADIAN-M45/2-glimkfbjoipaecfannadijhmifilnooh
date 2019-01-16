chrome.tabs.create({ url: 'foo.html' })


console.log(chrome.tabs.create);




function keyboardEvent() {
    keydown
    keypress
    keyup
    //全局屏蔽键盘事件：
    window.onkeydown = function() {
        console.log(window.event.keyCode)
        if(window.event.keyCode == 49) {
            event.returnValue = false;
        }
    }
    //全局屏蔽鼠标右键：
    window.oncontextmenu = function() {
        console.log('点击了鼠标右键')
        event.returnValue = false;
    }
}


//chrome.runtime.connect
//laserExtensionId
//console.log(port);

var $sender;
var port = chrome.runtime.connect($extensionId);
port.postMessage('sender');
port.onMessage.addListener(function(res) {
    console.log(res);
    $sender = res;
});