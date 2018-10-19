if (location.host == "127.0.0.1" || evo.operator == "18C894") {
    //$('style').remove();
    $('#ctl00_ContentPlaceHolder1_btnStop').removeClass('btnReback')
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

var ddl = {
    f_ishow: createDDL(ctl00_ContentPlaceHolder1_ishow),
    f_isOpenDeposit: createDDL(ctl00_ContentPlaceHolder1_isOpenDeposit),
    f_depositStatus: createDDL(ctl00_ContentPlaceHolder1_isOpenDeposit),
    status: createDDL(ctl00_ContentPlaceHolder1_ishow),
    deposit: createDDL(ctl00_ContentPlaceHolder1_isOpenDeposit),
    prov: createDDL(ctl00_ContentPlaceHolder1_ddlCity)
};

localStorage.ddl = json(ddl);


function updateUserStatus() {
    var { status, deposit } = evo.ctrl;
    return extend(evo.user, { status: status.value, deposit: deposit.value })
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
            .map((el, i) => { return [el.name.split('$').pop(), el.value]; });
        resolve(smart(arr));
    })
}

function getExtraInfo() {
    return new Promise((resolve, reject) => {
        IDB.GetMemberList.get(evo.account)
            .then(smart).then(resolve);
    })
}

function getPhoneDate() {
    return new Promise(function(resolve, reject) {
        evo.apiFunctions({
            command: 'apiFunctions:getPhoneDate:host:channel',
            params: { type: 'getPhoneDate', account: evo.account },
        }).then(smart).then(resolve);
    })
}

function smart(arr) {

    if (arr.constructor.name == "Object") { arr = Object.entries(arr) }

    var res = {};
    arr.map(function([name, value]) {
        var key = evo.map[name];
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
                    console.log(key1);

                    if (value.includes('|')) { value = value.split('|'); }
                    if (value) { res[key1] = value; }
                }
            } catch (ex) {}
        }
    })
    return res;
}




function setUser(elems) {

    //if (evo.user) { return evo.user };

    return Promise.all([
        getCtrl(),
        getExtraInfo(),
        getPhoneDate()
    ]).then(function([a, b, c, sheets = {}, region = {}]) {

        if (b.banker == undefined) { b.banker = [] };

        var { account, channel, host, origin, operator } = evo;
        var user = assign({}, a, b, c, { account, channel, host, origin, operator })

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

        evo.user = assign(user, property);
        evo.user.region = [];

        return putUser();
    })
};

/*
function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling');
    var result = await resolveAfter2Seconds();
    bcb = result
    console.log(result);
    // expected output: 'resolved'
}
*/



var a = function(x) {
    console.log(x);
}

/*
Promise.resolve(function a(x) {
    console.log(x);
})*/


function resolveAfter2Seconds() {
    return new Promise(a => {
        console.log(1, 2);
        setTimeout(() => {
            a('resolved');
        }, 2000);
    });
}


resolveAfter2Seconds()







/*
async function asyncCall() {
    console.log('calling');
    var result = await resolveAfter2Seconds();
    bcb = result
    console.log(result);
    // expected output: 'resolved'
}


console.log(resolveAfter2Seconds);

var bcb = asyncCall();


console.log(bcb);
<<<<<<< HEAD
*/

=======

*/
>>>>>>> 907a1560687151b72efe0677d776c6c14ed72df2































function __mod2() {
    var properties = [
        { property: 'author', value: a.author, title: a.author, sheets },
        { property: 'locate', value: a.locate, title: a.locate, sheets, region },
        { property: 'mobile', value: c.mobile, title: a.mobile, sheets, region, },
        { property: 'idcard', value: c.idcard, title: a.idcard, region, }
    ];
    b.banker.filter((x) => x).map((value, i) => {
        var { meta, prov, city, title } = a.banker;
        properties.push({
            property: 'banker',
            value: value,
            title: title[i],
            region: {
                meta: meta[i],
                prov: prov[i],
                city: city[i]
            }
        })
    });
    var { account, channel, host, origin, operator } = evo;
    evo.user = assign({}, a, b, c, { account, channel, host, origin, operator, properties });
    return putUser();
}




/*var properties = {
    author: { property: 'author', value: a.author, title: a.author, sheets },
    locate: { property: 'locate', value: a.locate, title: a.locate, sheets, region },
    mobile: { property: 'mobile', value: c.mobile, title: a.mobile, sheets, region },
    idcard: { property: 'idcard', value: c.idcard, title: a.idcard, region, }
};*/






/*
var properties = {
            author: { property: 'author', value: a.author, title: a.author, sheets },
            locate: { property: 'locate', value: a.locate, title: a.locate, sheets, region },
            mobile: { property: 'mobile', value: c.mobile, title: a.mobile, sheets, region },
            idcard: { property: 'idcard', value: c.idcard, title: a.idcard, region, },
            banker: b.banker.split('|').filter((x) => x).map((value, i) => {
                var { meta, prov, city, title } = a.banker;
                return { property: 'banker', value: value, title: title[i], region: { meta: meta[i], prov: prov[i], city: city[i] } }
            })
        }
        */