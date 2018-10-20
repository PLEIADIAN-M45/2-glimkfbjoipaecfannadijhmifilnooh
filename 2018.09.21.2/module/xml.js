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


console.log(11111, 2222222222);

var TEMPBSN = {}
var user = {}
//console.log(user);
var MemberStatus = {};

function recorddb() {

    var { _lastPath, _postData, _params, _response, _responseText } = this;
    //console.log(user);
    // console.log(_lastPath, _postData, _params);
    ///Member/api/Bonus/GetMemberBonusLogBackendByCondition

    if (this.isEquel('CreateMemberInfoOperationLog--')) { //CreateMemberInfoOperationLog
        //用建立log 來判別剛才的動作
        //只發生在 [存款開關時]
        //{"Operated":"shengcai2","OperateType":3,"DataID":"shengcai2","Content":[{"FieldName":"IsDeposit","FieldDisplayName":"存款","BeforeValue":false,"BeforeName":"关闭","AfterValue":true,"AfterName":"开启"},{"FieldName":"MemberStatus","FieldDisplayName":"用户状态","BeforeValue":3,"BeforeName":"審核中","AfterValue":1,"AfterName":"正常户"}]}
        //"FieldName":"IsDeposit","FieldDisplayName":"存款","BeforeValue":false,"BeforeName":"关闭","AfterValue":true,"AfterName":"开启"}
        //console.log(_postData);
        var content = _postData.Content;
        var type = _postData.OperateType;
        console.log(json(_postData));
        console.log(type);
        console.log(content);
        content.map(({ FieldName, FieldDisplayName, BeforeName, BeforeValue, AfterName, AfterValue }) => {
            console.log(FieldName, FieldDisplayName, BeforeName, BeforeValue, AfterName, AfterValue);
            if (FieldName == 'MemberStatus' && BeforeValue == 3) {
                upload_5(_postData);
            }
        })
        alert(333)
        /*console.log(_responseText);
        sessionStorage[_postData.Operated] = json(_postData);
       */
    }



    if (this.isEquel('GetMemberRiskInfoAccountingBackendByAccountID')) {
        //取得進入頁面時的會員狀態
        var { AccountID } = object = _response.Data;
        //console.log(object);
        console.log(object.AccountID, object.MemberStatus, object.IsDeposit);

        user[AccountID] = object;
    }


    if (this.isEquel('GetDealTypeList')) {
        //console.log(_response);
        //var DealType
    }


    if (this.isEquel('GetMemberStatusByLanguageCode')) {
        MemberStatus = _response.Data.ValueKey;
        localStorage.MemberStatus = json(MemberStatus)
    }




    if (this.isEquel('UpdateMemberRiskInfoAccountingBackend')) {
        var _pastData = user[_postData.AccountID];
        upload_888(_pastData, _postData, MemberStatus)
        return
        //發生在按下 帐务相关 的「修改鍵」->接著引發 UpdateMemberSNInfoBackend
        //打開存款 審核中 會轉正常戶
        var _pastData = user[_postData.AccountID];
        // console.log(_postData);
        //console.log(_pastData);
        //console.log(_pastData.IsDeposit, _postData.IsDeposit);
        console.log(_pastData.MemberStatus, _postData.MemberStatus);

        evo.user.timer.push(evo.now);
        evo.user.status = [_pastData.MemberStatus, _postData.MemberStatus];
        evo.user.deposit = [_pastData.IsDeposit, _postData.IsDeposit];

        if (_pastData.MemberStatus !== _postData.MemberStatus) {
            if (_pastData.MemberStatus == 3) { //開通表 審核轉開通 審核轉停權
                upload_1(evo.user);
            } else { //停權表
                upload_2(evo.user);
            }
        }


        alert(88888)

        /*console.log(_pastData.IsDeposit, _postData.IsDeposit);
        console.log(_pastData.MemberStatus, _postData.MemberStatus);
        console.log(evo.user);
        console.log(_response);*/
    }


    if (this.isEquel('UpdateMemberSNInfoBackend')) {
        var _pastData = user[_postData.AccountID];
        upload_888(_pastData, _postData, MemberStatus)
        return
        console.log(_pastData.MemberStatus, _postData.MemberStatus);
        evo.user.timer.push(evo.now);
        evo.user.status = [_pastData.MemberStatus, _postData.MemberStatus];
        evo.user.deposit = [_pastData.IsDeposit, _postData.IsDeposit];
        if (_pastData.MemberStatus !== _postData.MemberStatus) {
            if (_pastData.MemberStatus == 3) { //開通表 審核轉開通 審核轉停權
                upload_1(evo.user);
            } else { //停權表
                upload_2(evo.user);
            }
        }
        alert(2)
        return
        console.clear();
        //審核中轉停權 //發生在按下 基本資料的「修改鍵」 或 帐务相关 的「修改鍵」->接著引發 UpdateMemberSNInfoBackend
        var _pastData = user[_postData.AccountID];
        //console.log(json(_postData));
        console.log(_pastData.IsDeposit, _postData.IsDeposit);
        // console.log(_pastData.MemberStatus, _postData.MemberStatus);
        evo.user.timer.push(evo.now);
        evo.user.status = [_pastData.MemberStatus, _postData.MemberStatus];
        evo.user.deposit = [_pastData.IsDeposit, _postData.IsDeposit];

        if (_pastData.MemberStatus !== _postData.MemberStatus) {

            if (_pastData.MemberStatus == 3) {
                //開通表 審核轉開通 審核轉停權
                upload_1(_postData);
            } else {
                //停權表
                upload_2(_postData);
            }
        }

    }


    //console.log(evo.user);
    //console.log(_response);
    //審核轉正常 "AccountID":"steved"   3->1
    //審核轉停權 "AccountID":"dsjkf228" 3->0


    /*
    var { IsDeposit, AccountID, MemberStatus, AccountName } = _postData;
    var _pastData = user[AccountID];
    var { IsDeposit, AccountID, MemberStatus, AccountName } = _pastData;
    */


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