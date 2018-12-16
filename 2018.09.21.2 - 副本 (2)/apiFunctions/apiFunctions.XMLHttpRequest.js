var robot = {

    UpdateMemberBonusLog: function() {
        if(this.respData == 1) { window.cacheBonusData = this.sendData; }
    },
    delDiceWinRecords: function( /*用於刪除*/ ) {
        if(this.respData == 1) { window.cacheBonusData = this.sendData; }
    },
    DelDiceWinRecords: function( /*用於給點*/ ) {
        if(this.respData == 1) { window.cacheBonusData = this.sendData; }
    },
    /****************************************************************/

    GetMemberBonusLogBackendByCondition: async function() {
        if(window.cacheBonusData) {
            this.sendData = getBonus.call(this);
            var user = await getUser.call(this);
            user.bonus = this.sendData;
            user.module = "bonus:ku711";
            Spreadsheets.siribonus(user, "禮金表");
        }
    },
    getDepositBonusList: async function() {
        if(window.cacheBonusData) {
            this.sendData = getBonus.call(this);
            var user = await getUser.call(this);
            user.bonus = this.sendData;
            user.module = "bonus:wa111";
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
        if(this.respData == 1) {
            var { MemberStatus, IsDeposit } = this.sendData;
            var data = [MemberStatus, IsDeposit];
            var user = await getUser.call(this);
            Spreadsheets.authorize(user, data, "開通");
        };
    },
    UpdateMemberSNInfoBackend: async function() {
        var { MemberStatus, IsDeposit } = this.sendData;
        var data = [MemberStatus, IsDeposit];
        var user = await getUser.call(this);
        Spreadsheets.authorize(user, data, "停權-用戶狀態選停權戶");
    },
    /****************************************************************/
    StopMember: async function(user) {
        if(this.respData == 2) {
            var data = [2, 0];
            var user = await getUser.call(this);
            Spreadsheets.authorize(user, data, "停權");
        };
    },
    UpdateMemberRisksInfoBackendIsFSuspension: async function() {
        if(this.sendData.IsFSuspension == false) { return };
        var data = [0, 0];
        var user = await getUser.call(this);
        Spreadsheets.authorize(user, data, "還原或停權");
    },
    /************************************************************************************/
}


apiFunctions.XMLHttpRequest = function() {
    //console.log(this);
    var _robot = robot[this.action] || robot[this.type] || robot[this.lastPath];
    if(_robot) { _robot.call(this); }
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

    request.timespan = moment().format('YYYY-MM-DD HH:mm:ss');

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
            module: request.module,
            params: angular.toJson(request)
        }
    }).then(function(d) { console.log(d); })
}


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
        user.command = "google:scripts";
        apiFunctions.google(user);
    },
    authorize: function(user, postData) {
        user.status[1] = postData[0];
        user.permit[1] = postData[1];
        user.timing[1] = moment().format('YYYY-MM-DD HH:mm:ss');
        user.timing[2] = timeDiff(user.timing);
        user.permit = user.permit.map($Num);
        user.status = user.status.map($Num);
        if(user.status[0] == user.status[1] && user.permit[0] == user.permit[1]) { return }
        if(user.status[0] == 3) {
            user.command = "google:scripts";
            user.module = "authorize";
        } else {
            user.command = "google:scripts";
            user.module = "suspended";
        }
        apiFunctions.google(user);
    }
}

function getUser() {
    if(this.sendData) {
        var account = this.sendData.accounts || this.sendData.account || this.sendData.f_accounts || this.sendData.AccountID;
        var channel = this.channel;
        var unique = [account, channel].join("-");
        //console.log(unique);
        return evo.store.user.get(unique);
    }
}

function getBonus() {
    var bonus = this.dataRows.find((row) => {
        if(row.f_id) { return row.f_id == window.cacheBonusData.id; }
        if(row.BonusNumber) { return row.BonusNumber == window.cacheBonusData.BonusNumber; }
    });
    window.cacheBonusData = null;
    return bonus;
}




function getUserId() {
    var c = this.dataRows.find((row) => { return row.f_id == window.cacheBonusData.id; });
    return c.f_accounts;
}