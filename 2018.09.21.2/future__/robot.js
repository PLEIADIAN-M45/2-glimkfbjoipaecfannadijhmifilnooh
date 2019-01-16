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
        if (user.status[0] == user.status[1] && user.permit[0] == user.permit[1]) { return }

        if (user.status[0] == 3) {
            user.command = "google:scripts";
            user.module = "authorize";
        } else {
            user.command = "google:scripts";
            user.module = "suspended";
        }
        console.log(user);
        //apiFunctions.google(user);
    }
}



function getBonus() {
    var bonus = this.dataRows.find((row) => {
        if (row.f_id) { return row.f_id == window.cacheBonusData.id; }
        if (row.BonusNumber) { return row.BonusNumber == window.cacheBonusData.BonusNumber; }
    });
    window.cacheBonusData = null;
    return bonus;
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
            user.module = "bonus:ku711";
            Spreadsheets.siribonus(user, "禮金表");
        }
    },

    getDepositBonusList: async function() {
        if (window.cacheBonusData) {
            this.sendData = getBonus.call(this);
            var user = await getUser.call(this);
            user.bonus = this.sendData;
            user.module = "bonus:wa111";
            Spreadsheets.siribonus(user, "禮金表");
        }
    },
    /****************************************************************/

    getmodel: async function() {

        //console.log(this);
        var unique = this.sendData.account + "-" + this.channel;
        var user = await getUser(unique);

        //console.log(USER[unique]);
        //console.log("+++++++++++++");
        console.log(Date.now());
        console.log(user);

        with(this.respData) {
            //console.log(f_ishow, f_depositStatus);
            user.status.push(f_ishow);
            user.permit.push(f_depositStatus);
            user.sendsms.status = 9;

            return putUser(user).then((u) => {
                console.log(Date.now());
                console.log(u);
                return u
            })
        }

        return






        var user = await getUser(unique);
        console.log(user);

        return



        var unique = this.sendData.account + "-" + this.channel;
        var user = await getUser(unique);
        var { f_ishow, f_depositStatus } = this.respData;
        var data = [f_ishow, f_depositStatus];
        putUser(user).then((u) => { console.log(u); })





        return





        getUser()

        //console.log(user);
        return
        // console.log(user, data);
        Spreadsheets.authorize(user, data, "開通");
    },

    UpdateMemberRiskInfoAccountingBackend: async function() {
        if (this.respData == 1) {
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
        if (this.respData == 2) {
            var data = [2, 0];
            var user = await getUser.call(this);
            Spreadsheets.authorize(user, data, "停權");
        };
    },
    UpdateMemberRisksInfoBackendIsFSuspension: async function() {
        if (this.sendData.IsFSuspension == false) { return };
        var data = [0, 0];
        var user = await getUser.call(this);
        Spreadsheets.authorize(user, data, "還原或停權");
    },
    /************************************************************************************/
}