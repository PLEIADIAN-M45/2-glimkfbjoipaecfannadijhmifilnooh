/*
Array.prototype.timeDiff = function(unit) {
    this[0] = moment(this[0]).format("YYYY-MM-DD HH:mm:ss")
    this[1] = moment(this[1]).format("YYYY-MM-DD HH:mm:ss")
    this[2] = moment(this[1]).diff(moment(this[0]), "minutes", true);
    return this;
       user.timing.timeDiff();
        user.status.push(Number(status))
        user.permit.push(Number(permit))
        user.timing.push(Date.now())
        user.timing.timeDiff();
}
*/



apis.updateUser = async function({ unique, status, permit, bonus }) {
    var user = await apis.getUser(unique); //即時更新會比較保險
    console.log(user);
    if(user == undefined) { return }
    user.module = null;
    if(user.module) { return }
    if(bonus) {
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

//var { commander, command, sendData, respData, server, channel, operator, unique } = params;
window.cacheBonusData;
window.cacheUserData;

apis.xmlSpider = async function(params) {
    with(params) {
        switch (commander) {
            case "BTNUSERSET":
                if(respData == "u-ok") apis.updateUser({ unique, status: sendData.ishow, permit: sendData.isOpenDeposit });
                break;
            case "UPDATEMEMBERRISKINFOACCOUNTINGBACKEND":
                //if(respData.Data.Message == "更新成功")
                apis.updateUser({ unique, status: sendData.MemberStatus, permit: sendData.IsDeposit });
                break;
            case "STOPMEMBER": //停權
                if(respData == 2) apis.updateUser({ unique, status: 2, permit: 0 });
                break;
            case "UPDATEMEMBERRISKSINFOBACKENDISFSUSPENSION": //"停權"
                if(sendData.IsFSuspension == true) apis.updateUser({ unique, status: 0, permit: 0 });
                break;
            case "UPDATEMEMBERSNINFOBACKEND": //"停權-用戶狀態選停權戶"(上方鍵)
                //if(respData.Data.Message == "更新成功")
                apis.updateUser({ unique, status: sendData.MemberStatus, permit: sendData.IsDeposit });
                break;
            case "CREATEMEMBERINFOOPERATIONLOG":
                break;
            case "GETDEPOSITBONUSLIST":
                if(window.cacheBonusData) {
                    var dataset = respData.rows;
                    var bonus = dataset.find((d) => { return d.f_id == window.cacheBonusData.id; });
                    var unique = bonus.f_accounts + "-" + channel;
                    //console.log("bonus", bonus);
                    window.cacheBonusData = null;
                    apis.updateUser({ unique, bonus });
                }
                break;
            case "GETMEMBERBONUSLOGBACKENDBYCONDITION":
                if(window.cacheBonusData) {
                    var dataset = respData.Data.Data;
                    var bonus = dataset.find((d) => { return d.BonusNumber == window.cacheBonusData.BonusNumber; });
                    var unique = bonus.AccountID + "-" + channel;
                    //console.log("bonus", bonus);
                    window.cacheBonusData = null;
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
        return
        switch (commander) {
            case "btnUserSet":
                if(respData == "u-ok")
                    apis.updateUser({ unique, status: sendData.ishow, permit: sendData.isOpenDeposit });
                break;
            case "UpdateMemberRiskInfoAccountingBackend":
                if(respData.Data.Message == "更新成功")
                    apis.updateUser({ unique, status: sendData.MemberStatus, permit: sendData.IsDeposit });
                break;
            case "StopMember": //停權
                if(respData == 2)
                    apis.updateUser({ unique, status: 2, permit: 0 });
                break;
            case "UpdateMemberRisksInfoBackendIsFSuspension": //"還原或停權"
                if(sendData.IsFSuspension == true)
                    apis.updateUser({ unique, status: 0, permit: 0 });
                break;
            case "UpdateMemberSNInfoBackend": //"停權-用戶狀態選停權戶"(上方鍵)
            case "UpdateMemberSNInfoBackend": //"停權-用戶狀態選停權戶"(上方鍵)

                if(respData.Data.Message == "更新成功")
                    apis.updateUser({ unique, status: sendData.MemberStatus, permit: sendData.IsDeposit });
                break;

            case "DepositBonus":
            case "GetMemberBonusLogBackendByCondition":
                window.cacheBonusData = respData.rows || respData.Data.Data;
                break;

            case "UpdateMemberBonusLog":
                if(respData == 1 && window.cacheBonusData) {
                    var bonus = window.cacheBonusData.find((d) => { return d.BonusNumber == sendData.BonusNumber; });
                    var unique = bonus.AccountID + "-" + channel;
                    apis.updateUser({ unique, bonus });
                }
                break;
            case "delDiceWinRecords":
            case "DelDiceWinRecords":
                if(respData == 1 && window.cacheBonusData) {
                    var bonus = window.cacheBonusData.find((d) => { return d.f_id == sendData.id; });
                    var unique = bonus.f_accounts + "-" + channel;
                    apis.updateUser({ unique, bonus });
                }
                break;

            default:
                return Promise.resolve()
                break;
        }
    }



};





function mapToJson(map) {
    return JSON.stringify([...map]);
}

function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}


function strMapToObj3(strMap) {
    let obj = Object.create(null);
    for(let [k, v] of strMap) {
        console.log(k, v);
        // We don’t escape the key '__proto__'
        // which can cause problems on older engines
        obj[k] = v;
    }
    return obj;
}



function strMapToObj2(_url) {
    console.log(_url);
    let obj = Object.create(null);
    Array.from(_url.searchParams.entries()).forEach(([k, v]) => { obj[k] = v; });
    return obj;
}

/* if(href) {
     if(href.includes('?')) {
         decodeURIComponent(href).split('?')[1].split('&').map((x) => {
             return x.split('=')
         }).forEach(([name, value]) => {
             obj[name] = value;
         });
     }
 }*/








// window.cacheBonusData = params.cacheBonusData;
//console.log(window.cacheBonusData);
//var bonus = window.cacheBonusData[sendData.BonusNumber];
//respData.rows || respData.Data.Data;




/*
btnUserSet -> "u-ok"
sendData 去比對稍候的 getmodel 的respData
*/






// case "UpdateMemberRiskInfoAccountingBackend":
//case "btnUserSet":
//case "StopMember": //停權
// case "UpdateMemberSNInfoBackend": //"停權-用戶狀態選停權戶"(上方鍵)
//case "UpdateMemberRisksInfoBackendIsFSuspension": //"還原或停權"


/*
getmodel: 開通表
StopMember:
getDepositBonusList:
delDiceWinRecords:
DelDiceWinRecords:
-- -- -- -- -- -- -- -- -- -- -- -- -
UpdateMemberBonusLog
GetMemberBonusLogBackendByCondition
UpdateMemberRiskInfoAccountingBackend
UpdateMemberSNInfoBackend
UpdateMemberRisksInfoBackendIsFSuspension
CreateMemberInfoOperationLog
*/