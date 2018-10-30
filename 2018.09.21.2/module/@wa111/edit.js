//define(['host.Api'], function(apiFunction) {
define(['@api'], function(apiFunction) {

    if (['21', '2'].includes(evo.channel)) {}

    if (['26', '35', '17'].includes(evo.channel)) {


        var ctrlMAP = {
            "BankCode111": "banker.meta",
            "BankCode111_2": "banker.meta",
            "BankCode111_3": "banker.meta",
            "BankCode111_4": "banker.meta",
            "BankCode111_5": "banker.meta",
            "txtRemittanceAccount111": "banker.title",
            "txtRemittanceAccount111_2": "banker.title",
            "txtRemittanceAccount111_3": "banker.title",
            "txtRemittanceAccount111_4": "banker.title",
            "txtRemittanceAccount111_5": "banker.title",
            "ddlCityArea": "banker.city",
            "ddlCityArea2": "banker.city",
            "ddlCityArea3": "banker.city",
            "ddlCityArea4": "banker.city",
            "ddlCityArea5": "banker.city",
            "ddlCity": "banker.prov",
            "ddlCity2": "banker.prov",
            "ddlCity3": "banker.prov",
            "ddlCity4": "banker.prov",
            "ddlCity5": "banker.prov",
            /*"txtPhoto": "mobile",
            "txtIdCard": "idcard",
            "ishow": "status",
            "isOpenDeposit": "deposit",
            "txtRemittaceName": "author",
            "lblIp": "locate",
            "birthday": "birthday",
            "btnSaveInfo": "btnSave",
            "btnStop": "btnStop",*/
        }


        var userMAP = {
            //"f_id": "seq",
            "f_accounts": "account",
            "f_ishow": "status",
            "f_depositStatus": "deposit",
            "f_RemittanceName": "author",
            "f_photo": "mobile",
            "f_idCard": "idcard",
            "f_RemittanceAccount": "banker",
            "f_BankCode": "banker.code",
            "f_birthday": "birthday",
            "f_alagent": "agency",
            "f_joindate": "attach",
            "f_peril": "isDanger",
            "f_blackList": "isBlack",
            "f_time": "f_time",
            /*
             "f_domain": "domain",
             "f_email": "email",
             "f_intualStatus": "intualStatus",
             "f_nickName": "nickName",
             "list_Accounts": "list_Accounts",
             "list_RemittanceAccount": "list_RemittanceAccount",
             "list_RemittanceName": "list_RemittanceName",
             */
        }
    }

    function findTransferTime2(rows) { //用户状态   【审核中】   被修改为   【正常户】
        return rows.find(function({ f_field, f_oldData, f_newData }) {
            return f_field == "f_ishow$log$f_intualStatus$log$f_depositStatus" && f_oldData == "3$log$0$log$0" && f_newData == "1$log$1$log$1"
        });
    }

    function findTransferTime1(rows) { //用户状态   【静止户】   被修改为   【审核中】
        return rows.find(function({ f_field, f_oldData, f_newData }) {
            return f_field == "f_ishow" && f_oldData == "0" && f_newData == "3"
        });
    }


    var _ELEMENTS = [...aspnetForm.elements];

    _ELEMENTS.filter(function(el) {
        var prop = el.name.split('$').pop();
        if (ctrlMAP.hasOwnProperty(prop)) {
            prop = ctrlMAP[prop];
            this[prop] = this[prop] || [];
            this[prop].push(el);
        }
    }, evo.ctrl = {});


    function setUser() {
        return Promise.all([
            apiFunction.getPhoneDate(),
            apiFunction.getAllUser(),
            apiFunction.getSystemLog().then(findTransferTime1),
        ]).then(function(arr) {
            var obj = Object.assign({}, ...arr);
            var user = {};
            Object.entries(obj).forEach(([prop, value]) => {
                if (userMAP.hasOwnProperty(prop)) {
                    prop = userMAP[prop];
                    user[prop] = user[prop] || [];
                    user[prop].push(value);
                }
            })
            console.log(user);
        })
    }



    function dropdownTransfer(dropdown) {
        [...dropdown.options].forEach(function({ value, label }) { this[value] = label; }, obj = {});
        return obj;
    }

    //selectedOptions


    var prov = [
        ctl00_ContentPlaceHolder1_ddlCity,
        ctl00_ContentPlaceHolder1_ddlCity2,
        ctl00_ContentPlaceHolder1_ddlCity3,
        ctl00_ContentPlaceHolder1_ddlCity4,
        ctl00_ContentPlaceHolder1_ddlCity5
    ];

    var city = [
        ctl00_ContentPlaceHolder1_ddlCityArea,
        ctl00_ContentPlaceHolder1_ddlCityArea2,
        ctl00_ContentPlaceHolder1_ddlCityArea3,
        ctl00_ContentPlaceHolder1_ddlCityArea4,
        ctl00_ContentPlaceHolder1_ddlCityArea5
    ]

    console.log(prov);
    console.log(city);
    


    var ddl = dropdownTransfer(ctl00_ContentPlaceHolder1_ishow)

    setUser()


    function openDeposit({ host }) {
        evo.ctrl.deposit.value = 1;
        evo.ctrl.btnSave.click();
    }

    function openLoginLog() {
        if (evo.test) {
            window.open(`${location.origin}/IGetMemberInfo.aspx?siteNumber=${evo.channel}&member=${evo.account}`, '_blank');
        } else {
            window.open(`http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=${evo.channel}&member=${evo.account}`, '_blank');
        }
    }

    return { setUser, openDeposit, openLoginLog }
});












//console.log(allCtrl);

/*
var ctrls = {}
var prov = allCtrl.filter(([name, value]) => {
    return name.includes('BankCode111')
})
var city = allCtrl.filter(([name, value]) => {
    return name.includes('ddlCity')
})
var area = allCtrl.filter(([name, value]) => {
    return name.includes('ddlCityArea')
})
console.log(prov);
console.log(city);
console.log(area);
*/