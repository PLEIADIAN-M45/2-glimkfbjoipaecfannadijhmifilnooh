apis.updateUser = async function({ unique, status, permit, bonus }) {
    console.log("***", unique);

    var user = await apis.getUser(unique); //即時更新會比較保險

    console.log(bonus);

    if (bonus) {

        user.bonus = bonus;

        console.log(user);



    } else {

        if (user.module) { return }
        user.module = (user.status[0] == 3) ? "authorize" : "suspended";
        user.status.push(status)
        user.permit.push(permit)
        user.timing.push(Date.now())
        user.timing.timeDiff();
        user.sendSms = true;
        //if (user.status[0] == 3 || user.status[1] == 1) { user.sendSms = true; }
        if (user.status[0] == user.status[1]) {}
    }

    apis.putUser(user);
}





window.cacheBonusData;
window.cacheUserData;

apis.xmlSpider = async function(params) {
    //console.log(params);
    var { action, sendData, respData, server, unique, account, channel, operator, dataRows } = params;
    console.log(action);

    switch (action) {
        case "btnUserSet":
            if (respData == "u-ok")
                apis.updateUser({ unique, status: sendData.ishow, permit: sendData.isOpenDeposit });
            break;
        case "UpdateMemberRiskInfoAccountingBackend":
            if (respData.Data.Message == "更新成功")
                apis.updateUser({ unique, status: sendData.MemberStatus, permit: sendData.IsDeposit });
            break;
        case "StopMember": //停權
            if (respData == 2)
                apis.updateUser({ unique, status: 2, permit: 0 });
            break;
        case "UpdateMemberRisksInfoBackendIsFSuspension": //"還原或停權"
            if (sendData.IsFSuspension == true)
                apis.updateUser({ unique, status: 0, permit: 0 });
            break;
        case "UpdateMemberSNInfoBackend": //"停權-用戶狀態選停權戶"(上方鍵)
            if (respData.Data.Message == "更新成功")
                apis.updateUser({ unique, status: sendData.MemberStatus, permit: sendData.IsDeposit });
            break;

        case "DepositBonus":
        case "GetMemberBonusLogBackendByCondition":
            window.cacheBonusData = respData.rows || respData.Data.Data;
            break;
            
        case "UpdateMemberBonusLog":
            if (respData == 1 && window.cacheBonusData) {
                var bonus = window.cacheBonusData.find((d) => { return d.BonusNumber == sendData.BonusNumber; });
                var unique = bonus.AccountID + "-" + channel;
                apis.updateUser({ unique, bonus });
            }
            break;
        case "delDiceWinRecords":
        case "DelDiceWinRecords":
            if (respData == 1 && window.cacheBonusData) {
                var bonus = window.cacheBonusData.find((d) => { return d.f_id == sendData.id; });
                var unique = bonus.f_accounts + "-" + channel;
                apis.updateUser({ unique, bonus });
            }
            break;

        default:
            return Promise.resolve()
            break;
    }
};













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