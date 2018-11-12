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


var Spreadsheets = {

    authorize_wa111: async function(user, postData) {

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
        console.log(user);

        //apiFunctions.google(user)
    },
    authorize_ku711: function(pastData, postData) {
        getUser(evo).then((user) => {
            user.status[1] = postData.MemberStatus;
            user.permit[1] = postData.IsDeposit;

            user.timing[1] = postData.timespan;
            user.timing[2] = timeDiff(user.timing);
            user.permit = user.permit.map($Num);

            if (user.status[0] == 3) {
                alert('authorize')
                user.command = "google:scripts:authorize"
            } else {
                alert('suspended')
                user.command = "google:scripts:suspended"
            }
            console.log(user);
            //evo.apiFunctions(user);
        })
    },

    siribonus: function(user) {
        user.command = "google:scripts:siribonus";
        //apiFunctions.google(user)
        console.log(user);
    },
}

//window.cacheBonusData = {};

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

    StopMember: async function() { /*1還原 或 2停權*/
        if (this.respData == 1) { return };
        var account = this.sendData.accounts;
        var channel = this.channel;
        var user = await evo.store.user.get({ account, channel });
        Spreadsheets.authorize_wa111(user, { f_ishow: 2, f_depositStatus: 0 });
        //user.status[0] = 1;
    },

    getmodel: async function() { /*開通*/
        var account = this.sendData.account;
        var channel = this.channel;
        var user = await evo.store.user.get({ account, channel });
        Spreadsheets.authorize_wa111(user, this.respData);
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

        /*var s = this.sendData;
        $scope.user.status.push(s.MemberStatus);
        $scope.user.permit.push(s.IsDeposit);
        console.log($scope.user);*/
        var pastData = $scope.user;
        var postData = this.sendData;
        //if(pastData.IsDeposit == postData.IsDeposit) { return }
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



apiFunctions.XMLHttpRequest = async function() {
    var _robot = robot[this.action] || robot[this.type] || robot[this.lastPath];
    if (_robot) { _robot.call(this) };
    Promise.resolve({});
}






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