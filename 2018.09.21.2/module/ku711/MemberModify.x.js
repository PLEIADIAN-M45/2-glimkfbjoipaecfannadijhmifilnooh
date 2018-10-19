
/*
var MemberStatus = { "0": "停权户", "1": "正常户", "2": "静止户", "3": "審核中", "4": "测试户", "5": "推广户" }
var IsDeposit = { "0": "否", "1": "是", "true": "是", "false": "否" }
*/

var MemberStatus = { "0": "停權戶", "1": "正常戶", "2": "靜止戶", "3": "審核中", "4": "測試戶", "5": "推廣戶" }
var IsDeposit = { "0": "否", "1": "是", "true": "是", "false": "否" }








    //localStorage['BANKCITY'] = angular.toJson($2)


    //.toObj('CityID', 'CityName')

    //console.log($scope);
    //var $2 = localStorage['BANKCITY'] || getModule('CityInfoList').toObj('CityID', 'CityName');

    //var mb = getModule('CityInfoList')
    //.toObj('CityID', 'CityName');

    //console.log('+++', mb);
    //var vv = getModule('CityInfoList')
    //console.log(vv);
    //.toObj('CityID', 'CityName');

    /*if (typeof $2 == 'object') { localStorage['BANKCITY'] = angular.toJson($2) } else
    if (typeof $2 == 'string') { $1 = angular.fromJson($2) }
    return $2;*/

/*
function transferComplete(_postData, xhr) {
    var postData = angular.fromJson(_postData);
    var { _url } = xhr;
    var path = _url.split('/').pop();
    switch (path) {
        case 'UpdateMemberRiskInfoAccountingBackend':
            var status = [evo.user.status.value, postData.MemberStatus].map((x) => { return MemberStatus[x] })
            var deposit = [evo.user.deposit.value, postData.IsDeposit].map((x) => { return IsDeposit[x] })
            //console.log(evo.user.status.value, postData.MemberStatus);
            if (postData.IsDeposit == 1) {
                switch (evo.user.status.value) {
                    case 2:
                    case 3:
                        upload_1([...status, ...deposit], '111');
                        break;
                    default:
                        upload_1([...status, ...deposit], '999');
                        break;
                }
            }
            break;
        case 'UpdateMemberRisksInfoBackendIsFSuspension':
            if (postData.IsFSuspension == true) {
                var status = [evo.user.status.value, 0].map((x) => { return MemberStatus[x] });
                var deposit = [evo.user.deposit.value, 0].map((x) => { return IsDeposit[x] });
                switch (evo.user.status.value) {
                    case 1:
                    case 2:
                        upload_2([...status, ...deposit], '111');
                        upload_2([...status, ...deposit], '111');
                        break;
                    case 3:
                        upload_1([...status, ...deposit], '111');
                        break;
                    default:
                        upload_2([...status, ...deposit], '999');
                        break;
                }
            }
            break;
    }
    //case 'CreateMemberInfoOperationLog':break;
}

XMLHttpRequestWatch(transferComplete);
*/


/*

        evo.ctrl.deposit = true
        evo.ctrl.status = 1
        $scope.evo = evo

Object.defineProperty(evo.ctrl, 'deposit', {
    get: function() { return this.value; },
    set: function(value) {
        $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit = (value == 1) ? true : false;
        this.value = value;
    }
});
*/

/*
window.Tamper.GetLevelTypeInfoGetByLanguageCode
window.Tamper.GetProvincesInfoByLanguageCodeToExpando
window.Tamper.GetMemberSNInfoBackendByAccountID
window.Tamper.GetBankCodeInfoList
window.Tamper.GetMemberRisksInfoBackendByAccountID
window.Tamper.GetProvincesInfoByLanguageCodeToExpando
window.Tamper.GetCityInfoByLanguageCodeToExpando
window.Tamper.GetMemberStatusByLanguageCode
window.Tamper.GetProvincesInfoByLanguageCode
window.Tamper.GetCityInfoByCondition
*/

//console.log(XMLHttpRequest);

/*
XMLHttpRequest.addEventListener('load', function() {
    console.log(this);
    if (this.responseURL.includes('UpdateMemberRisksInfoBackendIsFSuspension')) {
        //alert(1)
    }
})*/


/*
https://bk.ku711.net/Member/api/MemberInfoManage/UpdateMemberRisksInfoBackendIsFSuspension
Request Method: POST
AccountID: "F61539"
IsFSuspension: true
*/

//console.log(getModule('GetMemberRiskInfoAccountingBackendByAccountIDOutput'));
//console.log(getModule('UpdateEditMemberInfoManage'));
//var deposit = $scope.ctrl.model.GetMemberRiskInfoAccountingBackendByAccountIDOutput.IsDeposit
//var status = $scope.ctrl.model.UpdateEditMemberInfoManage.MemberStatus;