var host = { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111", "26": "wa111", "16": "ku711", "": location.host.split('.')[1] } [location.port];
var getURL = chrome.runtime.getURL;

localStorage.baseUrl = getURL('/module/' + host);
localStorage.extensionId = chrome.runtime.id;
localStorage.host = host;



function injectScript(attrs) {
    var script = document.createElement('script');
    script.async = 1;
    script.onload = function() { this.remove(); };
    Object.entries(attrs).forEach(([name, value]) => { script.setAttribute(name, value); });
    (document.head || document.documentElement).appendChild(script);  
}



//injectScript({ "src": getURL("/module/prototype.js") });
//injectScript({ "src": getURL("/module/xmlSpider.js") });



document.onreadystatechange = function() {
    switch (document.readyState) {
        case "loading":
            break;
        case "interactive":
            injectScript({ "src": getURL('/lib/require/require.js'), "data-main": getURL('/module/main.js') })
            break;
        case "complete":
            break;
    }
}











//localStorage.baseUrl = getURL('/module');
//console.log(host);
//localStorage.chrome_runtime_baseUrl = chrome.runtime.getURL('/');
//injectScript({ "src": getURL('project/scripts/require.js'), "data-main": getURL('project/scripts/main.js') })











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


class Robot {



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