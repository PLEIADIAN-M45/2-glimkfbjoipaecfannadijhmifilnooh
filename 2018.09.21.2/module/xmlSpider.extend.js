define([], function() {

    return {

        /*
        getAllUser: function() {
            this.dataRows.map((r) => { this.dexie.user.put(r); });
        },*/


        delDiceWinRecords: function() { /*用於刪除*/
            if(this.respData == 1) { window.cacheBonusData = this.sendData; }
        }



    }




    //console.log(xmlSpider);

    xmlSpider.getmodel = async function() { /*開通*/

        this.command = "apiFunctions.xmlSpider"

        console.log(this);

        //this.sendMessage(this).then((x) => { console.log(x); })

        return;




        return;
        var account = this.sendData.account;
        var channel = this.channel;
        var unique = this.sendData.account + '-' + this.channel;
        //var user = await this.dexie.user.get(unique);
        console.log(account, channel);
        console.log(unique);
        console.log(user);
        console.log(Spreadsheets.authorize_wa111);
        //Spreadsheets.authorize_wa111(user, this.respData);
    }



    xmlSpider.loadend = function() {
        //console.log(this);
        var action = this.action;
        if(this[action]) {
            //console.log(action);
            this[action]();
        }
    };


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
            return evo.store.user.get({ account, channel });
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



    /* return class Robot {
         constructor(scope) {
             console.log(scope);
             console.log(scope.dexie);
         }
     }*/


    var robot = {

        delDiceWinRecords: function() { /*用於刪除*/
            if(this.respData == 1) { window.cacheBonusData = this.sendData; }
        },
        DelDiceWinRecords: function() { /*用於給點*/
            if(this.respData == 1) { window.cacheBonusData = this.sendData; }
        },
        getDepositBonusList: async function() { /*禮金表*/
            if(window.cacheBonusData) {
                var postData = this.dataRows.find((row) => { return row.f_id == window.cacheBonusData.id; });
                window.cacheBonusData = null;
                var account = postData.f_accounts;
                var channel = this.channel;
                var user = await evo.store.user.get({ account, channel });
                if(user) {
                    user.bonus = postData;
                    Spreadsheets.siribonus(user);
                }
            }
        },
        StopMember: function(user) {
            if(this.respData == 1) { return };
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
            if(this.respData.Data.Message != "更新成功") { return }
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
            if(this.sendData.IsFSuspension == false) { return }
            var account = this.sendData.AccountID;
            var channel = this.channel;
            var user = await evo.store.user.get({ account, channel });
            Spreadsheets.authorize_ku711(user, { MemberStatus: 0, IsDeposit: 0 });
        },

        /************************************************************************************/
        UpdateMemberBonusLog: async function() {
            if(this.respData.Data.Message != "更新成功") { return };
            window.cacheBonusData = this.sendData;
        },
        GetMemberBonusLogBackendByCondition: async function() {
            if(window.cacheBonusData) {
                var postData = this.dataRows.find((row) => { return row.BonusNumber == window.cacheBonusData.BonusNumber; });
                window.cacheBonusData = null;
                var account = postData.AccountID;
                var channel = this.channel;
                var user = await evo.store.user.get({ account, channel });
                if(user) {
                    user.bonus = postData;
                    Spreadsheets.siribonus(user);
                }
            }
        },
    }



    var robot = {

        delDiceWinRecords: function() { /*用於刪除*/
            if(this.respData == 1) { window.cacheBonusData = this.sendData; }
        },
        DelDiceWinRecords: function() { /*用於給點*/
            if(this.respData == 1) { window.cacheBonusData = this.sendData; }
        },
        getDepositBonusList: async function() { /*禮金表*/
            if(window.cacheBonusData) {
                var postData = this.dataRows.find((row) => { return row.f_id == window.cacheBonusData.id; });
                window.cacheBonusData = null;
                var account = postData.f_accounts;
                var channel = this.channel;
                var user = await evo.store.user.get({ account, channel });
                if(user) {
                    user.bonus = postData;
                    Spreadsheets.siribonus(user);
                }
            }
        },
        StopMember: function(user) {
            if(this.respData == 1) { return };
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
            if(this.respData.Data.Message != "更新成功") { return }
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
            if(this.sendData.IsFSuspension == false) { return }
            var account = this.sendData.AccountID;
            var channel = this.channel;
            var user = await evo.store.user.get({ account, channel });
            Spreadsheets.authorize_ku711(user, { MemberStatus: 0, IsDeposit: 0 });
        },

        /************************************************************************************/
        UpdateMemberBonusLog: async function() {
            if(this.respData.Data.Message != "更新成功") { return };
            window.cacheBonusData = this.sendData;
        },
        GetMemberBonusLogBackendByCondition: async function() {
            if(window.cacheBonusData) {
                var postData = this.dataRows.find((row) => { return row.BonusNumber == window.cacheBonusData.BonusNumber; });
                window.cacheBonusData = null;
                var account = postData.AccountID;
                var channel = this.channel;
                var user = await evo.store.user.get({ account, channel });
                if(user) {
                    user.bonus = postData;
                    Spreadsheets.siribonus(user);
                }
            }
        },
    }





})









/*
class xmlSpider3 {
    constructor() {

    }
}
*/