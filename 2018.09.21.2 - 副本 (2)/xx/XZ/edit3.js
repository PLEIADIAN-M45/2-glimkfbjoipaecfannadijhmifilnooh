//define(['host.Api'], function(apiFunction) {
define(['@api'], function(apiFunction) {

    if (['21', '2'].includes(evo.channel)) {}

    if (['26', '35', '17'].includes(evo.channel)) {

        var ctrlMAP = {
            /*"BankCode111": "banker.meta",
            "BankCode111_2": "banker.meta",
            "BankCode111_3": "banker.meta",
            "BankCode111_4": "banker.meta",
            "BankCode111_5": "banker.meta",
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
            "ddlCity5": "banker.prov",*/







            "f_ishow": "user.status",
            "f_depositStatus": "user.deposit",
            //"isOpenDeposit": "user.deposit",


            "f_accounts": "user.account",
            "f_RemittanceAccount": "user.banker.code",
            "f_BankCode": "user.banker.name",

            "f_photo": "user.mobile.value",
            "f_idCard": "user.idcard.value",

            "f_blacklist": "user.isBlack",
            "f_accounts": "user.account",

            "f_RemittanceName": "user.author.value",
            "f_alagent": "user.agency",
            "f_birthday": "user.birthday",
            "f_joindate": "user.attach",
            "f_peril": "user.isDanger",
            "f_time": "user.timer[0]"
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


    var user = { timer: [], author: { title: null, value: null, }, locate: { title: null, value: null, region: {} }, mobile: { title: null, value: null, region: {} }, idcard: { title: null, value: null, region: {} }, banker: [{ title, value, region: {} }, { title, value, region: {} }, { title, value, region: {} }, { title, value, region: {} }, { title, value, region: {} }, { title, value, region: {} }] }



    function runMAP(el) {
        var prop = el.name.split('$').pop();
        console.log(prop, ctrlMAP[prop], el.value);
        if (ctrlMAP.hasOwnProperty(prop)) {
            switch (el.constructor.name) {
                case "HTMLSelectElement":
                    eval(ctrlMAP[prop] + "='" + el.selectedOptions[0].label + "'")
                    break;
                default:
                    eval(ctrlMAP[prop] + "='" + el.value + "'")
                    break;
            }
        }
    }


    function setUser() {

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
        ]).then(assign).then(extend).then(s)
        //.then(s)
    }





    function setUser2() {
        // [...document.querySelectorAll('input')].forEach(runMAP);
        [...document.querySelectorAll('select')].forEach(runMAP);
        console.log(user);
    }




    var ddl = dropdownTransfer(ctl00_ContentPlaceHolder1_ishow)

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



function runMAP2(el) {
    var prop = el.name.split('$').pop();
    console.log(prop);
    if (ctrlMAP.hasOwnProperty(prop)) {
        var prop = ctrlMAP[prop];
        switch (el.constructor.name) {
            case "HTMLSelectElement":
                value = el.selectedOptions[0].label;
                break;
            default:
                value = el.value;
                break;
        }
        if (value.toString().includes('|')) {
            user[prop] = value.split('|')
        } else {
            user[prop] = value
        }
    }
}







    /*
        function serializeObject33() { //element to object
            var obj = {};
            $('select').map(function() {
                var name = this.name.split('$').pop().replace(/\d+_?/g, '');
                var value = this.selectedOptions[0].label;
                if (obj[name] == undefined) {
                    obj[name] = value;
                } else {
                    if (!obj[name].push) { obj[name] = [obj[name]]; }
                    obj[name].push(value);
                }
            })
            console.log(obj);
        }




        function setUser2() {;
            [...document.querySelectorAll('select')].map(({ name, value }) => { return [name, value]; })
                .forEach(runMAP);
            [...document.querySelectorAll('input')].map(({ name, value }) => { return [name, value]; })
                .forEach(runMAP);
            [...document.querySelectorAll('span')].map(({ id, outerText }) => { return [id, outerText]; })
                .forEach(runMAP);

            console.log(user);
        }
    */

    // console.log(...new FormData(aspnetForm).entries());

    /*
        apiFunction.getPhoneDate().then((obj) => {
            console.log(obj);
            var fd = new FormData(obj);
            console.log(fd.entries());
            console.log([fd.entries()]);
            console.log(...fd.entries());
        })*/


    /*
        console.log($.serializeObject(aspnetForm));*/

    //setUser()

    // setUser2()


// console.log($('input').serializeObject());

setUser()

//  console.log(serializeObject('input'));




/* "BankCode111": "user.banker.name[0]",
 "BankCode111_2": "user.banker.name[1]",
 "BankCode111_3": "user.banker.name[2]",
 "BankCode111_4": "user.banker.name[3]",
 "BankCode111_5": "user.banker.name[4]",

 "ddlCityArea": "user.banker.city[0]",
 "ddlCityArea2": "user.banker.city[1]",
 "ddlCityArea3": "user.banker.city[2]",
 "ddlCityArea4": "user.banker.city[3]",
 "ddlCityArea5": "user.banker.city[4]",

 "ddlCity": "user.banker.prov[0]",
 "ddlCity2": "user.banker.prov[1]",
 "ddlCity3": "user.banker.prov[2]",
 "ddlCity4": "user.banker.prov[3]",
 "ddlCity5": "user.banker.prov[4]",

 "txtRemittanceAccount111": "user.banker.encode[0]",
 "txtRemittanceAccount111_2": "user.banker.encode[1]",
 "txtRemittanceAccount111_3": "user.banker.encode[2]",
 "txtRemittanceAccount111_4": "user.banker.encode[3]",
 "txtRemittanceAccount111_5": "user.banker.encode[4]",*/