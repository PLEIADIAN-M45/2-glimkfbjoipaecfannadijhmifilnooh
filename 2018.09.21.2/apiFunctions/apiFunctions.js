var host = { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" };

var apiFunctions = {};

apiFunctions.banker = function() { return Promise.resolve(this.region); }
apiFunctions.author = function() { var region = {}; return Promise.resolve({ region }); }
apiFunctions.localStorage = function() { return Promise.resolve(window.localStorage); }


console.log(apiFunctions);












/*
var action = this.sendData.action || this.sendData.type;
switch (action) {
    case "StopMember":
        var params = { account: "JIABO1006", channel: "26" }
        if(this.respData == 1) { return };
        var pastData = await apiFunctions.store.user.get.call({ params });
        var postData = { f_ishow: 2, f_depositStatus: 0 };
        console.log(var1, var2);
        console.log(this.respData);
        break;
    default:
        break;
}*/