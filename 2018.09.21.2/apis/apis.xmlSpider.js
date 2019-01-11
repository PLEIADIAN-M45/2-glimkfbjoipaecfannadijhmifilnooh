apis.updateUser = function(user, status, permit) {
    user.module = (user.status[0] == 3) ? "authorize" : "suspended";
    user.status.push(status)
    user.permit.push(permit)
    user.timing.push(Date.now())
    user.timing.timeDiff();
    if (user.status[0] == 3 || user.status[1] == 1) { user.sendSms = true; }

    console.log(user);
    //apis.putUser(user);
}


/*
btnUserSet -> "u-ok"
sendData 去比對稍候的 getmodel 的respData
*/

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


window.cacheBonusData;
window.cacheUserData;

apis.xmlSpider = async function(params) {

    //console.log(params);
    var { action, sendData, respData, server, unique, account, channel, operator, dataRows } = params;
    switch (action) {
        case "UpdateMemberRiskInfoAccountingBackend":
        case "btnUserSet":

        case "StopMember": //停權
        case "UpdateMemberSNInfoBackend": //"停權-用戶狀態選停權戶"(上方鍵)
        case "UpdateMemberRisksInfoBackendIsFSuspension": //"還原或停權"
            var user = await apis.getUser(unique); //即時更新會比較保險
        case "btnUserSet":
            apis.updateUser(user, sendData.ishow, sendData.isOpenDeposit)
        case "UpdateMemberRiskInfoAccountingBackend":
            apis.updateUser(user, sendData.MemberStatus, sendData.IsDeposit)

        case "StopMember": //停權
            if (respData == 2) {
                apis.updateUser(user, 2, 0)
            }
        case "UpdateMemberRisksInfoBackendIsFSuspension": //"還原或停權"
            if (sendData.IsFSuspension == true) {
                apis.updateUser(user, 0, 0)
            }
        case "UpdateMemberSNInfoBackend": //"停權-用戶狀態選停權戶"(上方鍵)

            apis.updateUser(user, sendData.MemberStatus, sendData.IsDeposit)

            console.log(user);
            console.log(".........");

            //updateUser(user, status, permit)


            break;


            //GetMemberRisksInfoBackendByAccountID
            //CreateMemberInfoOperationLog
            /*
        case "UpdateMemberRiskInfoAccountingBackend":
        case "btnUserSet":
            var user = await apis.getUser(unique); //即時更新會比較保險
            user.module = (user.status[0] == 3) ? "authorize" : "suspended";
            user.status.push(sendData.ishow || sendData.MemberStatus)
            user.permit.push(sendData.isOpenDeposit || sendData.IsDeposit)
            user.timing.push(Date.now())
            user.timing.timeDiff();
            if(user.status[0] == 3 || user.status[1] == 1) { user.sendSms = true; }
            console.log("+[DONE]+ ", user.module, user);
            return apis.putUser(user);
            //開通
        case "StopMember": //停權
            console.log("StopMember");
            console.log(params);
            if(respData == 2) {
                var user = await apis.getUser(unique);
                user.status.push(sendData.MemberStatus || 2)
                user.permit.push(sendData.IsDeposit || 0)
                user.timing.push(Date.now())
                user.timing.timeDiff();
                user.module = (user.status[0] == 3) ? "authorize" : "suspended";
                //審核中轉停權:開通表，或是其它狀態轉停權:停權表
                console.log("+[DONE]+ ", user.module, user);
                return apis.putUser(user);
            };
            break;
        case "UpdateMemberSNInfoBackend": //"停權-用戶狀態選停權戶"(上方鍵)
            var user = await apis.getUser(unique);
            user.status.push(sendData.MemberStatus)
            user.permit.push(sendData.IsDeposit)
            user.timing.push(Date.now())
            user.timing.timeDiff();
            user.module = (user.status[0] == 3) ? "authorize" : "suspended";
            //審核中轉停權:開通表，或是其它狀態轉停權:停權表
            console.log("+[DONE]+ ", user.module, user);
            return apis.putUser(user);
            break;
        case "UpdateMemberRisksInfoBackendIsFSuspension": //"還原或停權"
            var user = await apis.getUser(unique);
            if(sendData.IsFSuspension == true) {
                user.status.push(0)
                user.permit.push(0)
                user.timing.push(Date.now())
                user.timing.timeDiff();
                user.module = (user.status[0] == 3) ? "authorize" : "suspended";
                //審核中轉停權:開通表，或是其它狀態轉停權:停權表
                console.log("+[DONE]+ ", user.module, user);
                return apis.putUser(user);
            }
            break;

*/

            //禮金表列表
            /*刪除*/
            /*給點*/
        case "delDiceWinRecords":
        case "DelDiceWinRecords":
            console.log(params);
            if (respData == 1) { window.cacheBonusData = sendData }
            break;
        case "getDepositBonusList":
        case "DepositBonus":
            var bonus = respData.rows.find((d) => {
                return d.f_id == window.cacheBonusData.id //&& d.f_AdminName == operator
            });
            var unique = bonus.f_accounts + '-' + channel;
            var user = await apis.getUser(unique);
            user.bonus = bonus;
            user.module = "bonus:wa111";
            console.log(bonus);
            console.log(user);
            return apis.putUser(user);
            //console.log(respData.rows);
            break;


            //禮金表功能
        case "UpdateMemberBonusLog":
            //console.log(params);
            if (respData == 1) { window.cacheBonusData = sendData }
            break;


        case "GetMemberBonusLogBackendByCondition":

            var bonus = dataRows.find((d) => {
                return d.BonusNumber == window.cacheBonusData.BonusNumber
                //&& d.Creator == operator
            });

            var unique = bonus.AccountID + '-' + channel;
            var user = await apis.getUser(unique);

            console.log(unique, user);
            user.bonus = bonus;
            user.module = "bonus:ku711";
            console.log(bonus);



            break;
        default:
            return Promise.resolve()
            //console.log('reject', action);
            return Promise.reject()
            break;

    }



    /*
    //if (xmlSpider[action]) { Promise.reject(403) }

    console.log(params.action, params);
    console.log(xmlSpider[params.action]);

    if (xmlSpider[params.action]) {
        console.log(111);
        return xmlSpider[params.action](params, params)
        //return xmlSpider[params.action].call(params)
    } else {
        console.log(403);

        return Promise.reject(403)
    }
    */

    /*console.log(params.action);
    if (xmlSpider[params.action]) {
        return xmlSpider[params.action].call(params)
    }*/
};