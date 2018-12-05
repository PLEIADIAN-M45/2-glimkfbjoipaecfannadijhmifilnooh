define(["apiFunction", "xmlSpider"], function(apiFunction, xmlSpider) {


    //console.log(xmlSpider);

    xmlSpider.loadend = function() {
        console.log(this.action);

    };



    return async function() {

        this.setUser = function() {
            this.user = { host: this.host, origin: this.origin, unique: this.unique, channel: this.channel, account: this.account, operator: this.operator };
            return Promise.all([
                apiFunction.getUserState.call(this.user),
                apiFunction.getUserModel.call(this.user),
                apiFunction.getPhoneDate.call(this.user),
                apiFunction.getSystemLog.call(this.user),
                apiFunction.getUserStore.call(this.user)
            ]).then(this.putUser.bind(this));
        };


        this.user = await this.getUser() || await this.setUser(this);

        apiFunction.getUserState.call(this.user);

        this.$apply();

        console.log(this.user);
    }

});



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









/*
class xmlSpider3 {
    constructor() {

    }
}
*/



