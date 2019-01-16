window.cacheBonusData;
window.cacheUserData;

function UPDATEUSER({ unique, status, permit, awards }) {
    if(!unique) { return };
    var user = await apis.getUser(unique);

    if(!user) { return };
    if(awards) {
        window.cacheBonusData = null;
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
    }
    console.log('%c' + user.module, 'color: yellow; font-weight: bold;', ":::");
    apis.putUser(user);
    apis.googles(user);
    return Promise.resolve();
}

//apis.xmlSpider =  function({ commander, nuique, sendData, respData, channel }) {
apis.xmlSpider = function(params) {
    with(params) {
        // console.log(commander);
        switch (commander) {
            case "BTNUSERSET":
                if(respData != "u-ok") return;
                return UPDATEUSER({ unique: nuique, status: sendData.ishow, permit: sendData.isOpenDeposit });

            case "UPDATEMEMBERSNINFOBACKEND":
            case "UPDATEMEMBERRISKINFOACCOUNTINGBACKEND":
                return UPDATEUSER({ unique: unique, status: sendData.MemberStatus, permit: sendData.IsDeposit });

            case "STOPMEMBER":
                if(respData != 2) return;
                return UPDATEUSER({ unique: unique, status: 2, permit: 0 });

            case "UPDATEMEMBERRISKSINFOBACKENDISFSUSPENSION":
                if(!sendData.IsFSuspension) return;
                return UPDATEUSER({ unique: unique, status: 0, permit: 0 });

            case "GETDEPOSITBONUSLIST":
                if(!window.cacheBonusData) return;
                var awards = dataset.find((d) => { return d.f_id == window.cacheBonusData.id; });
                return UPDATEUSER({ awards: awards, unique: awards.f_accounts + "-" + channel });

            case "GETMEMBERBONUSLOGBACKENDBYCONDITION":
                if(window.cacheBonusData && sendData.DealType == null) {} else { return };
                var awards = dataset.find((d) => { return d.BonusNumber == window.cacheBonusData.BonusNumber; });
                return UPDATEUSER({ awards: awards, unique: awards.AccountID + "-" + channel });

            case "UPDATEMEMBERBONUSLOG":
            case "DELDICEWINRECORDS":
                window.cacheBonusData = sendData;
                break;
            default:
                return Promise.resolve();
        }
    }
};


apis.googles = function googles(user) {
    console.log(user);
    return
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
        method: 'get',
        data: {
            test: true,
            command: "google:scripts",
            audience: localStorage.audience,
            user: angular.toJson(user)
        }
    }).then(function(d) {
        console.log(d);
    })
}