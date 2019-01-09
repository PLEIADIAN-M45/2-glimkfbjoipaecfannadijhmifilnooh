define([], function() {

    return class apiFunction {

        constructor() {

        }


        getBanker() {
            return Promise.all([
                getModule('GetMemberWithdrawalBankInfoBackendByAccountIDOutput'),
                getModule('EditBankInfoList').then(toObj8),
                getModule('CityInfoList').then(toObj8),
                getModule('ProvinceInfoListForMemberInfo').then(toObj8)
            ]).then(([banker, meta, city, prov]) => { return $scope.user.banker = banker.filter((x) => x.IsSQL).map((c, i) => { return { title: c.PayeeAccountNoShow, value: c.PayeeAccountNo, region: { meta: meta[c.BankCodeID], prov: prov[c.BankProID], city: city[c.BankCityID] } } }) })
        }


        getStatus() {

            return Promise.all([

                getModule('UpdateEditMemberInfoManage.MemberStatus'),
                getModule('GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit')

            ]).then(([status, permit]) => {


                $scope.user.status.push(status);
                $scope.user.permit.push(permit);
                return $scope.user;
            })
            
        }

        getSystemLog() {
            return apiFunction.getSystemLog().then((logs) => {
                return logs.filter(({ Content, OperateTime, Operator }) => {
                    return Content.filter((obj) => {
                        if ((obj.FieldName == 'MemberStatus' && obj.BeforeValue == 2 && obj.AfterValue == 3)) {
                            return evo.assign($scope.user, { timing: [OperateTime] });
                        }
                    })
                })
            })
        }


        getMemberBankAccsEnum() {
            return ['PayeeAccountNo0', 'PayeeAccountNo1', 'PayeeAccountNo2', 'PayeeAccountNo3', 'PayeeAccountNo4'].map(getElementById);
        }
    }


});




/*function getModule(objPath) {


	console.log(this);


    return new Promise((resolve, reject) => {

        var object = (objPath.includes('ctrl')) ? $scope : $scope.ctrl.model;


        (function repeater(object) {
            var alphaVal = objPath.split('.').reduce(function(object, property) { return object[property]; }, object);
            if (alphaVal == undefined) { setTimeout(function() { repeater(object) }, 500); } else {
                if (typeof alphaVal == "object") {
                    if (Object.keys(alphaVal).length) { resolve(alphaVal); } else { setTimeout(function() { repeater(object) }, 500) };
                } else { resolve(alphaVal); }
            }
        }(object));
    })
}*/




//console.log(getModule);
/*
define([], function() {
    return class apiFunction {

    }
})
*/