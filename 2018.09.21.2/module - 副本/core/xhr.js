var json = function(str) { try { if (str.constructor.name == "Response") { return str.json() } if (typeof str == "object") { var res = JSON.stringify(str); } else { var res = JSON.parse(str); } } catch (ex) { var res = str; } return res; };

;
(function webpackUniversalModuleDefinition(root, factory) { if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
    else if (typeof define === 'function' && define.amd) define([], factory);
    else if (typeof exports === 'object') exports["xml"] = factory();
    else root["xml"] = factory(); })(this, function() {
    /**************************************************************************/
    var { open, send, setRequestHeader } = XHR = XMLHttpRequest.prototype;
    //this.getAllResponseHeaders
    XHR.setRequestHeader = function(name, value) {
        this.command = 'XMLHttpRequest';
        this._headers = {};
        this._headers[name] = value;
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
        var { url, method, postData, response, responseText, responseType, responseURL, responseXML, readyState, status, statusText, timeout, withCredentials } = this;
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
                        postData.split('&').map((x) => { return x.split('='); }).map(function([name, value]) {
                            _postData[name] = value;
                        })
                    } catch (ex) {
                        _postData = postData;
                    }
                }
                break;
        }
        Object.assign(this, { _hostname, _lastPath, _response, _params, _postData, _method, _responseText, query });
        recorddb.apply(this);
    }
    return XHR;
});

var MemberStatus = {};
var user_pastData = {};

function recorddb() {
    var { _lastPath, _postData, _params, _response, _responseText, _method } = this;
    /******************************************************************************/
    if (this.isEquel('GetMemberRiskInfoAccountingBackendByAccountID')) { //取得進入頁面時的會員狀態
        var object = _response.Data;
        user_pastData[object.AccountID] = object;
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
                this[cv.f_id] = json(cv);
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
    }
    if (this.isEquel('DelDiceWinRecords')) {
        var command = 'evo.statistics.m3';
        var account = json(sessionStorage[_params.id]).f_accounts;
        assign(_params, { command, account });
        upload_3(_params);
    }
    /******************************************************************************/
    if (this.isEquel('MemberModify')) {
        var { action, ishow, isOpenDeposit, wujiMarkID } = _postData;
        var { f_ishow, f_depositStatus } = _response;
        switch (action) {
            case "btnUserSet":
                if (_response == "u-ok") {
                    var pastData = evo.pastData;
                    var postData = { ishow: 1, isOpenDeposit: 1 }
                    upload_111(pastData, postData);
                }
                break;
            case "StopMember":
                if (_postData.wujiMarkID !== undefined) {
                    var pastData = evo.pastData;
                    var postData = { ishow: 2, isOpenDeposit: 0 }
                    upload_111(pastData, postData);
                }
                break;

        }
    }

    /******************************************************************************/
    if (this.isEquel('GetDealTypeList')) {
        _response.Data.forEach(function(cv, i, arr) {
            this[cv.DealType] = cv.Description;
        }, DealType = {});
        localStorage["DealType"] = json(DealType);
    }
    if (this.isEquel('GetMemberStatusByLanguageCode')) {
        MemberStatus = _response.Data.ValueKey;
        localStorage["MemberStatus"] = json(MemberStatus);
    }
}