var dexie = new Dexie('evo');
dexie.version(5).stores({ user: 'unique', GB2260: 'code' });

var apis = { dexie, baseUrl: {} };

apis.getLocalStorage = function(params) { return Promise.resolve(window.localStorage); };
apis.getUser = function(params) { return dexie.user.get(params); };
apis.putUser = function(params) { return dexie.user.put(params); };
apis.delUser = function(params) { return dexie.user.delete(params); };
apis.sendSms = function(params) {
    var content = global.sms.get(Number(params.channel)) || global.sms.get(params.channel);
    var mobile = "86" + params.mobile.value;
    return $.ajax({
        url: 'http://client.motosms.com/smsc/smssend',
        dataType: "html",
        method: 'post',
        data: { sender: '', phones: mobile, smscontent: content, taskType: 1, taskTime: '', batch: 1, splittime: 0, packid: '' }
    }).then((res) => {
        var setsms;
        if (res.match(/(msg = '')/)) { setsms = 200; }
        if (res.match(/(會員登錄)/)) { setsms = 401; }
        if (res.match(/(msg = '101')/)) { setsms = 101; }
        if (res.match(/(msg = '102')/)) { setsms = 102; }
        params.setsms = setsms;
        return apis.putUser(params);
    });
};

