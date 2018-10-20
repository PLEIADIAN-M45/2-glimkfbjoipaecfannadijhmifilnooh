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

        //console.log(_hostname);

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
                    try {
                        postData.split('&').map((x) => {
                            return x.split('=');
                        }).map(function([name, value]) {
                            _postData[name] = value;
                        })
                    } catch (ex) {
                        _postData = postData;
                    }
                }
                //console.log(postData, method);
                break;
        }

        //console.log(this);

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


var debug = function(args) {
    console.log("[Debug]", args);
}

//var TEMPBSN = {}
//console.log(user);
var MemberStatus = {};


/*
var symbol2 = Symbol(42);
var symbol3 = Symbol(42);
console.log(symbol2);
console.log(symbol3);
console.log(symbol2 == symbol3);*/
//console.log(cv);
//TEMPBSN[cv.f_id] = cv.f_accounts;


var user_pastData = {};

function recorddb() {

    var { _lastPath, _postData, _params, _response, _responseText, _method } = this;

    /******************************************************************************/
    if (this.isEquel('GetDealTypeList')) {
        _response.Data.forEach(function(cv, i, arr) {
            this[cv.DealType] = cv.Description;
        }, DealType = {});
        localStorage["DealType"] = json(DealType);
        debug({ DealType });
    }
    if (this.isEquel('GetMemberStatusByLanguageCode')) {
        MemberStatus = _response.Data.ValueKey;
        localStorage["MemberStatus"] = json(MemberStatus);
        debug({ MemberStatus });
    }
    /******************************************************************************/
    if (this.isEquel('GetMemberRiskInfoAccountingBackendByAccountID')) { //取得進入頁面時的會員狀態        
        var object = _response.Data;
        user_pastData[object.AccountID] = object;
        debug({ user_pastData });
    }
    if (this.isEquel('UpdateMemberSNInfoBackend')) { //基本資料的「修改鍵」 通常用於停權
        var _pastData = user_pastData[_postData.AccountID];
        upload_888(_pastData, _postData);
    }
    if (this.isEquel('UpdateMemberRiskInfoAccountingBackend')) { //帐务相关的「修改鍵」 通常用於開通
        var _pastData = user_pastData[_postData.AccountID];
        upload_888(_pastData, _postData);
    }
    /******************************************************************************/

    if (this.isEquel('DepositBonus')) { //存款紅利列表
        try {
            sessionStorage.clear();
            var dataset = _response.rows;
            dataset.forEach(function(cv, idx, arr) {
                var key = cv['f_id'];
                this[key] = json(cv);
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
    }
    /******************************************************************************/
    //wa111 会员列表
    if (this.isEquel('GetMemberList') && _params.type == "getAllUser") {

        for (let row of _response.rows) {
            IDB[_lastPath].put(row).then(() => { console.log('IDB', _lastPath); });
        }
    }





    if (this.isEquel('MemberModify')) {
        if (_method == "POST") {

            var { action, wujiMarkID } = _postData;

            console.log(action);


            switch (action) {
                case "btnUserSet":
                    //console.log(_postData);
                    var { ishow, isOpenDeposit } = _postData;
                    console.log(ishow, isOpenDeposit);


                    break;
                case "getmodel":
                    //f_isDeposit:代表有無存過款
                    //f_depositStatus:代表存款開關
                    //f_Deposit

                    var { f_ishow, f_depositStatus, f_isDeposit } = _response;

                    console.log(_response);

                    console.log({ f_depositStatus });











                    /*  //console.log(_postData);

                      console.log(_response);

                      console.log(json(_response));*/


                    break;

                case "StopMember":
                    break;

            }




            /* if (_postData.action == "StopMember" && _postData.wujiMarkID != undefined) {
                 upload_2('停權表')
             }*/
        }
    }





    /*
    // var { action, warnMessage, accounts, wujiMarkID } = _postData;
            //還原 action=StopMember&warnMessage=undefined&accounts=F61539
    if (this.isEquel('MemberModify')) {
        //console.log(_postData);
        //console.log(_params);
        __params = {
            action: "GetMemberWarnTemp",
            type: "wujibeizhu"
        }

    }
    */








}






/*
http://host26.wa111.net/LoadData/AccountManagement/MemberModify.ashx
Request Method: POST
action: StopMember
warnMessage: 
accounts: F61539
wujiMarkID: 0
*/
//Request URL: http://127.0.0.1:26/LoadData/AccountManagement/MemberModify.ashx?action=GetMemberWarnTemp&type=wujibeizhu

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