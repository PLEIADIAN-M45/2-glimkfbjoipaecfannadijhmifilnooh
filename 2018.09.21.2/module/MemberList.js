define([evo.extend], function(a) {

    //console.log(evo.extend);

    myApp.$controller = function() {
        if (window.opener) {
            var flag = 0;
            window.addEventListener('message', function(e) {
                if (e.data.unique) {
                    if (flag == 0) {
                        console.log(e);
                        flag = 1
                        if (evo.channel == '16') {
                            $scope.ctrl.model.SearchMemberInfoManage[e.data.param] = e.data.value;
                            $scope.ctrl.Search();
                        } else {
                            window[e.data.param].value = e.data.value;
                            search();
                        }
                    }
                }
            }, false);
        }
    }

    $scope.defineProperties({
        debug: function() {

        },
        components: [],
        stylesheet: ['MemberList']
    }).then(bootstrap)


});



//console.groupCollapsed('GetMemberList')
//console.groupEnd()
//console.log(evo.db.GetMemberList);
//evo.db.GetMemberList.where("uniqueId").aboveOrEqual('1870497282-26').modify({ f_RemittanceAccount: "6222082005001315680|||||" });
//.where("shoeSize").aboveOrEqual(47).modify({ isBigfoot: 1 });