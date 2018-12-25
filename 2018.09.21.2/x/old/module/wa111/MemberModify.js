evo.map = new Map([
    ['BankCode111', 'name1'],
    ['BankCode111_2', 'name2'],
    ['BankCode111_3', 'name3'],
    ['BankCode111_4', 'name4'],
    ['BankCode111_5', 'name5'],
    ['txtRemittanceAccount111', 'code1'],
    ['txtRemittanceAccount111_2', 'code2'],
    ['txtRemittanceAccount111_3', 'code3'],
    ['txtRemittanceAccount111_4', 'code4'],
    ['txtRemittanceAccount111_5', 'code5'],
    ['ddlCityArea', 'city1'],
    ['ddlCityArea2', 'city2'],
    ['ddlCityArea3', 'city3'],
    ['ddlCityArea4', 'city4'],
    ['ddlCityArea5', 'city5'],
    ['ddlCity', 'prov1'],
    ['ddlCity2', 'prov2'],
    ['ddlCity3', 'prov3'],
    ['ddlCity4', 'prov4'],
    ['ddlCity5', 'prov5'],
    ['txtRemittaceName', 'author'],
    ['txtPhoto', 'mobile'],
    ['txtIdCard', 'idcard'],
    ['ishow', 'status'],
    ['isOpenDeposit', 'isOpenDeposit'],
    ['btnStop', 'btnStop'],
    ['birthday', 'birthday'],
    ['f_account', 'account'],
    ['f_alagent', 'agency'],
    ['f_joindate', 'attach'],
    ['f_ishow', 'status'],
    ['f_RemittanceAccount', '_banker'],
    ['lblIp', 'locate']
])

$(document).ajaxSend(function(event, xhr, settings) {
    if (settings.type == "POST") {
        var searchParams = new URLSearchParams("?" + settings.data);
        var action = searchParams.get('action');
        var wujiMarkID = searchParams.has('wujiMarkID');
        var status = evo.controller.status.value;
        if (action == "btnUserSet") {
            console.log(evo.user.status.value, evo.controller.status.value);
            if (evo.user.status.value == 3 && evo.controller.status.value == 1) {
                upload_1('審核戶轉正常戶', '是');
            }
            if (evo.user.status.value == 0 && evo.controller.status.value == 1) {
                upload_1('靜止戶轉正常戶', '是');
            }
            evo.user.status.value = evo.controller.status.value
            evo.user.status.title = selectedOptions(evo.controller.status)
        }

        if (action == "StopMember" && wujiMarkID) {
            if (evo.controller.status.value == 1) {
                upload_2('正常戶轉停權戶', '正常戶轉停權戶');
            }
            if (evo.controller.status.value == 0) {
                upload_2('靜止戶轉停權戶', '靜止戶轉停權戶');
            }
            if (evo.controller.status.value == 3) {
                upload_1('審核中轉停權戶', '否');
            }
        }
    }
});



function getController() {
    return new Promise((resolve, reject) => {
        evo.controller = function() {};
        document.querySelector('.page-content').querySelectorAll("input,span,select").forEach(function shortName(el, i) {
            let { id, localName, outerText, value, options, selectedIndex } = el;
            if (id) {
                var sss = id.replace('ctl00_ContentPlaceHolder1_', '');
                if (evo.map.has(sss)) {
                    var ccc = evo.map.get(sss);
                    evo.controller[ccc] = el;
                    evo.controller.prototype[ccc] = (localName == 'input') ? el.value : (localName == 'span') ? el.outerText : el.value;
                }
            }
        })
        resolve(evo.controller)
    })
}

function getBasicInfo() {
    return new Promise((resolve, reject) => {
        if (evo.user) {
            evo.user.status.value = evo.controller.status.value
            evo.user.status.title = selectedOptions(evo.controller.status)
            resolve(evo.user)
        } else {
            var a = evo.controller;
            var c = new evo.controller;
            var obj = {
                uniqueId: evo.uniqueId,
                origin: evo.origin,
                operator: evo.operator,
                siteNumber: evo.siteNumber,
                accountId: c.account,
                account: c.account,
                birthday: c.birthday,
                deposit: {
                    value: c.isOpenDeposit,
                    title: selectedOptions(a.isOpenDeposit)
                },
                status: {
                    value: c.status,
                    title: selectedOptions(a.status)
                },
                locate: {
                    value: c.locate,
                    title: c.locate,
                },
                mobile: {
                    title: c.mobile
                },
                idcard: {
                    title: c.idcard
                },
                author: {
                    title: c.author,
                    value: c.author
                },
                banker: [
                    { title: c.code1, province: selectedOptions(a.prov1), city: c.city1, name: c.name1 },
                    { title: c.code2, province: selectedOptions(a.prov2), city: c.city2, name: c.name2 },
                    { title: c.code3, province: selectedOptions(a.prov3), city: c.city3, name: c.name3 },
                    { title: c.code4, province: selectedOptions(a.prov4), city: c.city4, name: c.name4 },
                    { title: c.code5, province: selectedOptions(a.prov5), city: c.city5, name: c.name5 }
                ]
            }
            evo.user = obj;
            resolve(evo.user);
            //console.log('getBasicInfo:', evo.user);
        }

    })
}

function getPhoneDate() {
    return new Promise(function(resolve, reject) {
        if (evo.user.idcard.value && evo.user.mobile.value) {
            resolve(evo.user)
        } else {
            $.ajax({
                url: location.origin + '/LoadData/AccountManagement/GetMemberList.ashx',
                dataType: 'json',
                data: { type: 'getPhoneDate', account: evo.account }
            }).then((res) => {
                res.uniqueId = evo.uniqueId;
                evo.db.PhoneDate.put(res)
                if (res && res.rows) {
                    var d = res.rows[0];
                    //console.log('getPhoneDate:', d);
                    evo.user.idcard.value = d.f_idCard;
                    evo.user.mobile.value = d.f_photo;
                }
                resolve(evo.user)
            })
        }

    })
}


function getExtraInfo() {
    ////console.log(evo.uniqueId);
    return new Promise((resolve, reject) => {
        if (evo.user.agency) {
            resolve(evo.user)
        } else {
            evo.db.MemberList.get(evo.uniqueId)
                .then(function(d) {
                    ////console.log(d);
                    //console.log('getExtraInfo:', d);
                    if (d) {
                        evo.user.agency = d.f_alagent;
                        evo.user.joindate = d.f_joindate;
                        d.f_RemittanceAccount.split('|').forEach(function(x, i) {
                            if (evo.user.banker[i]) { evo.user.banker[i].value = x; }
                        });
                    }
                    resolve(evo.user);
                })
        }
    })
}

function getSystemLog() {
    return new Promise(function(resolve, reject) {
        if (location.host == "127.0.0.1") {
            return resolve(evo.user);
        }
        $.ajax({
            url: location.origin + '/LoadData/AccountManagement/GetSystemLog.ashx',
            dataType: 'json',
            data: {
                f_accounts: evo.account,
                logType: 'memberlog',
                tabName: null,
                zwrq: null,
                pageIndex: null,
                f_target: null,
                f_handler: null,
                ddlType: 0,
                zwrq2: null,
                f_number: null,
                type: null,
                selType: null,
                selShow: -1,
                txtID: null,
                selDengji: null
            }
        }).then((res) => {
            if (res && res.rows) {
                //console.log('getSystemLog:', res.rows);
            }
            resolve(evo.user);
        })
    })
}


function commonPromise() {
    var self = this;
    return new Promise(function(resolve, reject) {
        resolve(self.map(function(arg, index) {
            var element = document.getElementById(arg)
            if (element) {
                return element;
            } else {
                reject(arg)
            }
        }))
    })
}

var getMemberBankNameEnum = function() {
    return commonPromise.call([
        'ctl00_ContentPlaceHolder1_BankCode111',
        'ctl00_ContentPlaceHolder1_BankCode111_2',
        'ctl00_ContentPlaceHolder1_BankCode111_3',
        'ctl00_ContentPlaceHolder1_BankCode111_4',
        'ctl00_ContentPlaceHolder1_BankCode111_5'
    ])
}

var getMemberBankProvEnum = function() {
    return commonPromise.call([
        'ctl00_ContentPlaceHolder1_ddlCity',
        'ctl00_ContentPlaceHolder1_ddlCity2',
        'ctl00_ContentPlaceHolder1_ddlCity3',
        'ctl00_ContentPlaceHolder1_ddlCity4',
        'ctl00_ContentPlaceHolder1_ddlCity5'
    ])
}

/*********************************************************************************/
var getMemberBankAccsEnum = function() {
    return commonPromise.call([
        'ctl00_ContentPlaceHolder1_txtRemittanceAccount111',
        'ctl00_ContentPlaceHolder1_txtRemittanceAccount111_2',
        'ctl00_ContentPlaceHolder1_txtRemittanceAccount111_3',
        'ctl00_ContentPlaceHolder1_txtRemittanceAccount111_4',
        'ctl00_ContentPlaceHolder1_txtRemittanceAccount111_5'
    ])
}

var getMemberBankCityEnum = function() {
    return commonPromise.call([
        'ctl00_ContentPlaceHolder1_ddlCityArea',
        'ctl00_ContentPlaceHolder1_ddlCityArea2',
        'ctl00_ContentPlaceHolder1_ddlCityArea3',
        'ctl00_ContentPlaceHolder1_ddlCityArea4',
        'ctl00_ContentPlaceHolder1_ddlCityArea5'
    ])
}


function fetchBankAcInfo() {
    return Promise.all([
        getMemberBankNameEnum(),
        getMemberBankAccsEnum(),
        getMemberBankProvEnum(),
        getMemberBankCityEnum()
    ]).then(function(array) {
        evo.user.bankcards = [];
        array[0].forEach(function(el, i) {
            if (el.value) {
                evo.user.bankcards.push({
                    BankName: array[0][i].value,
                    AcNumber: array[1][i].value,
                    Province: array[2][i].selectedOptions[0].textContent,
                    City: array[3][i].value,
                    AcNumber_: evo.AcNumber_[i]
                })

            }
        });
        return evo.user;
    }).catch(errorHandler)
}


function getInfoAPI() {
    var api = new GetInfoAPI();
    return Promise.all([
        api.mobile(),
        api.idcard(),
        api.locate()
    ]).then(function(arr) {
        return evo.user
    }).catch(errorHandler)
}



if (location.host == "127.0.0.1" || evo.operator == "18C894") {
    $('style').remove();
    $('#ctl00_ContentPlaceHolder1_btnStop').removeClass('btnReback')
}