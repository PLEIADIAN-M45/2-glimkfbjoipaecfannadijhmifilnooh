function timeDiff([t1, t2]) {
    t1 = moment(t1);
    t2 = moment(t2);
    return t2.diff(t1, "day", true);
}

function $formatTime(t) { return moment(t).format('YYYY-MM-DD HH:mm:ss') }

function $Num(str) { return Number(str) }

function $upper(str) { return str.toUpperCase(); }

function $fromJson(obj) { try { var str = JSON.stringify(obj); } catch (ex) { var str = obj; } return str; }

function $toJson({ responseText }) { try { return JSON.parse(responseText); } catch (ex) { return responseText } }

var Spreadsheets = {
    siribonus: function(user) {
        user.command = "google:scripts:siribonus";
        apiFunctions.google(user);
    },
    authorize: function(user, postData) {
        user.status[1] = postData[0];
        user.permit[1] = postData[1];
        user.timing[1] = moment().format('YYYY-MM-DD HH:mm:ss');
        user.timing[2] = timeDiff(user.timing);
        user.permit = user.permit.map($Num);
        user.status = user.status.map($Num);
        if (user.status[0] == user.status[1] && user.permit[0] == user.permit[1]) { return }
        if (user.status[0] == 3) {
            user.command = "google:scripts:authorize"
        } else {
            user.command = "google:scripts:suspended"
        }
        apiFunctions.google(user);
    }
}

function getUserId() {
    var c = this.dataRows.find((row) => { return row.f_id == window.cacheBonusData.id; });
    return c.f_accounts;
}

function getUser() {
    var account = this.sendData.accounts || this.sendData.account || this.sendData.f_accounts || this.sendData.AccountID;
    var channel = this.channel;
    return evo.store.user.get({ account, channel });
}

function getBonus() {
    return this.dataRows.find((row) => {
        if (row.f_id) { return row.f_id == window.cacheBonusData.id; }
        if (row.BonusNumber) { return row.BonusNumber == window.cacheBonusData.BonusNumber; }
    });
}

var robot = {

    UpdateMemberBonusLog: function() {
        if (this.respData == 1) { window.cacheBonusData = this.sendData; }
    },
    delDiceWinRecords: function( /*用於刪除*/ ) {
        if (this.respData == 1) { window.cacheBonusData = this.sendData; }
    },
    DelDiceWinRecords: function( /*用於給點*/ ) {
        if (this.respData == 1) { window.cacheBonusData = this.sendData; }
    },
    /****************************************************************/

    GetMemberBonusLogBackendByCondition: async function() {
        if (window.cacheBonusData) {
            this.sendData = getBonus.call(this);
            var user = await getUser.call(this);
            user.bonus = this.sendData;
            Spreadsheets.siribonus(user, "禮金表");
        }
    },
    getDepositBonusList: async function() {
        if (window.cacheBonusData) {
            this.sendData = getBonus.call(this);
            var user = await getUser.call(this);
            user.bonus = this.sendData;
            Spreadsheets.siribonus(user, "禮金表");
        }
    },
    /****************************************************************/
    getmodel: async function(user) {
        var { f_ishow, f_depositStatus } = this.respData;
        var data = [f_ishow, f_depositStatus];
        var user = await getUser.call(this);
        Spreadsheets.authorize(user, data, "開通");
    },
    UpdateMemberRiskInfoAccountingBackend: async function() {
        if (this.respData.Data.Message != "更新成功") { return }
        var { MemberStatus, IsDeposit } = this.sendData;
        var data = [MemberStatus, IsDeposit];
        var user = await getUser.call(this);
        Spreadsheets.authorize(user, data, "開通");
    },
    UpdateMemberSNInfoBackend: async function() {
        //if (this.respData.Data.Message == "更新成功") {}
        var { MemberStatus, IsDeposit } = this.sendData;
        var data = [MemberStatus, IsDeposit];
        var user = await getUser.call(this);
        Spreadsheets.authorize(user, data, "停權-用戶狀態選停權戶");
    },
    /****************************************************************/

    StopMember: async function(user) {
        if (this.respData == 1) { return };
        var data = [2, 0];
        var user = await getUser.call(this);
        Spreadsheets.authorize(user, data, "停權");
    },
    UpdateMemberRisksInfoBackendIsFSuspension: async function() {
        if (this.sendData.IsFSuspension == false) { return };
        var data = [0, 0];
        var user = await getUser.call(this);
        Spreadsheets.authorize(user, data, "還原或停權");
    },
    /************************************************************************************/


}


apiFunctions.XMLHttpRequest = function() {
    var _robot = robot[this.action] || robot[this.type] || robot[this.lastPath];
    if (_robot) { if (this.sendData) { _robot.call(this); } } else {}
    return Promise.resolve({});
}

apiFunctions.google = function(request) {
    try {
        delete request.banker[0].sites;
        delete request.idcard.sites;
        delete request.locate.sites;
        delete request.mobile.sites;
        delete request.author.sites;
    } catch (ex) {}
    console.log(request.command);
    console.log(request);
    //request.region = [];
    return
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
        method: 'get',
        data: {
            test: true,
            audience: angular.fromJson(localStorage.tokenInfo).audience,
            command: request.command,
            params: angular.toJson(request)
        }
    }).then(function(d) { console.log(d); })
}



//console.log(user);
//_robot.call(this)

//async function exec() {}
//exec.call(this);


/*
    var action = this.sendData.action || this.sendData.type;
    if (robot[action]) { robot[action].call(this); return Promise.resolve({}) }

    var action = this.lastPath;
    if (robot[action]) { robot[action].call(this); return Promise.resolve({}) }

*/
/*
var robot = $robot[this.lastPath];
if(robot) { return robot.call(this); }
*/



/*
xmlSpider.loadend = function() {
    var robot = $robot[this.command];
    if(robot) { return robot.call(this); }
    var robot = $robot[this.lastPath];
    if(robot) { return robot.call(this); }
}
*/

//console.log(chrome.runtime);
//console.log(location.);
/*
    var connectName = location.pathname.split('.')[0].split('/').pop();
    var port = chrome.runtime.connect(evo.extensionId, {
        name: connectName
    })
    port.onMessage.addListener(function(a) {
        console.log(a);
    })*/

//console.log(port);



/* chrome.runtime.onConnect.addListener(function(port) {
     console.log(port);

 })*/
/*

authorize_ku711: function(user, postData) {
    //console.log(postData);
    // user.status[1] = postData.f_ishow;
    // user.permit[1] = postData.f_depositStatus;
    user.status[1] = postData.MemberStatus;
    user.permit[1] = postData.IsDeposit;
    user.timing[1] = moment().format('YYYY-MM-DD HH:mm:ss');
    user.timing[2] = timeDiff(user.timing);
    user.permit = user.permit.map($Num);

    if (user.status[0] == user.status[1] && user.permit[0] == user.permit[1]) { return }
    if (user.status[0] == 3) {
        user.command = "google:scripts:authorize"
    } else {
        user.command = "google:scripts:suspended"
    }


    apiFunctions.google(user);

    //console.log(user.command);
    //postData.timespan;
},
*/