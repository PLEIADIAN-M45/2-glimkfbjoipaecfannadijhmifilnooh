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
            .map((el, i) => { return [el.name.split('$').pop(), el.value]; });

        var c = smart(arr);

        console.log(c);

        resolve(c);
    })
}

function getExtraInfo() {
    return new Promise((resolve, reject) => {
        IDB.GetMemberList.get(evo.account).then(smart).then(resolve);
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

    if (!arr) { return {} }

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
                    if (value.includes('|')) { value = value.split('|'); }
                    if (value) { res[key1] = value; }
                }
            } catch (ex) {}
        }
    })
    //console.log(res);
    return res;
}


function getSystemLog() {
    return new Promise((resolve, reject) => {
        var { channel, host, account } = evo;
        evo.sendMessage({
            command: 'apiFunctions:SystemLog:host:channel',
            channel,
            host,
            account
        }).then(([logs]) => {
            logs.filter((x) => {
                if ((x.f_field == 'f_ishow' && x.f_oldData == 0 && x.f_newData == 3)) {
                    evo.user.timing = [x.f_time];
                    return resolve()
                }
            })
            return resolve()
        })
    })
}


function getAllUser(account) {
    fetch("http://127.0.0.1:26/LoadData/AccountManagement/GetMemberList.ashx?ddlWarn=0&f_Account=" + account + "&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=&txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=&selAccountType=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=1&pageIndex=1&hidevalue_RecordCount=1&type=getAllUser&_=1540123953088", { "credentials": "include", "headers": { "accept": "*/*", "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6", "x-requested-with": "XMLHttpRequest" }, "referrer": "http://127.0.0.1:26/Aspx/MemberList.aspx?sort=Font_xianyousuoyouhuiyuan", "referrerPolicy": "no-referrer-when-downgrade", "body": null, "method": "GET", "mode": "cors" })
        .then((res) => {
            return res.json()
        })
        .then(function(data) {
            console.log(data);
        })
}

function getModel(account) {
    fetch("http://127.0.0.1:26/LoadData/AccountManagement/MemberModify.ashx", {
            "credentials": "include",
            "headers": {
                "accept": "*/*",
                "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": "http://127.0.0.1:26/Aspx/MemberModify.aspx?account=JIABO1006",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": "action=getmodel&account=JIABO1006",
            "method": "POST",
            "mode": "cors"
        }).then((res) => {
            return res.json()
        })
        .then(function(data) {
            console.log('Request succeeded with JSON response', data);
        })
    //.then((resp) => { console.log(resp); })
}



/*
getAllUser();
getModel();
*/
//Object.keys(obj).forEach((key)=> console.log(`key: ${key}, value: ${obj[key]}`));
/*
function obj([name, value], index, array) {
    name = name.replace('ctl00$ContentPlaceHolder1$', '')
    Object.defineProperty(this, name, { value })
    //console.log(this);
    if (index == array.length - 1) {
        console.log(this);
    }
}*/


Array.prototype.serialize = function() {
    var obj = {};
    this.map(([longname, value], index) => {
        var name = longname.replace('ctl00$ContentPlaceHolder1$', '');
        Object.defineProperty(obj, name, { value, writable: true });
    });
    return obj;
}




function setUser(elems) {

    evo.pastData = [...new FormData(aspnetForm).entries()].serialize();
    assign(evo.pastData, { ishow: 1, isOpenDeposit: 1 })

  //  if (evo.user) { return updateUserStatus() } else { evo.user = {} };

    return Promise.all([
        getCtrl(),
        getExtraInfo(),
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




var ddl = {
    f_ishow: createDDL(ctl00_ContentPlaceHolder1_ishow),
    f_isOpenDeposit: createDDL(ctl00_ContentPlaceHolder1_isOpenDeposit),
    f_depositStatus: createDDL(ctl00_ContentPlaceHolder1_isOpenDeposit),
    status: createDDL(ctl00_ContentPlaceHolder1_ishow),
    deposit: createDDL(ctl00_ContentPlaceHolder1_isOpenDeposit),
    prov: createDDL(ctl00_ContentPlaceHolder1_ddlCity)
};

localStorage.ddl = json(ddl);




$(this).serializeArray();
$(c).serialize();

//[...new FormData(aspnetForm).entries()].map(obj, {})

/*$("form").submit(function(event) {
    console.log($(this).serializeArray());
    event.preventDefault();
});*/

/*
    var param = $.param({ a: [2, 3, 4] });
    console.log(param);
    console.log(decodeURIComponent(param));
    console.log($(aspnetForm));
    var c = $(aspnetForm).serializeArray()
    console.log(c);
    var str = $(c).serialize();
    //var str = $(aspnetForm).serialize();
    console.log(str);
    // [...new FormData(aspnetForm).entries()].map(obj, evo.fd = {})
    console.log(evo.fd);
*/


//console.log(new Map(fd));

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

/*
  evo.fetch('getAllUser')
      .then(s)

  return new Promise(function(resolve, reject) {
      evo.apiFunctions({
          command: 'apiFunctions:getAllUser:host:channel',
          account: evo.account
      }).then(smart).then(resolve);
  })
  */


/*return new Promise((resolve, reject) => {
    IDB.GetMemberList.get(evo.account).then(smart).then(resolve);
})*/
/*
return new Promise(function(resolve, reject) {
    $.getJSON(evo.origin + '/LoadData/AccountManagement/GetMemberList.ashx?ddlWarn=0&f_Account=' + evo.account + '&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=&txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=&selAccountType=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=1&pageIndex=1&hidevalue_RecordCount=1&type=getAllUser', (d) => {
        try { resolve(d.rows[0]); } catch (ex) { reject('getExtraInfo !!!') }
    })
})
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


/*
fetch('./api/some.json')
    .then(function(response) {
        if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
                response.status);
            return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
            console.log(data);
        });
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });*/

//resolveAfter2Seconds()







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
/*
console.time();
for (i = 0; i < 100000; i++) {
    // some code
}
console.timeEnd();
*/



console.time();
/*
console.log([...aspnetForm.elements]);

[...document.querySelectorAll('input,select,span')].map(({ id, name, value, outerText, localName }) => {
    console.log(id);
    var c;
    //console.log(evo.map());
})*/

evo.ctrl = {};
evo.user = {};
evo.pastData = {};
evo.elements = {};

var ctrl = [];

[...aspnetForm.elements]
.filter(({ name }) => name && !name.startsWith('__'))
    .map(function(el, i) {
        var name = el.name.split('$').pop();
        this.pastData[name] = el.value;
        this.elements[name] = el;
        var sname = name.replace(/(\d{0,3}_?\d)$/, '');
        this.ctrl[sname] = this.ctrl[sname] || [];
        this.ctrl[sname].push(el);
        return el;
    }, evo);

console.log(evo.elements);
console.log(evo.pastData);

entries(evo.ctrl).map(function([name, value]) {
    this[name] = (value.length == 1) ? value[0] : value;
}, evo.ctrl)

console.log(evo.ctrl);

//console.log([...ctrl.entries()]);





console.timeEnd();