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
        this.hostname = location.port;
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
                //console.log(this.sendData);

                //console.log(this.command);

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


var $robot = {
    getAllUser: function() {
        this.dataRows.forEach((row, index) => {
            //console.log(row);
            evo.store.user.put(row);
        });
    },
    StopMember: function() {
        //審核轉停權 或 正常轉停權
        console.log(this);
        console.log(this.sendData);
        console.log(this.respData);
        //this.respData==1 //還原
        //this.respData==0 //停權
    },
    getmodel: function() {
        //開通的情況
        //console.log(this);
        console.log(this.respData);
        //console.log($scope.user);
        console.log($scope.user.ishow, $scope.user.isOpenDeposit);
        console.log(this.respData.f_ishow, this.respData.f_depositStatus);
    },
    DelDiceWinRecords: function() {
        if (this.respData == 1) { this.cacheBonusData = this.sendData; }
    },
    DepositBonus: function() {
        if (this.cacheBonusData) {
            var postData = this.dataRows.find((row) => {
                return row.f_id == this.cacheBonusData.id;
            });
            //Spreadsheets.DepositBonus(postData);
        }
    },



    UpdateMemberBonusLog: function() {
        if (this.respData.Data.Message == "更新成功") {
            console.log(this.sendData);
            this.cacheBonusData = this.sendData;
            console.log(this.sendData);
            
        }
    },

    GetMemberBonusLogBackendByCondition: function() {
        if (this.cacheBonusData) {
            console.log(1);
            var postData = this.dataRows.find((row) => {
                return row.BonusNumber == this.cacheBonusData.BonusNumber;
            });
            if (postData) {
                console.log(postData);
                this.cacheBonusData = null;
                //Spreadsheets.DepositBonus(postData);
            }
        }
    },





}


xmlSpider.loadend = function() {

    var robot = $robot[this.command];
    if (robot) {
        //console.log(this.command);
        return robot.call(this);
    }
    var robot = $robot[this.lastPath];
    if (robot) {
        // console.log(this.lastPath);
        return robot.call(this);
    }
}


//Spreadsheets.suspend(postData);
//Spreadsheets.suspended(postData);
//Spreadsheets.authorize(postData);
//Spreadsheets.authorization(postData);    
//Spreadsheets.suspension(postData);
//Spreadsheets.bonus(postData);

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