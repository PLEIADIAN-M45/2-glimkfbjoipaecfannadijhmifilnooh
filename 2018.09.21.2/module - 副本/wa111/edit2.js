//define(['host.Api'], function(apiFunction) {
define(['@api'], function(apiFunction) {

    if(['21', '2'].includes(evo.channel)) {}

    if(['26', '35', '17'].includes(evo.channel)) {

        var ctrlMAP = {
            "BankCode111": "banker.meta",
            "BankCode111_2": "banker.meta",
            "BankCode111_3": "banker.meta",
            "BankCode111_4": "banker.meta",
            "BankCode111_5": "banker.meta",
            "txtRemittanceAccount111": "banker.title[0]",
            "txtRemittanceAccount111_2": "banker.title[1]",
            "txtRemittanceAccount111_3": "banker.title[2]",
            "txtRemittanceAccount111_4": "banker.title[3]",
            "txtRemittanceAccount111_5": "banker.title[4]",
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

            "f_accounts": "account",
            "f_ishow": "status",
            "f_depositStatus": "deposit",
            "f_RemittanceName": "author.value",
            "txtRemittaceName": "author.title",

            "f_photo": "mobile.value",
            "txtPhoto": "mobile.title",
            "f_idCard": "idcard.value",
            "txtIdCard": "idcard.title",
            "f_RemittanceAccount": "banker.code",
            "f_BankCode": "banker.name",
            "f_birthday": "birthday",
            "f_alagent": "agency",
            "f_joindate": "attach",
            "f_peril": "isDanger",
            "f_blackList": "isBlack",
            "f_time": "timer[0]",

        }


        var userMAP = {
            "f_accounts": "account",
            "f_ishow": "status",
            "f_depositStatus": "deposit",
            "f_RemittanceName": "author",
            "f_photo": "mobile",
            "f_idCard": "idcard",
            "f_RemittanceAccount": "banker.code",
            "f_BankCode": "banker.name",
            "f_birthday": "birthday",
            "f_alagent": "agency",
            "f_joindate": "attach",
            "f_peril": "isDanger",
            "f_blackList": "isBlack",
            "f_time": "f_time",

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


    function runMAP(el) {
        var prop = el.name.split('$').pop();
        console.log(prop);
        if(ctrlMAP.hasOwnProperty(prop)) {
            var prop = ctrlMAP[prop];
            switch (el.constructor.name) {
                case "HTMLSelectElement":
                    value = el.selectedOptions[0].label;
                    break;
                default:
                    value = el.value;
                    break;
            }
            if(value.toString().includes('|')) {
                user[prop] = value.split('|')
            } else {
                user[prop] = value
            }
        }
    }



    var user = {}


    function setUser2() {

        console.log([...document.querySelectorAll('input')].forEach(runMAP));

        console.log(user);
        //var arr = [...new FormData(aspnetForm)].forEach(runMAP);
        //console.log([new FormData(aspnetForm)]);

        /*.filter(function([name, value]) {
            var prop = name.split('$').pop();
            //console.log(prop);
            return ctrlMAP[prop];
        });*/

        // console.log(arr);
    }

    // setUser2()


    function setUser() {

        apiFunction.getAllUser().then(s)

        return

        function assign() { return Object.assign({}, ...arguments[0]); }

        function entries() {
            Object.entries(arguments[0]).map(([name, value]) => { return { name, value } }).forEach(runMAP);
        }

        function extend(obj) {
            var { account, channel, host, origin, operator } = evo;
            return Object.assign(user, { account, channel, host, origin, operator })
        }



        return Promise.all([
            apiFunction.getPhoneDate(),
            apiFunction.getAllUser(),
            apiFunction.getSystemLog().then(findTransferTime1),
        ]).then(assign).then(entries).then(extend).then(s)


        /*.then((x) => {

            var user = {
                author: {
                    value: x.f_RemittanceName,
                    title: x.f_RemittanceName
                },
                author: {
                    value: x.f_RemittanceName,
                    title: x.f_RemittanceName
                },
                author: {
                    value: x.f_RemittanceName,
                    title: x.f_RemittanceName
                },
            }


            console.log(user);


        })*/


        //.then(entries).then(extend).then(s)

        /*
                return Promise.all([
                    apiFunction.getBankValue(),
                    apiFunction.getBankCode(),
                    apiFunction.getBankName(),
                    apiFunction.getProvince(),
                    apiFunction.getBankCity(),
                ]).then(([value, title, meta, prov, city]) => {
                    var banker = [{}, {}, {}, {}, {}].map((a, i) => {
                        return {
                            title: title[i],
                            value: value[i],
                            region: {
                                meta: meta[i],
                                prov: prov[i],
                                city: city[i]
                            }
                        }
                    })
                    console.log(banker);
                })*/

        //.then(assign).then(entries).then(extend)
    }



    // ctrl.prov.forEach(runMAP);
    // ctrl.city.forEach(runMAP);
    //setUser().forEach(runMAP);




    var ddl = dropdownTransfer(ctl00_ContentPlaceHolder1_ishow)

    function openDeposit({ host }) {
        evo.ctrl.deposit.value = 1;
        evo.ctrl.btnSave.click();
    }

    function openLoginLog() {
        if(evo.test) {
            window.open(`${location.origin}/IGetMemberInfo.aspx?siteNumber=${evo.channel}&member=${evo.account}`, '_blank');
        } else {
            window.open(`http://161.202.9.231:8876/IGetMemberInfo.aspx?siteNumber=${evo.channel}&member=${evo.account}`, '_blank');
        }
    }

    return { setUser, openDeposit, openLoginLog }
});






/*
 "f_accounts": "account",
            "f_ishow": "status",
            "f_depositStatus": "deposit",
            "f_RemittanceName": "author",
            "f_photo": "mobile",
            "f_idCard": "idcard",
            "f_RemittanceAccount": "banker.code",
            "f_BankCode": "banker.name",
            "f_birthday": "birthday",
            "f_alagent": "agency",
            "f_joindate": "attach",
            "f_peril": "isDanger",
            "f_blackList": "isBlack",
            "f_time": "f_time",*/

/* var user3 = {
        author: {
            title: ,
            value: ,
            region: {

            }
        },
        locate: {
            title: ,
            value: ,
            region: {

            }

        },
        mobile: {
            title: ,
            value: ,
            region: {

            }

        },
        idcard: {
            title: ,
            value: ,
            region: {

            }
        },

        banker: [{
            title: ,
            value: ,
            region: {

            }
        }]
    }
*/


/*
    var _ELEMENTS = [...aspnetForm.elements];
    _ELEMENTS.filter(function(el) {
        var prop = el.name.split('$').pop();
        if(ctrlMAP.hasOwnProperty(prop)) {
            prop = ctrlMAP[prop];
            this[prop] = this[prop] || [];
            this[prop].push(el);
        }
    }, evo.ctrl = {});*/





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