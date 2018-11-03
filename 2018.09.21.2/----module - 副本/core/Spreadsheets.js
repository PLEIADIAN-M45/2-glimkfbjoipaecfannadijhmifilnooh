function upload_888(pastData, postData) {
    if (pastData.MemberStatus == postData.MemberStatus) { return };
    getUser(evo).then((user) => {
        user.command = (pastData.MemberStatus == 3) ? "evo.statistics.m88" : "evo.statistics.m22";
        user.status = [pastData.MemberStatus, postData.MemberStatus];
        user.permit = [pastData.IsDeposit, postData.IsDeposit];
        user.timing.push(evo.now);
        evo.apiFunctions(user);
    })
}

function upload_111(pastData, postData) {
    getUser(evo).then((user) => {
        user.command = (pastData.ishow == 3) ? "evo.statistics.m88" : "evo.statistics.m22";
        user.status = [pastData.ishow, postData.ishow];
        user.permit = [pastData.isOpenDeposit, postData.isOpenDeposit];
        user.timing.push(evo.now);
        evo.apiFunctions(user);
    })
}

/***************************************************************************************/

function getBonusLog({ id, f_id, BonusNumber }) {
    console.log(id, f_id, BonusNumber);
    var BSN = f_id || id || BonusNumber;
    return new Promise((resolve, reject) => {;
        (function repeater(BSN) {
            console.log(BSN);
            var { f_AdminName, Creator } = log = json(sessionStorage[BSN]);
            if (f_AdminName === "") { return setTimeout(repeater, 1000, BSN); }
            if (Creator === "AUTO") { return setTimeout(repeater, 1000, BSN); }
            resolve(log);
        }(BSN));
    });
}

function upload_3(postData) {
    var apiFunctions = evo.apiFunctions;
    return Promise.all([
        getBonusLog(postData),
        getUser(postData)
    ]).then(s).then(apiFunctions);
}