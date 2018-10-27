if (location.host == "127.0.0.1" || evo.operator == "18C894") {
    //$('style').remove();
    $('#ctl00_ContentPlaceHolder1_btnStop').removeClass('btnReback')
}

if (['21', '2'].includes(evo.channel)) {

}


if (['26', '35', '17'].includes(evo.channel)) {
    evo.map = {
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
        "txtPhoto": "mobile",
        "txtIdCard": "idcard",
        "ishow": "status",
        "isOpenDeposit": "deposit",
        "txtRemittaceName": "author",
        "lblIp": "locate",
        "birthday": "birthday",
        "btnSaveInfo": "btnSave",
        "btnStop": "btnStop",
        "f_RemittanceAccount": "banker",
        "f_joindate": "attach",
        "f_alagent": "agency",
        "f_photo": "mobile",
        "f_idCard": "idcard",
        "f_blackList": "blacklist"
    }
}


function setCtrl() {
    [...aspnetForm.elements].filter(({ name }) => name && !name.startsWith('__')).map(function(el, i) {
        var _name = el.name.split('$').pop();
        var sname = _name.replace(/(\d{0,3}_?\d)$/, '');
        this[sname] = this[sname] || [];
        this[sname].push(el);
    }, evo.ctrl = {});
    entries(evo.ctrl).map(function([name, value]) { this[name] = (value.length == 1) ? value[0] : value; }, evo.ctrl)
}

setCtrl();

function updateUserStatus() {
    extend(evo.user, {
        status: ctl00_ContentPlaceHolder1_ishow.value,
        deposit: ctl00_ContentPlaceHolder1_isOpenDeposit.value
    })
    return putUser();
}

function getCtrl() {;
    [...document.querySelectorAll('span')].map((el) => {
        el.value = el.outerText;
        el.name = el.id;
    });

    return new Promise((resolve, reject) => {
        var arr = [...aspnetForm.elements]
            .concat([document.getElementById('lblIp')])
            .filter((el) => { return el.name })
            .map((el, i) => {
                var name = el.name.split('$').pop();
                return [name, el.value];
            });

        var c = smart(arr);
        resolve(c);
    })
}

function getAllUser() {
    return apiFunction.getAllUser().then(smart)
}

function getPhoneDate() {
    return apiFunction.getPhoneDate().then(smart)
}

function getSystemLog() {
    return apiFunction.getSystemLog().then((logs) => {
        logs.filter((x) => { if ((x.f_field == 'f_ishow' && x.f_oldData == 0 && x.f_newData == 3)) { evo.user.timing = [x.f_time]; } })
    })
}

function smart(arr) {
    if (!arr) { return {} } else { var res = {} };
    if (arr.constructor.name == "Object") { arr = Object.entries(arr) }

    arr.map(function([name, value]) {
        var key = evo.map[name];
        //console.log(key);
        if (key) {
            try {
                var keys = key.split('.');
                var key1 = keys[0];
                var key2 = keys[1];
                var value = (ddl[key2]) ? ddl[key2][value] : value.toString();
                if (key2) {
                    res[key1] = res[key1] || [];
                    res[key1][key2] = res[key1][key2] || [];
                    res[key1][key2].push(value);
                } else {
                    if (value.includes('|')) { value = value.split('|'); }
                    if (value) { res[key1] = value; }
                }
            } catch (ex) {}
        }
    })
    //console.log(res);
    return res;
}

function setUser(elems) {
    //console.log(evo.ctrl.txtRemittanceAccount);
    evo.pastData = [...new FormData(aspnetForm).entries()].serialize();
    if (evo.user) { return updateUserStatus() }
    evo.user = {};
    return Promise.all([
        getCtrl(),
        getAllUser(),
        getPhoneDate(),
        getSystemLog()
    ]).then(function([a, b, c, d, sheets = {}, region = {}]) {
        if (b.banker == undefined) { b.banker = [] };
        var { account, channel, host, origin, operator } = evo;
        assign(evo.user, a, b, c, { account, channel, host, origin, operator })
        var property = {
            author: { property: 'author', value: a.author, title: a.author, sheets },
            locate: { property: 'locate', value: a.locate, title: a.locate, sheets, region },
            mobile: { property: 'mobile', value: c.mobile, title: a.mobile, sheets, region, },
            idcard: { property: 'idcard', value: c.idcard, title: a.idcard, region, },
            banker: b.banker.filter((x) => x).map((value, i) => {
                var { meta, prov, city, title } = a.banker;
                return { property: 'banker', value: value, title: title[i], sheets: {}, region: { meta: meta[i], prov: prov[i], city: city[i] } }
            })
        }
        assign(evo.user, property);
        return putUser();
    })
};


function testStop() { assign(evo.pastData, { ishow: 1, isOpenDeposit: 1 }) }



var ddl = {
    f_ishow: createDDL(ctl00_ContentPlaceHolder1_ishow),
    f_isOpenDeposit: createDDL(ctl00_ContentPlaceHolder1_isOpenDeposit),
    f_depositStatus: createDDL(ctl00_ContentPlaceHolder1_isOpenDeposit),
    status: createDDL(ctl00_ContentPlaceHolder1_ishow),
    deposit: createDDL(ctl00_ContentPlaceHolder1_isOpenDeposit),
    prov: createDDL(ctl00_ContentPlaceHolder1_ddlCity)
};
localStorage.ddl = json(ddl);