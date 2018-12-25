define(['myApp', 'dexie', 'common', evo.extend], function(myApp, Dexie) {
    evo.stylesheet = ['MemberList'];
    requireStylesheet();
    if (window.opener) {
        var flag = 0;
        window.addEventListener('message', function(e) {
            if (e.data.unique) {
                if (flag == 0) {
                    console.log(e);
                    flag = 1
                    if (evo.siteNumber == '16') {
                        myApp.$scope.ctrl.model.SearchMemberInfoManage[e.data.param] = e.data.value;
                        myApp.$scope.ctrl.Search();
                    } else {
                        window[e.data.param].value = e.data.value;
                        search();
                    }
                }
            }
        }, false);
    }


    //console.log(evo.db.GetMemberList);
    //evo.db.GetMemberList.where("uniqueId").aboveOrEqual('1870497282-26').modify({ f_RemittanceAccount: "6222082005001315680|||||" });

    if (evo.host === 'wa111') {
        $(document).ajaxComplete(function(event, xhr, settings) {
            if (settings.url.includes("GetMemberList.ashx")) {
                var d = angular.fromJson(xhr.responseText)
                console.group()
                for (let m of d.rows) {
                    //console.log(m);
                    m.uniqueId = m.f_accounts + '-' + evo.siteNumber;
                    evo.db.MemberList.put(m);
                    //.where("shoeSize").aboveOrEqual(47).modify({ isBigfoot: 1 });

                }
                console.groupEnd()
            }
        });

    }
});