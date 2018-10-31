define(['@api'], function(apiFunction) {

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
    var title = null,
        value = null;
    var user = { timer: [], author: { title: null, value: null, }, locate: { title: null, value: null, region: {} }, mobile: { title: null, value: null, region: {} }, idcard: { title: null, value: null, region: {} }, banker: { decode: null, code: [], name: [], city: [], prov: [] } /* [{ title, value, region: {} }, { title, value, region: {} }, { title, value, region: {} }, { title, value, region: {} }, { title, value, region: {} }, { title, value, region: {} } ]*/ }

    if(['21', '2'].includes(evo.channel)) {}

    if(['26', '35', '17'].includes(evo.channel)) {

        var ctrlMAP = {
            "f_ishow": "user.status",
            "f_depositStatus": "user.deposit",
            //"isOpenDeposit": "user.deposit",
            "f_accounts": "user.account",
            "f_RemittanceAccount": "user.banker.decode",
            //"f_BankCode": "user.banker.name",
            "f_photo": "user.mobile.value",
            "f_idCard": "user.idcard.value",
            "f_blacklist": "user.isBlack",
            "f_accounts": "user.account",
            "f_RemittanceName": "user.author.value",
            "f_alagent": "user.agency",
            "f_birthday": "user.birthday",
            "f_joindate": "user.attach",
            "f_peril": "user.peril",
            "f_time": "user.timer[0]",
            "lblIp": "user.locate.value",
            //"lblIp": "user.locate.title",
            "txtIdCard": "user.idcard.title",
            "txtPhoto": "user.mobile.title",
            "txtRemittaceName": "user.author.title",

            "BankCode111": "user.banker.name[0]",
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

            "txtRemittanceAccount111": "user.banker.code[0]",
            "txtRemittanceAccount111_2": "user.banker.code[1]",
            "txtRemittanceAccount111_3": "user.banker.code[2]",
            "txtRemittanceAccount111_4": "user.banker.code[3]",
            "txtRemittanceAccount111_5": "user.banker.code[4]",
        }
    }

    function runMAP([prop, value]) {
        var prop = prop.split('$').pop();
        if(ctrlMAP.hasOwnProperty(prop)) { eval(ctrlMAP[prop] + "='" + value + "'") }
    }

    function forEach(entries) { entries.forEach(runMAP) }

    function assign(args) { return Object.assign({}, ...args); }

    function extend(obj) {
        var { account, channel, host, origin, operator } = evo;
        return Object.assign(user, { account, channel, host, origin, operator })
    }

    function setUser() {
        return Promise.all([
            apiFunction.getPhoneDate(),
            apiFunction.getAllUser(),
            apiFunction.getSystemLog().then(findTransferTime1),
        ]).then(assign).then(entries).then(forEach);
    }


    function setUser2() {;;
        [...document.querySelectorAll('select')].map(({ name, value }) => { return [name, value]; })
            .forEach(runMAP);;;
        [...document.querySelectorAll('input')].map(({ name, value }) => { return [name, value]; })
            .forEach(runMAP);;
        [...document.querySelectorAll('span')].map(({ id, outerText }) => { return [id, outerText]; })
            .forEach(runMAP);

        console.log(user);

    }

    setUser()

    setUser2()


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



return


//console.log($("input").serializeArray());
//console.log($("input").serialize());
//console.log($("input").serializeObject());



/*
        console.log([...new FormData(aspnetForm)]);
        [...new FormData(aspnetForm)].forEach(runMAP);
       console.log(user);*/

//.forEach(runMAP);