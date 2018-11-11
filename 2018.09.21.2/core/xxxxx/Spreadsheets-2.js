define([], function() {
    console.log(13);

    function upload_888(pastData, postData) {
        if(pastData.MemberStatus == postData.MemberStatus) { return };

        getUser(evo).then((user) => {
            if(pastData.MemberStatus == postData.MemberStatus) { return }
            user.command = (pastData.MemberStatus == 3) ? "google:apiScripts:m88" : "google:apiScripts:m22";
            user.status = [pastData.MemberStatus, postData.MemberStatus];
            user.permit = [pastData.IsDeposit, postData.IsDeposit];
            user.timing.push(evo.now);
            evo.apiFunctions(user);
        })
    }

    function upload_111(pastData, postData) {
        getUser(evo).then((user) => {
            //pastData.ishow = 1;
            if(pastData.ishow == postData.ishow) { return }
            user.command = (pastData.ishow == 3) ? "google:apiScripts:m88" : "google:apiScripts:m22";
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
                if(f_AdminName === "") { return setTimeout(repeater, 1000, BSN); }
                if(Creator === "AUTO") { return setTimeout(repeater, 1000, BSN); }
                resolve(log);
            }(BSN));
        });
    }

    function upload_3(postData) {

        console.log(postData);

        return
        var apiFunctions = evo.apiFunctions;
        return Promise.all([
            getBonusLog(postData),
            getUser(postData)
        ]).then(s).then(apiFunctions);
    }


    return { upload_888, upload_111, upload_3 }
})