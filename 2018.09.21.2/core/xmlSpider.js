function json(str) { try { if (str.constructor.name == "Response") { return str.json() } if (typeof str == "object") { var res = JSON.stringify(str); } else { var res = JSON.parse(str); } } catch (ex) { var res = str; } return res; };




function jsonqs(str) {
    if (str.indexOf('?') == -1) { return undefined }
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

function $serializeQueryString22(querystring) {
    if (!querystring) { return }
    if (!querystring.includes('=')) { return }
    var result = {};
    querystring.split('&').forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return result;
}



function $serializeQueryString(_url) {
    var obj = {};
    if (_url.includes('?')) {
        _url.split('?')[1].split('&').map((x) => { return x.split('='); })
            .forEach(([name, value]) => { obj[name] = value; });
    }
    return obj;
}


function $toJson(str) {
    try {
        var obj = JSON.parse(str);
    } catch (ex) {
        var obj = str;
    }
    return obj;
}

function $fromJson(obj) {
    try {
        var str = JSON.stringify(obj);
    } catch (ex) {
        var str = obj;
    }
    return str;
}

;
(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
    else if (typeof define === 'function' && define.amd) define([], factory);
    else if (typeof exports === 'object') exports["xmlSpider"] = factory();
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

        //if (postData) { this.postData = $toJson(postData); }


        //console.log(postData, typeof postData);
        this.addEventListener('load', this.load);
        this.addEventListener('loadend', this.loadend);
        return send.apply(this, arguments);
    };
    xmlSpider.loadend = function() {};
    xmlSpider.load = function() {
        var { url, method, postData, response, responseText, responseType, responseURL, responseXML, readyState, status, statusText, timeout, withCredentials } = this;
        var { origin, host, hostname, pathname, port, search, searchParams } = new URL(responseURL);

        this.hostname = hostname.split('.')[1];
        this.hostname = location.port || hostname.split('.')[1];
        //hostname.split('.')[1];


        this.lastPath = pathname.split('/').pop().replace(/\.\w+/, '');

        switch (this.hostname) {
            case "wa111":
            case "26":
                if (this.method == "GET") {
                    this.sendData = $serializeQueryString(this.url);
                } else {
                    this.sendData = $serializeQueryString('?' + this.postData);
                }
                this.command = this.sendData.action || this.sendData.type;
                break;
            case "ku711":
            case "16":
                if (this.method == "GET") {
                    this.sendData = $serializeQueryString(this.url);
                } else {
                    this.sendData = $toJson(this.postData);
                }
                break;
        }

        //console.log(this);
        //console.log(this.sendData);

        this.respData = $toJson(this.responseText);
        this.responseJSON = $toJson(this.responseText);
        if (this.respData) {
            if (this.respData.Data) { if (this.respData.Data.Message == "更新成功") { this.success = true; } }
        }

        try {
            this.dataRows = this.respData.rows || this.respData.Data.Data;
        } catch (ex) {}



        Object.defineProperty(this, 'cacheBonusData', {
            get: function() {
                return $toJson(sessionStorage["cacheBonusData"])
            },
            set: function(value) {
                sessionStorage["cacheBonusData"] = $fromJson(value);
            }
        });
    }
    return xmlSpider;
});


//Spreadsheets.suspend(postData);
//Spreadsheets.suspended(postData);
//Spreadsheets.authorize(postData);
//Spreadsheets.authorization(postData);    
//Spreadsheets.suspension(postData);
//Spreadsheets.bonus(postData);


var Spreadsheets = {
    bonus: function(postData) {
        console.log(postData);
        alert('bonus')
    },
    authorize_wa111: function(pastData, postData) {
        pastData.f_ishow = Number(pastData.f_ishow);
        postData.f_ishow = Number(postData.f_ishow);
        pastData.f_depositStatus = Number(pastData.f_depositStatus);
        postData.f_depositStatus = Number(postData.f_depositStatus);
        console.log(pastData.f_ishow, postData.f_ishow);
        //console.log(pastData.f_depositStatus, postData.f_depositStatus);
        if (pastData.f_ishow == postData.f_ishow) { return }

        if (pastData.f_ishow == 3) {
            alert('審核 -> 開通表')
        } else {
            alert('其它轉停權=停權表')
            //其它轉停權=停權表
        }
        alert('authorize')
    },
    authorize_ku711: function(pastData, postData) {       
        if (pastData.MemberStatus == 3) {
            console.log(postData.MemberStatus);
            alert('審核 -> 開通表')
        } else {
            alert('其它轉停權=停權表')
        }
        /*var { MemberStatus, IsDeposit } = pastData;
        console.log({ MemberStatus, IsDeposit });
        var { MemberStatus, IsDeposit } = sendData;
        console.log({ MemberStatus, IsDeposit });*/
    },
    suspended: function() {
        alert('suspended')
    },
}

var $robot = {
    /*開通或停權*/
    StopMember: function() {
        //還原或停權
        if (this.respData == 1) { return };
        var pastData = $scope.user;
        var postData = { f_ishow: 2, f_depositStatus: 0 }
        Spreadsheets.authorize_wa111(pastData, postData);
    },
    getmodel: function() {
        var pastData = $scope.user;
        var postData = this.respData;
        Spreadsheets.authorize_wa111(pastData, postData);
    },


    /*開通或停權*/
    UpdateMemberSNInfoBackend: function() { //控制用户状态開關 //判斷一下是否執行成功 //這個動作用於 轉為停權
        var pastData = $scope.user;
        var postData = this.sendData;
        if (pastData.MemberStatus == postData.MemberStatus) { return }
        Spreadsheets.authorize_ku711(pastData, postData);
    },

    UpdateMemberRiskInfoAccountingBackend: function() { //控制存款開關
        if (this.success) {} else { return };
        var pastData = $scope.user;
        var postData = this.sendData;
        if (pastData.IsDeposit == postData.IsDeposit) { return }
        Spreadsheets.authorize_ku711(pastData, postData);
    },

    UpdateMemberRisksInfoBackendIsFSuspension: function() { //還原或停權
        if (this.success) {} else { return };
        if (this.sendData.IsFSuspension == false) { return };
        var pastData = $scope.user;
        var postData = { MemberStatus: 0, IsDeposit: 0 };
        Spreadsheets.authorize_ku711(pastData, postData);
    },

    //禮金表
    delDiceWinRecords: function() { /*用於刪除*/
        if (this.respData == 1) { this.cacheBonusData = this.sendData; }
    },
    DelDiceWinRecords: function() { /*用於給點*/
        if (this.respData == 1) { this.cacheBonusData = this.sendData; }
    },
    DepositBonus: function() {
        if (this.cacheBonusData) {
            var postData = this.dataRows.find((row) => { return row.f_id == this.cacheBonusData.id; });
            if (postData) {
                this.cacheBonusData = null;
                Spreadsheets.bonus(postData);
            }
        }
    },
    //禮金表
    UpdateMemberBonusLog: function() {
        if (this.success) {} else { return };
        this.cacheBonusData = this.sendData;
    },
    GetMemberBonusLogBackendByCondition: function() {
        if (this.cacheBonusData) {
            var postData = this.dataRows.find((row) => { return row.BonusNumber == this.cacheBonusData.BonusNumber; });
            if (postData) {
                this.cacheBonusData = null;
                Spreadsheets.bonus(postData);
            }
        }
    },
}


xmlSpider.loadend = function() {
    var robot = $robot[this.command];
    if (robot) { return robot.call(this); }
    var robot = $robot[this.lastPath];
    if (robot) { return robot.call(this); }
}




/*
return
if (this.respData.Data.Message == "更新成功") {

    var { MemberStatus, IsDeposit } = $scope.user;
    var pastData = {
        MemberStatus: Number(MemberStatus),
        IsDeposit: Number(IsDeposit)
    };
    var { MemberStatus, IsDeposit } = this.sendData;
    var sendData = {
        MemberStatus: Number(MemberStatus),
        IsDeposit: Number(IsDeposit)
    };

    if (sendData.MemberStatus !== pastData.MemberStatus) {
        Spreadsheets.authorize(sendData);
    }
}*/
//Spreadsheets.suspend(postData);
//Spreadsheets.suspended(postData);
//Spreadsheets.authorize(postData);
//Spreadsheets.authorization(postData);    
//Spreadsheets.suspension(postData);
//Spreadsheets.bonus(postData);
/*
       Object.entries(this.respData).map(([key, value]) => {
           var name = key.replace('f_', '');
           postData[name] = value;
       });*/
//console.log(pastData.f_ishow, pastData.f_depositStatus);
//console.log(postData.f_ishow, postData.f_depositStatus);


//console.log(postData);
//Spreadsheets.authorize_wa111(pastData, postData);

//開通的情況
//console.log(this);
//console.log(this.respData);
//console.log($scope.user);
//console.log($scope.user.ishow, $scope.user.isOpenDeposit);
//console.log(this.respData.f_ishow, this.respData.f_depositStatus);
/*var pastData = {
    MemberStatus: Number(MemberStatus),
    IsDeposit: Number(IsDeposit)
};

var { MemberStatus, IsDeposit } = this.sendData;
var sendData = {
    MemberStatus: Number(MemberStatus),
    IsDeposit: Number(IsDeposit)
};
*/
/*
Object.defineProperty(this, 'cacheBonusData', {
    get: function() {
        return $toJson(sessionStorage["cacheBonusData"])
    },
    set: function(value) {
        sessionStorage["cacheBonusData"] = $fromJson(value);
        if (typeof value == "string") {
            sessionStorage["cacheBonusData"] = value;
        } else {
            sessionStorage["cacheBonusData"] = $fromJson(value);
        }
    },
    get delete() {
        console.log(99999999);
        sessionStorage.removeItem["cacheBonusData"]
    }
});*/
//Object.defineProperty(o, 'b', { get: function() { return this.a + 1; } });


/*
define(['xmlSpider'], function(xmlSpider) {

});
*/


/*

        class CacheBonusData {

            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            get() {
                return 3
            }

            set() {

            }

            toString() {
                return '(' + this.x + ', ' + this.y + ')';
            }

            delete() {
                console.log(99999999);
                sessionStorage.removeItem["cacheBonusData"]
            }
        }
        this.cacheBonusData = new CacheBonusData();

        console.log(this.cacheBonusData);

*/