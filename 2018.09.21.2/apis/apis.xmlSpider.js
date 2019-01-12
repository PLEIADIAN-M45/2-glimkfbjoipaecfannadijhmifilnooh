window.cacheBonusData;
window.cacheUserData;

apis.xmlSpider = async function(params) {
    with(params) {
        switch (commander) {
            case "BTNUSERSET":
                if(respData == "u-ok") apis.updateUser({ unique, status: sendData.ishow, permit: sendData.isOpenDeposit });
                break;
            case "UPDATEMEMBERRISKINFOACCOUNTINGBACKEND":
                apis.updateUser({ unique, status: sendData.MemberStatus, permit: sendData.IsDeposit });
                break;
            case "STOPMEMBER":
                if(respData == 2) apis.updateUser({ unique, status: 2, permit: 0 });
                break;
            case "UPDATEMEMBERRISKSINFOBACKENDISFSUSPENSION":
                if(sendData.IsFSuspension == true) apis.updateUser({ unique, status: 0, permit: 0 });
                break;
            case "UPDATEMEMBERSNINFOBACKEND":
                apis.updateUser({ unique, status: sendData.MemberStatus, permit: sendData.IsDeposit });
                break;
            case "CREATEMEMBERINFOOPERATIONLOG":
                break;
            case "GETDEPOSITBONUSLIST":
                if(window.cacheBonusData) {
                    var dataset = respData.rows;
                    var bonus = dataset.find((d) => { return d.f_id == window.cacheBonusData.id; });
                    var unique = bonus.f_accounts + "-" + channel;
                    apis.updateUser({ unique, bonus });
                }
                break;
            case "GETMEMBERBONUSLOGBACKENDBYCONDITION":
                if(window.cacheBonusData) {
                    var dataset = respData.Data.Data;
                    var bonus = dataset.find((d) => { return d.BonusNumber == window.cacheBonusData.BonusNumber; });
                    var unique = bonus.AccountID + "-" + channel;
                    apis.updateUser({ unique, bonus });
                }
                break;
            case "UPDATEMEMBERBONUSLOG":
                window.cacheBonusData = sendData;
                break;
            case "DELDICEWINRECORDS":
                window.cacheBonusData = sendData;
                break;
            default:
                return Promise.resolve()
                break;
        }
    }
};
apis.updateUser = async function({ unique, status, permit, bonus }) {
    var user = await apis.getUser(unique);
    console.log(user);
    if(user == undefined) { return }
    user.module = null;
    if(user.module) { return }
    if(bonus) {
        window.cacheBonusData = null;
        user.module = "bonus:" + user.server;
        user.bonus = bonus;
    } else {
        //check systemlog
        user.module = (user.status[0] == 3) ? "authorize" : "suspended";
        user.setsms = (user.status[0] == 3) ? true : false;
        user.status[1] = Number(status);
        user.permit[1] = Number(permit);
        user.timing[1] = moment().format("YYYY-MM-DD HH:mm:ss")
        user.timing[2] = moment(user.timing[0]).diff(moment(user.timing[1]), "minutes", true);
    }
    console.log(user.module, user);
    apis.putUser(user);
}

