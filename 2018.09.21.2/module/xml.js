var json = function(str) { try { if (typeof str == "object") { var res = JSON.stringify(str); } else { var res = JSON.parse(str); } } catch (ex) { var res = str; } return res; }

;
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["xml"] = factory();
    else
        root["xml"] = factory();
})(this, function() {
    /**************************************************************************/
    var { open, send, setRequestHeader } = XHR = XMLHttpRequest.prototype;
    //this.getAllResponseHeaders
    XHR.setRequestHeader = function(name, value) {
        this.command = 'XMLHttpRequest';
        this._headers = {};
        this._headers[name] = value;
        localStorage[name] = value;
        return setRequestHeader.apply(this, arguments);
    };
    XHR.open = function(method, url, async, user, password) {
        this.url = url;
        this.async = async;
        this.method = method;
        return open.apply(this, arguments);
    };
    XHR.send = function(postData) {
        this.postData = postData;
        this.addEventListener('load', this._load);
        this.addEventListener('loadend', this._loadend);
        return send.apply(this, arguments);
    };

    XHR._loadend = function() {};

    XHR._load = function() {
        var {
            url,
            method,
            postData,
            response,
            responseText,
            responseType,
            responseURL,
            responseXML,
            readyState,
            status,
            statusText,
            timeout,
            withCredentials
        } = this;
        /*************************************************************************************************/
        var { origin, host, hostname, pathname, port, search, searchParams } = new URL(responseURL);
        var _hostname = hostname.split('.')[1];
        var _lastPath = pathname.split('/').pop().replace(/\.\w+/, '');
        var _response = json(response);
        var _responseText = responseText;
        var _method = method;
        var _params = {};
        var _postData = {};

        var query = searchParams;
        this.isEquel = function(pathString) {
            var reg = new RegExp('^' + this._lastPath + '$', 'i');
            //console.log(pathString, reg);
            return pathString.match(reg);
        }

        switch (method) {
            case 'GET':
                [...searchParams.entries()].map(function([name, value]) { return this[name] = value; }, _params);
                break;
            case 'POST':
                if (postData && postData.indexOf('{') == 0) {
                    _postData = json(postData);
                } else {
                    _postData = postData;
                }
                //console.log(postData, method);
                break;
        }

        Object.assign(this, { _hostname, _lastPath, _response, _params, _postData, _method, _responseText, query });

        //chrome.runtime.sendMessage('glimkfbjoipaecfannadijhmifilnooh', this, function(d) {});

        recorddb.apply(this);
    }
    return XHR;
});

var IDB = new Dexie('evo');
IDB.version(1.0).stores({
    GetMemberList: 'f_accounts',
    DepositBonus: 'f_id',
    GetSystemLog: 'f_id',
    GetMemberBonusLogBackendByCondition: 'BonusNumber'
}).upgrade(trans => { console.log(trans); });



var TEMPBSN = {}

function recorddb() {
    var { _lastPath, _postData, _params, _response, _responseText } = this;

    // console.log(_lastPath, _postData, _params);











    /******************************************************************************/

    if (this.isEquel('DepositBonus')) { //存款紅利列表
        try {
            sessionStorage.clear();
            var dataset = _response.rows;
            dataset.forEach(function(cv, idx, arr) {
                var key = cv['f_id'];
                this[key] = json(cv);
                //console.log(cv);
                TEMPBSN[cv.f_id] = cv.f_accounts;
            }, sessionStorage);
        } catch (ex) {}
    }

    if (this.isEquel('GetMemberBonusLogBackendByCondition')) { //存款紅利列表
        if (_postData.RecordCounts == 20) { sessionStorage.clear(); }
        try {
            var dataset = _response.Data.Data;
            dataset.forEach(function(cv, idx, arr) {
                var key = cv['BonusNumber'];
                this[key] = json(cv);
            }, sessionStorage);
        } catch (ex) {}
    }



    if (this.isEquel('UpdateMemberBonusLog')) {
        _postData.command = 'evo.statistics.m4';
        
        upload_3(_postData);
        upload_4_test(_postData);
    }


    if (this.isEquel('DelDiceWinRecords')) {

        var command = 'evo.statistics.m3';
        var account = json(sessionStorage[_params.id]).f_accounts;
        assign(_params, { command, account });

        //console.log(_params);

        upload_3(_params);
        upload_3_test(_params);


        //console.log(TEMPBSN[_params.id]);



        /*
                entries(_params).map(([name, value]) => {
                    //console.log(name, value);
                    console.log(this);

                })*/




        //_params.f_accounts = ss.f_accounts;
        /*console.log(_params);
        console.log(entries(_params))
        */



        return

    }



    //wa111 会员列表
    if (this.isEquel('GetMemberList') && _params.type == "getAllUser") {
        for (let row of _response.rows) {
            IDB[_lastPath].put(row).then(() => { console.log('IDB', _lastPath); });
        }
    }


}


/*
開通
停權
禮金
*/

function upload_3_test(postData) {
    evo.test = 1;

    if (evo.test) {
        setTimeout(function() {
            var log = json(sessionStorage[postData.id]);
            assign(log, postData, {
                f_AdminName: evo.operator,
                f_AuditTime: evo.now,
                f_del: Number(postData.pas == 1),
                f_Audit: Number(postData.pas == 3)
            })
            sessionStorage[postData.id] = json(log);
        }, 3000)
    }
}


function upload_4_test(postData) {
    evo.test = 1;
    console.log(evo.operator);
    if (evo.test) {
        setTimeout(function() {
            var log = json(sessionStorage[postData.BonusNumber]);
            assign(log, postData, { AdjustTime: evo.now, Creator: evo.operator })
            sessionStorage[postData.BonusNumber] = json(log);
        }, 1000)
    }
}

/*
{
    "f_id": 1674254,
    "f_accounts": "JIABO1006",
    "f_time": "2018-10-16 17:14:07",
    "f_date": "2018-10-16 17:28:17",
    "f_parentAgent": "",
    "f_remittanceName": "",
    "f_bill": "",
    "f_WinCount": 0,
    "f_Money": 40,
    "f_BeforeMoney": 180,
    "f_AfterMoney": 220,
    "f_AdminName": "18CS569",
    "f_ip": null,
    "f_Audit": 0,
    "f_AuditTime:"
    ","
    f_del ":0,"
    f_type ":15,"
    f_unfreezeWater ":200,"
    f_remark ":"
    ","
    f_content ":"
    ","
    f_billDate ":null,"
    f_accountType ":0,"
    f_pointType ":0,"
    f_countAll ":0,"
    f_moneyAll ":0,"
    f_tMoney ":0,"
    f_residualcredit ":0,"
    f_errorIp ":0,"
    f_groupName ":null,"
    HasChanged ":false,"
    IsNew ":true}
*/
/*


Array.prototype.each = function(callback, keyname) {
    this.forEach((currentValue, array, index) => {
        callback(currentValue[keyname], currentValue, index)
    });
}
*/





//DealType 1:处理中 2:成功 3:已删除


/*
GetMemberList.ashx
GetMemberSNInfoBackendWithExtraInfo
------------------------------------------
GetSystemLog.ashx
GetMemberInfoOperationLogByMultiAccountID
------------------------------------------
DepositBonus.ashx
GetMemberBonusLogBackendByCondition
------------------------------------------
------------------------------------------
*/

var IDBMAP = {
    DepositBonus: 'DepositBonus',
    GetMemberBonusLogBackendByCondition: 'DepositBonus'
}
/*
if (postData) {
    //console.log(_hostname);
    if (_hostname == 'ku711') {
        console.log(postData);
        _postData = json(postData);
    }
    if (_hostname == 'wa111') {
        console.log(postData);
        //_postData = json(postData);
    }

}*/

/*
if (postData.indexOf('&')) {
    var searchParams = new URLSearchParams(postData);
    [...searchParams.entries()].map(function([name, value]) { return this[name] = value; }, _postData);
} else {
    _postData = json(postData);
}
*/