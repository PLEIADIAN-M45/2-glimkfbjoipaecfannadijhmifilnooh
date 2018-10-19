var spreadsheets = {
    '开通表': 'https://docs.google.com/spreadsheets/d/1lbr9US1bTELbX-gOMMzNWXcz7HKOtUMycIbKhjeBABA/edit#gid=0',
    '停权表': 'https://docs.google.com/spreadsheets/d/1MYiScPY7xEbO4ypmwK6yzyzr8akn-YELGlIVPWmpbag/edit#gid=1309506964',
    '礼金表': 'https://docs.google.com/spreadsheets/d/1zzWv0g3ROLLlCFxgePFYMpCUgQ4JI5V1TuHWz6IdGy0/edit?pli=1#gid=42324241'
}

var spreadsheets = [
    ['https://docs.google.com/spreadsheets/d/1lbr9US1bTELbX-gOMMzNWXcz7HKOtUMycIbKhjeBABA/edit#gid=0'],
    ['https://docs.google.com/spreadsheets/d/1MYiScPY7xEbO4ypmwK6yzyzr8akn-YELGlIVPWmpbag/edit#gid=1309506964'],
    ['https://docs.google.com/spreadsheets/d/1zzWv0g3ROLLlCFxgePFYMpCUgQ4JI5V1TuHWz6IdGy0/edit?pli=1#gid=42324241']
]
/*
window.open(spreadsheets[0])
window.open(spreadsheets[1])
window.open(spreadsheets[2])
*/

var sel = {
    f_ishow: ["靜止戶", "正常戶", "停權戶", "審核中", "測試戶"],
    f_intualStatus: ["否", "是"],
    f_depositStatus: ["否", "是"]
}

/***************************************************************************************/

function systemLogFilter([logs]) {
    function spliter(arr) { return arr.split('$log$'); }

    function smart({ f_field, f_time, f_oldData, f_newData, f_target, f_handler }) {
        console.clear();
        var o = spliter(f_oldData);
        var n = spliter(f_newData);
        var r = spliter(f_field)
            .map((f, i) => { return [f, f_time, o[i], n[i]] })
            .map(([f, time, o, n]) => {
                return { time, field: f, nv: n, ov: o, result: (n == "1") ? "是" : "否", status_descr: [sel[f][o], sel[f][n]].join('->') }
            }).filter((obj) => {
                return obj.field == "f_ishow";
            })
        evo.user.log.push(...r);
    }
    evo.user.log = [];
    smart(logs.find((log) => { return log.f_field == "f_ishow$log$f_intualStatus$log$f_depositStatus" }));
    smart(logs.find((log) => { return log.f_field == "f_ishow" }));
    return evo.user;
}

function getSystemLog(user) {
    return new Promise((resolve, reject) => {
        evo.sendMessage({
            command: 'apiFunctions:SystemLog:host:channel',
            params: { account: user.account }
        }).then(resolve)
    })
}

/***************************************************************************************/
var apiFunctions = evo.apiFunctions;

function statistics1() {
    evo.sendMessage({ command: 'evo.statistics.m1', params: evo.user }).then(s)
}

function statistics1() {
    evo.sendMessage({ command: 'evo.statistics.m2', params: evo.user }).then(s)
}

/***************************************************************************************/
function upload_1() {
    getUser().then(getSystemLog).then(systemLogFilter).then(statistics1);
}

function upload_2() {
    getUser().then(getSystemLog).then(systemLogFilter).then(statistics2);
}


function getBonusLog({ id, f_id, BonusNumber }) {
    var BSN = f_id || id || BonusNumber;
    return new Promise((resolve, reject) => {;
        (function repeater(BSN) {
            var { f_AdminName, Creator } = log = json(sessionStorage[BSN]);
            if (f_AdminName === "") { return setTimeout(repeater, 1000, BSN); }
            if (Creator === "AUTO") { return setTimeout(repeater, 1000, BSN); }
            resolve(log);
        }(BSN));
    });
}


function upload_3(postData) {
    return Promise.all([
        getBonusLog(postData),
        getUser(postData)
    ]).then(apiFunctions);
}




/***************************************************************************************/


//if (log.AdjustTime) { resolve(log) } else { setTimeout(repeater, 1000, log) }

//console.log(BSN);






/***************************************************************************************/

















function statistics4(params) {
    var params = assign(...params);
    console.log(params);
    //evo.sendMessage({ command: 'evo.statistics.m4', params }).then(s)
}






/*
function getMemberBonus(user) {
    //console.log(user);
    return new Promise((resolve, reject) => {
        evo.apiFunctions({
            command: 'apiFunctions:MemberBonus:host:channel',
            params: { account: user.account }
        }).then((res) => {
            return assign(evo.user, res);
        }).then(putUser).then(resolve)
    })
}

*/

/*
return new Promise((resolve, reject) => {;
    (function repeater() {
        var log = json(sessionStorage[postData.BonusNumber]);
        //var bonus = json(log);
        if (log.AdjustTime) {
            resolve(log)
        } else {
            console.log(log.BonusNumber);
            setTimeout(repeater, 1000)
        }
        //console.log(bonus.AdjustTime);
    }());
    //assign(json(BonusLog))
    //resolve(json(BonusLog))
})*/









/*
var dic = { ishow: "用户状态", depositStatus: "存款状态", intualStatus: "初始状态" }
var dic = { f_ishow: "用户状态", f_depositStatus: "存款状态", f_intualStatus: "初始状态" }
var sel = json(localStorage['ddl']);
sel.f_intualStatus = sel.f_depositStatus
evo.entries(sel).map(([key, options]) => {
    options[key] = dic[key]
})
*/

/*
var status = {
    'wa111': ["靜止戶", "正常戶", "停權戶", "審核中", "測試戶"],
    'ku711': ["停權戶", "正常戶", "靜止戶", "審核中", "測試戶", "推廣戶"]
} [user.host];
*/


//upload_1()
//upload_2()


/*
var Status = {
    //審核 轉正常 (存款 關變開)
    //審核 轉停權 (存款 關變關)
    //正常 轉停權 (存款 關變開)

    search(logs, 'f_ishow$log$f_intualStatus$log$f_depositStatus', '3$log$0$log$0', '1$log$1$log$1');
    search(logs, 'f_ishow$log$f_intualStatus$log$f_depositStatus', '3$log$0$log$0', '1$log$1$log$1');
    search(logs, 'f_ishow', '3', '2'); //審核 轉停權
    search(logs, 'f_ishow', '3', '1'); //審核 轉正常
}

*/


//upload_2()


/*
logs.find(({ f_field, f_time, f_oldData, f_newData, f_target, f_handler }) => {

        if (log.f_field == "f_ishow$log$f_intualStatus$log$f_depositStatus") {
            var obj = {
                time: f_time,
                status: spliter(f_oldData)[0] + '-' + spliter(f_newData)[0],
                deposit: spliter(f_oldData)[2] + '-' + spliter(f_newData)[2],
            }
            console.log(obj);
            return evo.user.time2 = obj;
        }

        if (log.f_field == "f_ishow$log$f_intualStatus$log$f_depositStatus") {
            var obj = {
                time: f_time,
                deposit: spliter(f_oldData)[0] + '-' + spliter(f_newData)[0],
                status: spliter(f_oldData)[2] + '-' + spliter(f_newData)[2],
            }
            return evo.user.time2 = obj;
        }
    });
*/

//upload_3({ pas: 3, id: 1673504, type: 15, money: 588, _: 1538646244510 })
//upload_4({ "AccountID": "1164021641", "BonusNumber": "B018100919441365701", "BonusID": 1, "DealType": 2 })



//var uniqueId = res.AccountID + '-' + evo.channel;
//var uniqueId = 'wj1987-16';
//params.AccountID = 'kjpwei';
//params.BonusNumber = 'B018100415191348002'
//params.BonusID = 2


//params.f_accounts = 'CONAN610';
//var uniqueId = '1870497282-26';






//read('MemberBonus', 1673484).then((x) => { console.log(x.f_accounts); })
//$DB.BONUS


/*
var params = {
    pas: 3,
    id: 1673292,
    type: 15,
    money: 500,
    _: 1538646244510
}

upload_33(params)
*/
/*
for (let i in spreadsheets) {
    window.open(spreadsheets[i])
}
*/


/*
evo.sendMessage({
    command: 'apiFunctions:SystemLog:' + evo.host + ':' + evo.channel,
    params: { account: f_accounts }
}).then(([arr]) => { console.log(arr); })

evo.sendMessage({
    command: 'apiFunctions:MemberBonus:' + evo.host + ':' + evo.channel,
    params: { f_accounts }
}).then(([arr]) => { console.log(arr); })
*/


/*
var { f_field, f_oldData, f_newData, f_time, f_target, f_handler } = log;

if (f_field == 'f_ishow$log$f_intualStatus$log$f_depositStatus') {
    var [status1, , deposit1] = f_oldData.split('$log$');
    var [status2, , deposit2] = f_newData.split('$log$');
    if (deposit1 == 0 && deposit2 == 1) { evo.assign(evo.user, { status1, status2, deposit1: 0, deposit2: 1, time2: f_time, handler: f_handler }); }
}
if (f_field == 'f_ishow') {
    evo.assign(evo.user, { time1 });
    //return statistics();
}
*/

//if (f_handler == evo.operator) {} else { return {} };
/*
if (deposit1 == 0 && deposit2 == 1) {
    var time2 = f_time;
    console.log(status1, status2);
    return { time2, status1, status2, deposit1, deposit2 }
}

if (f_field == "f_ishow$log$f_intualStatus$log$f_depositStatus") {
    var obj = {
        time: f_time,
        name: dic["f_ishow"],
        status: spliter(f_oldData) + '-' + spliter(f_newData),
    }
    console.log(obj);
    return evo.user.time2 = obj;
}
*/
/*var res = {}
      var field = spliter(f_field)
      var oldData = spliter(f_oldData)
      var newData = spliter(f_newData)
      var dic = { f_ishow: "status", f_depositStatus: "deposit", f_intualStatus: "intual" }
      field.map((f, i) => {
          res[dic[f]] = {
              desc: [oldData[i], newData[i]].map((x) => { return sel[f][x] }),
              flow: [oldData[i], newData[i]],
              time: f_time
          }
      })

      console.log(res);



      return*/



function upload_4223(postData) {

    getBonusLog_test(postData);

    return Promise.all([
        getBonusLog(postData),
        getUser(postData)
    ]).then(statistics4)



    return


    console.log(BonusLog);


    return
    var obj = { account: res.AccountID, channel: evo.channel }
    //改成session
    IDB['GetMemberBonusLogBackendByCondition']
        .get(params.BonusNumber)
        .then((rec) => {
            console.log(assign(rec, res));
            //console.log(assign(user, rec));
            //console.log(x);
        })

    getUser(obj).then((user) => {
        return assign(evo.user, res)
    }).then((user) => {


    }).then(statistics4);
}