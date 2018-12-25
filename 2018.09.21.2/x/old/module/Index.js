define(['myApp', 'dexie'], function(myApp, Dexie) {
    switch (evo.host) {
        case "wa111":
            var _user = document.querySelector('.user-info').outerText;
            var operator = _user.split('\n')[1];
            var siteNumber = window.siteNumber;
            break;
        case "ku711":
            var siteNumber = "16";
            var operator = myApp.$scope.ctrl.resetModel.AccountID.toUpperCase();
            evo.sendMessage({ command: 'ajax-anti-forgery-token', value: evo.token });
            break;
    }
    //console.log(operator);
    localStorage['siteNumber'] = siteNumber;
    localStorage['operator'] = operator;

    //console.log(siteNumber);
    chrome.runtime.connect(evo.extensionId, { name: siteNumber })

});