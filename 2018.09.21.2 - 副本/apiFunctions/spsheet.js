apiFunctions.google = function(request) {
    delete request.banker[0].sites;
    delete request.idcard.sites;
    delete request.locate.sites;
    delete request.mobile.sites;
    delete request.author.sites;
    console.log(request);
    request.region = [];
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
        method: 'get',
        data: {
            test: true,
            audience: angular.fromJson(localStorage.tokenInfo).audience,
            command: request.command,
            params: angular.toJson(request)
        }
    }).then(function(d) {
        console.log(d);
    })
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


var Spreadsheets = function(a) {
    console.log(a);
}

Spreadsheets.prototype.authorize_wa111 = function() {

}

Spreadsheets.prototype.authorize_ku711 = function() {

}

Spreadsheets.prototype.siribonus = function() {

}


var Spreadsheets = {
    authorize_wa111: function(user, postData) {

        console.log(user);
        console.log(postData);
        

        return
        user.status[1] = postData.f_ishow;
        user.permit[1] = postData.f_depositStatus;
        user.timing[1] = moment().format('YYYY-MM-DD HH:mm:ss');
        user.timing[2] = timeDiff(user.timing);
        user.permit = user.permit.map($Num);
        if (user.status[0] == 3) {
            user.command = "google:scripts:authorize"
        } else {
            user.command = "google:scripts:suspended"
        }
        console.log(user.command);
        apiFunctions.google(user);
    },
    authorize_ku711: function(user, postData) {
        user.status[1] = postData.MemberStatus;
        user.permit[1] = postData.IsDeposit;
        user.timing[1] = moment().format('YYYY-MM-DD HH:mm:ss');
        //postData.timespan;
        user.timing[2] = timeDiff(user.timing);
        user.permit = user.permit.map($Num);
        if (user.status[0] == 3) {
            user.command = "google:scripts:authorize"
        } else {
            user.command = "google:scripts:suspended"
        }
        console.log(user.command);
        apiFunctions.google(user);
    },

    siribonus: function(user) {
        user.command = "google:scripts:siribonus";
        apiFunctions.google(user);
        console.log(user.command);
        console.log(user);
    },
}


function getUser() {
    var account = this.sendData.accounts || this.sendData.account;
    var channel = this.channel;
    return evo.store.user.get({ account, channel });
}

var robot = {

    delDiceWinRecords: function() { /*用於刪除*/
        if (this.respData == 1) { window.cacheBonusData = this.sendData; }
    },
    DelDiceWinRecords: function() { /*用於給點*/
        if (this.respData == 1) { window.cacheBonusData = this.sendData; }
    },
    getDepositBonusList: async function() { /*禮金表*/
        if (window.cacheBonusData) {
            var postData = this.dataRows.find((row) => { return row.f_id == window.cacheBonusData.id; });
            window.cacheBonusData = null;
            var account = postData.f_accounts;
            var channel = this.channel;
            var user = await evo.store.user.get({ account, channel });
            if (user) {
                user.bonus = postData;
                Spreadsheets.siribonus(user);
            }
        }
    },
    StopMember: function(user) {
        if (this.respData == 1) { return };
        Spreadsheets.authorize_wa111(user, { f_ishow: 2, f_depositStatus: 0 });
        return
        /*1還原 或 2停權*/
        //var account = this.sendData.accounts;
        //var channel = this.channel;
        //var user = await evo.store.user.get({ account, channel });
        //var user = getUser.call(this);
        //console.log(user);
        //this.account = this.sendData.accounts;
        //Spreadsheets.authorize_wa111.call(this)
        //user.status[0] = 1;
    },
    getmodel: async function() { /*開通*/
        var account = this.sendData.account;
        var channel = this.channel;
        var user = await evo.store.user.get({ account, channel });
        Spreadsheets.authorize_wa111(user, this.respData);
    },


    UpdateMemberRiskInfoAccountingBackend: async function() { //控制存款開關
        if (this.respData.Data.Message != "更新成功") { return }
        var account = this.sendData.AccountID;
        var channel = this.channel;
        var user = await evo.store.user.get({ account, channel });
        Spreadsheets.authorize_ku711(user, this.sendData);
    },
    UpdateMemberSNInfoBackend: async function() { //控制用户状态開關 //判斷一下是否執行成功 //這個動作用於 轉為停權
        //if (this.respData.Data.Message == "更新成功") {}
        var account = this.sendData.AccountID;
        var channel = this.channel;
        var user = await evo.store.user.get({ account, channel });
        Spreadsheets.authorize_ku711(user, this.sendData);
    },

    UpdateMemberRisksInfoBackendIsFSuspension: async function() { //還原或停權
        if (this.sendData.IsFSuspension == false) { return }
        var account = this.sendData.AccountID;
        var channel = this.channel;
        var user = await evo.store.user.get({ account, channel });
        Spreadsheets.authorize_ku711(user, { MemberStatus: 0, IsDeposit: 0 });
    },

    /************************************************************************************/
    UpdateMemberBonusLog: async function() {
        if (this.respData.Data.Message != "更新成功") { return };
        window.cacheBonusData = this.sendData;
    },
    GetMemberBonusLogBackendByCondition: async function() {
        if (window.cacheBonusData) {
            var postData = this.dataRows.find((row) => { return row.BonusNumber == window.cacheBonusData.BonusNumber; });
            window.cacheBonusData = null;
            var account = postData.AccountID;
            var channel = this.channel;
            var user = await evo.store.user.get({ account, channel });
            if (user) {
                user.bonus = postData;
                Spreadsheets.siribonus(user);
            }
        }
    },
}


apiFunctions.XMLHttpRequest = function() {

    var _robot = robot[this.action] || robot[this.type] || robot[this.lastPath];

    if (_robot) {

        if (this.sendData) {

            getUser.call(this).then(_robot.bind(this));


            /*.then((user) => {
                this.user = user;
                console.log(this);
            })*/

            /*
            async function exec() {
                var user = await getUser.call(this);
                console.log(user);

            }

            exec.call(this)*/


            /*getUser.call(this).then((user) => {
                console.log(user);
                this.user = user;
            })*/
            //_robot.call(this);
        }
    } else {

    }

    return Promise.resolve({});
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