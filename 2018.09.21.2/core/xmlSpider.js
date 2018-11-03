function json(str) { try { if(str.constructor.name == "Response") { return str.json() } if(typeof str == "object") { var res = JSON.stringify(str); } else { var res = JSON.parse(str); } } catch (ex) { var res = str; } return res; };

function jsonqs(str) {
    if(str.indexOf('?') == -1) { return undefined }
    try {
        var result = {};
        str.split('?')[1].split('&').forEach((pair) => {
            var [name, value] = pair.split('=');
            result[name] = value;
        });
        return result;
    } catch (ex) {
        return undefined;
    }
};


function $serializeQueryString(querystring) {
    if(!querystring) { return }
    if(!querystring.includes('=')) { return }
    var result = {};
    querystring.split('&').forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return result;
}


;
(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object') module.exports = factory();
    else if(typeof define === 'function' && define.amd) define([], factory);
    else if(typeof exports === 'object') exports["xmlSpider"] = factory();
    else root["xmlSpider"] = factory();
})(this, function() {
    var { send, open, setRequestHeader } = XMLHttpRequest.prototype;
    var xmlSpider = XMLHttpRequest.prototype;
    xmlSpider.setRequestHeader = function(name, value) {
        return setRequestHeader.apply(this, arguments);
    };
    xmlSpider.open = function(method, url, async, user, password) {
        Object.assign(this, { method, url, async, user, password });
        return open.apply(this, arguments);
    };
    xmlSpider.send = function(postData) {
        this.postData = postData;
        this.addEventListener('load', this.load);
        this.addEventListener('loadend', this.loadend);
        return send.apply(this, arguments);
    };
    xmlSpider.loadend = function() {};
    xmlSpider.load = function() {
        var { url, method, postData, response, responseText, responseType, responseURL, responseXML, readyState, status, statusText, timeout, withCredentials } = this;
        var { origin, host, hostname, pathname, port, search, searchParams } = new URL(responseURL);
        this.hostname = hostname.split('.')[1];
        this.lastPath = pathname.split('/').pop().replace(/\.\w+/, '');
        this.params = jsonqs(responseURL);
        //console.log(method);
        //console.log(this.lastPath, this.postData);
        if(method == "POST") {

            this.postData = $serializeQueryString(postData) || json(postData);
            //this.postData = json(postData);
            //console.log(this.postData2);
        }

        //this.resp = json(response);
        this.respData = json(response);


        try {
            this.dataRows = this.respData.rows || this.respData.Data.Data;
            //console.log('%c' + this.lastPath, 'color:Gold;', this.rows);
            //this.resp = resp.rows || resp.Data.Data;
        } catch (ex) {
            //console.log(this.lastPath, response);
        }

        //console.log(this.resp);

        // console.log(this.rows);
    }
    return xmlSpider;
});







var MemberStatus = {};
var user_pastData = {};

function recorddb() {
    var { _lastPath, _postData, _params, _response, _responseText, _method } = this;
    /******************************************************************************/
    if(this.isEquel('GetMemberRiskInfoAccountingBackendByAccountID')) { //取得進入頁面時的會員狀態
        var object = _response.Data;
        user_pastData[object.AccountID] = object;
    }
    if(this.isEquel('UpdateMemberSNInfoBackend')) { //基本資料的「修改鍵」 通常用於停權
        var _pastData = user_pastData[_postData.AccountID];
        upload_888(_pastData, _postData);
    }
    if(this.isEquel('UpdateMemberRiskInfoAccountingBackend')) { //帐务相关的「修改鍵」 通常用於開通
        var _pastData = user_pastData[_postData.AccountID];
        upload_888(_pastData, _postData);
    }
    /******************************************************************************/
    if(this.isEquel('DepositBonus')) { //存款紅利列表
        try {
            sessionStorage.clear();
            var dataset = _response.rows;
            dataset.forEach(function(cv, idx, arr) {
                this[cv.f_id] = json(cv);
            }, sessionStorage);
        } catch (ex) {}
    }
    if(this.isEquel('GetMemberBonusLogBackendByCondition')) { //存款紅利列表
        if(_postData.RecordCounts == 20) { sessionStorage.clear(); }
        try {
            var dataset = _response.Data.Data;
            dataset.forEach(function(cv, idx, arr) {
                var key = cv['BonusNumber'];
                this[key] = json(cv);
            }, sessionStorage);
        } catch (ex) {}
    }
    if(this.isEquel('UpdateMemberBonusLog')) {
        _postData.command = 'evo.statistics.m4';
        upload_3(_postData);
    }
    if(this.isEquel('DelDiceWinRecords')) {
        var command = 'evo.statistics.m3';
        var account = json(sessionStorage[_params.id]).f_accounts;
        assign(_params, { command, account });
        upload_3(_params);
    }
    /******************************************************************************/
    if(this.isEquel('MemberModify')) {
        var { action, ishow, isOpenDeposit, wujiMarkID } = _postData;
        var { f_ishow, f_depositStatus } = _response;

        switch (action) {
            case "btnUserSet":
                if(_response == "u-ok") {
                    var pastData = evo.pastData;
                    var postData = { ishow: 1, isOpenDeposit: 1 }
                    upload_111(pastData, postData);
                }
                break;
            case "StopMember":
                if(_postData.wujiMarkID !== undefined) {
                    var pastData = evo.pastData;
                    var postData = { ishow: 2, isOpenDeposit: 0 }
                    upload_111(pastData, postData);
                }
                break;

        }
    }

    /******************************************************************************/
    if(this.isEquel('GetDealTypeList')) {
        _response.Data.forEach(function(cv, i, arr) {
            this[cv.DealType] = cv.Description;
        }, DealType = {});
        localStorage["DealType"] = json(DealType);
    }
    if(this.isEquel('GetMemberStatusByLanguageCode')) {
        MemberStatus = _response.Data.ValueKey;
        localStorage["MemberStatus"] = json(MemberStatus);
    }
}

















//var query = searchParams;

//try {} catch (ex) {}

/*
this.isEquel = function(pathString) {
    var reg = new RegExp('^' + this.lastPath + '$', 'i');
    return pathString.match(reg);
}*/


/*
switch (method) {
    case 'GET':
        [...searchParams.entries()].map(function([name, value]) { return this[name] = value; }, params);
        break;
    case 'POST':
        if (postData && postData.indexOf('{') == 0) {
            postData = json(postData);

        } else {
            try {
                postData.split('&').map((x) => { return x.split('='); }).map(function([name, value]) {
                    postData[name] = value;
                })
            } catch (ex) {
                postData = postData;
            }
        }
        break;
}*/

//Object.assign(this, { hostname, lastPath, method });
//recorddb.apply(this);