define(['@api'], function(apiFunction) {
    var user = {
        timer: [],
        author: { title: null, value: null, },
        locate: { title: null, value: null, region: {} },
        mobile: { title: null, value: null, region: {} },
        idcard: { title: null, value: null, region: {} },
        banker: { title: [], value: [], name: [], city: [], prov: [] }
    }

    if (['21', '2'].includes(evo.channel)) {}

    if (['26', '35', '17'].includes(evo.channel)) {
        var USERMAP = {
            "f_ishow": "user.status",
            "f_depositStatus": "user.deposit",
            "f_accounts": "user.account",
            "f_RemittanceAccount": "user.banker.value",
            "f_photo": "user.mobile.value",
            "f_idCard": "user.idcard.value",
            "f_blacklist": "user.black",
            "f_RemittanceName": "user.author.value",
            "f_alagent": "user.agency",
            "f_birthday": "user.birthday",
            "f_joindate": "user.attach",
            "f_peril": "user.peril",
            "f_time": "user.timer[0]",
            "lblIp": "user.locate.value",
            "txtIdCard": "user.idcard.title",
            "txtPhoto": "user.mobile.title",
            "txtRemittaceName": "user.author.title",
            "txtRemittanceAccount": "user.banker.title",
            "BankCode": "user.banker.meta",
            "ddlCity": "user.banker.prov",
            "ddlCityArea": "user.banker.city"
        }
    }

    function setUser() {
        return Promise.all([
            $serializeObject('#lblIp'),
            $serializeObject('input'),
            $serializeObject('select'),
            apiFunction.getPhoneDate(),
            apiFunction.getUserStore(),
            apiFunction.getSystemLog().then(timerFilter1),
        ]).then((args) => {
            var obj = Object.assign({}, ...args);
            var arr = Object.entries(obj);
            arr.forEach(([prop, value]) => { if (USERMAP.hasOwnProperty(prop)) { eval(USERMAP[prop] + "=value") } });
            /****************************************/
            user.locate.title = user.locate.value;
            user.banker = user.banker.value.map((value, index) => {
                return {
                    title: user.banker.title[index],
                    value: user.banker.value[index],
                    region: { prov: user.banker.prov[index], meta: user.banker.meta[index], city: user.banker.city[index] }
                }
            });
            console.log(user);
        })
    }

    setUser()




    function timerFilter2(rows) { //用户状态   【审核中】   被修改为   【正常户】
        return rows.find(function({ f_field, f_oldData, f_newData }) {
            return f_field == "f_ishow$log$f_intualStatus$log$f_depositStatus" && f_oldData == "3$log$0$log$0" && f_newData == "1$log$1$log$1"
        });
    }

    function timerFilter1(rows) { //用户状态   【静止户】   被修改为   【审核中】
        return rows.find(function({ f_field, f_oldData, f_newData }) {
            return f_field == "f_ishow" && f_oldData == "0" && f_newData == "3"
        });
    }

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


//var ddl = dropdownTransfer(ctl00_ContentPlaceHolder1_ishow)

//console.log($("input").serializeArray());
//console.log($("input").serialize());
//console.log($("input").serializeObject());



/*
        console.log([...new FormData(aspnetForm)]);
        [...new FormData(aspnetForm)].forEach(runMAP);
       console.log(user);*/

//.forEach(runMAP);