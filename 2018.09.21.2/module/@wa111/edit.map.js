$scope.user = {
    timing: [],
    author: { title: null, value: null, },
    locate: { title: null, value: null },
    mobile: { title: null, value: null },
    idcard: { title: null, value: null },
    banker: { title: [], value: [], name: [], city: [], prov: [] }
}

if(['21', '2'].includes(evo.channel)) {}

if(['26', '35', '17'].includes(evo.channel)) {
    var USERMAP = {

        "f_ishow": "$scope.user.f_ishow",
        "f_depositStatus": "$scope.user.f_depositStatus",

        //"ishow": "$scope.user.ishow",
        //"isOpenDeposit": "$scope.user.isOpenDeposit",
        //"ishow": "$scope.user.ishow",
        //"f_depositStatus": "$scope.user.depositStatus",
        "ishow": "$scope.user.status",
        "isOpenDeposit": "$scope.user.deposit",

        "f_accounts": "$scope.user.account",
        "f_RemittanceAccount": "$scope.user.banker.value",
        "f_photo": "$scope.user.mobile.value",
        "f_idCard": "$scope.user.idcard.value",
        "f_blacklist": "$scope.user.black",
        "f_RemittanceName": "$scope.user.author.value",
        "f_alagent": "$scope.user.agency",
        "f_birthday": "$scope.user.birthday",
        "f_joindate": "$scope.user.attach",
        "f_peril": "$scope.user.peril",
        "f_time": "$scope.user.timing[0]",
        "lblIp": "$scope.user.locate.value",
        "txtIdCard": "$scope.user.idcard.title",
        "txtPhoto": "$scope.user.mobile.title",
        "txtRemittaceName": "$scope.user.author.title",
        "txtRemittanceAccount": "$scope.user.banker.title",
        "BankCode": "$scope.user.banker.meta",
        "ddlCity": "$scope.user.banker.prov",
        "ddlCityArea": "$scope.user.banker.city"
    }
}