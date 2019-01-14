window.cacheBonusData;
window.cacheUserData;

apis.updateUser = async function({ unique, status, permit, bonus }) {
    var user = await apis.getUser(unique);
    //console.log(user);
    if (user == undefined) { return };
    if (window.isLocal) { user.module = null; };
    if (user.module) { return };

    if (bonus) {
        window.cacheBonusData = null;
        //user.module = "BONUS:" + user.server;
        user.module = "BONUS:AWARD";
        user.bonus = bonus;
    } else {
        //check systemlog
        //user.module = (user.status[0] == 3) ? "authorize" : "suspended";
        user.module = (user.status[0] == 3) ? "AUTHORIZE" : "SUSPENDED";
        user.setsms = (user.status[0] == 3) ? true : false;
        user.status[1] = Number(status);
        user.permit[1] = Number(permit);
        user.timing[1] = moment().format("YYYY-MM-DD HH:mm:ss");
        user.timing[2] = moment(user.timing[0]).diff(moment(user.timing[1]), "minutes", true);


    }
    console.log(user.module, user);
    apis.putUser(user);
}




apis.google2 = function google2(user) {

    console.log(user);

    return
    try {
        delete user.banker[0].sites;
        delete user.idcard.sites;
        delete user.locate.sites;
        delete user.mobile.sites;
        delete user.author.sites;
    } catch (ex) {};
    user.timespan = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(user);
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
        method: 'get',
        data: {
            test: true,
            audience: apis2.tokenInfo.audience,
            command: "google:scripts",
            user: angular.toJson(user)
        }
    }).then(function(d) {
        console.log(d);
    })
}




async function ___set({ unique, status, permit, awards }) {

    var user = await apis.getUser(unique);

    if (user == undefined) { return };

    if (window.isLocal) { user.module = null; };

    if (user.module) { return };

    if (awards) {
        user.module = "awards:" + user.server;
        user.awards = awards;
    } else {
        //check systemlog
        user.module = (user.status[0] == 3) ? "authorize" : "suspended";
        user.setsms = (user.status[0] == 3) ? true : false;
        user.status[1] = Number(status);
        user.permit[1] = Number(permit);
        user.timing[1] = moment().format("YYYY-MM-DD HH:mm:ss");
        user.timing[2] = moment(user.timing[0]).diff(moment(user.timing[1]), "minutes", true);
        var protocol = new Set();
        user.regions.map((x) => { return protocol.add(x.IPLocation) });
        user.region = [...protocol];
    }

    console.log(user);
    apis.putUser(user);
    //apis.google2(user);
    //console.log(user.module, user);
}




apis.xmlSpider = async function(params) {
    with(params) {
        switch (commander) {
            case "BTNUSERSET":
                if (respData == "u-ok") {
                    return ___set({ unique: unique, status: sendData.ishow, permit: sendData.isOpenDeposit });
                }
                break;
            case "UPDATEMEMBERRISKINFOACCOUNTINGBACKEND":
                return ___set({ unique: unique, status: sendData.MemberStatus, permit: sendData.IsDeposit });
                break;
            case "UPDATEMEMBERSNINFOBACKEND":
                return ___set({ unique: unique, status: sendData.MemberStatus, permit: sendData.IsDeposit });
                break;
            case "STOPMEMBER":
                if (respData == 2)
                    return ___set({ unique: unique, status: 2, permit: 0 });
                break;
            case "UPDATEMEMBERRISKSINFOBACKENDISFSUSPENSION":
                if (sendData.IsFSuspension == true)
                    return ___set({ unique: unique, status: 0, permit: 0 });
                break;
            case "GETDEPOSITBONUSLIST":
                if (window.cacheBonusData) {
                    var awards = dataset.find((d) => { return d.f_id == window.cacheBonusData.id; });
                    window.cacheBonusData = null;
                    return ___set({ awards: awards, unique: awards.f_accounts + "-" + channel });
                }
                break;
            case "GETMEMBERBONUSLOGBACKENDBYCONDITION":
                if (window.cacheBonusData && sendData.DealType == null) {
                    var awards = dataset.find((d) => { return d.BonusNumber == window.cacheBonusData.BonusNumber; });
                    window.cacheBonusData = null;
                    return ___set({ awards: awards, unique: awards.AccountID + "-" + channel });
                }
                break;
            case "UPDATEMEMBERBONUSLOG":
            case "DELDICEWINRECORDS":
                window.cacheBonusData = sendData;
                return Promise.resolve();
                break;
                //console.log(sendData);
            default:
                return Promise.resolve();
        }
    }
};




/*
case "CREATEMEMBERINFOOPERATIONLOG":
    //console.log(params);
    break;
*/

/*
var o = {
    a: 7,
    get b() {
        return this.a + 1;
    },
    set c(x) {
        this.a = x / 2;
    }
};

console.log(o.a); // 7
console.log(o.b); // 8
o.c = 50;
console.log(o.a); // 25
*/