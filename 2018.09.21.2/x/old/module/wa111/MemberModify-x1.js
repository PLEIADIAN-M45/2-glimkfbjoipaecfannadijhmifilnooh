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


/*
var GetInfoAPI = function() {};
GetInfoAPI.prototype.mobile = function() {
    return new Promise(function(resolve, reject) {
        if (evo.user.mobile[0]) {
            $.ajax({
                url: '../LoadData/AccountManagement/GetInfoAPI.ashx',
                dataType: 'json',
                data: {
                    'type': 'getPhone',
                    'phone': evo.user.mobile[0],
                    'account': evo.user.accountId,
                    _: new Date().getTime()
                }
            }).then(function(res) {
                //console.log(res);
                var s = res.msg.replace('<br />', '<br/>').split('<br/>');
                var c = s[0].split('&nbsp;');
                var result = { province: c[0], city: c[1], meta: s[1] }
                evo.user.mobile[1] = result.province.replace('省', '');
                evo.user.mobile[2] = result.city;
                resolve(evo.user)
            })
        } else {
            resolve()
        }
    })
}

GetInfoAPI.prototype.idcard = function() {
    return new Promise(function(resolve, reject) {
        if (evo.user.idcard[0]) {
            $.ajax({
                url: '../LoadData/AccountManagement/GetInfoAPI.ashx',
                dataType: 'json',
                data: {
                    'type': 'getID',
                    'f_account': evo.user.accountId,
                    '_': new Date().getTime()
                }
            }).then(function(res) {
                //console.log(res);
                var c = res.address.split(' ');
                var result = { province: c[0], city: c[1] }
                evo.user.idcard[1] = result.province.replace('省', '');
                evo.user.idcard[2] = result.city;
                resolve(evo.user)
            })
        } else {
            resolve()
        }
    })
}


GetInfoAPI.prototype.locate = function() {
    return new Promise(function(resolve, reject) {
        chrome.runtime.sendMessage(evo.extensionId, {
            command: 'API',
            method: 'locate',
            port: '0',
            header: evo.user.locate[0]
        }, function(result) {
            if (result.status == 200) {
                //console.log(result);
                evo.user.locate[1] = result.province.replace('省', '') || result.country;
                evo.user.locate[2] = result.city;
                resolve(evo.user)
            } else {
                reject()
            }
        })
    })
}
*/


function _small(string) {
    return string.toLowerCase();
}

function selectedOptions(obj) {
    return obj.selectedOptions[0].text;
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

function getPhoneDate(account) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: location.origin + '/LoadData/AccountManagement/GetMemberList.ashx',
            dataType: 'json',
            data: { type: 'getPhoneDate', account: account }
        }).then((d) => {
            var obj = {};
            var row = d.rows[0];
            for (key in row) {
                var value = row[key];
                var key = key.replace('f_', '').toLowerCase()
                obj[key] = value;
            }
            resolve(obj);
        })
    })
}

async function fetchMemberInfo2() {
    return new Promise((resolve, reject) => {
        var ctrl = {};
        var controller = {}
        document.querySelector('.page-content').querySelectorAll("input,span,select").forEach(function shortName(el, i) {
            let { id, localName, outerText, value, options, selectedIndex } = el;
            if (id) {
                var sid = id.replace('ctl00_ContentPlaceHolder1_', '').replace('f_', '').replace('txt', '');
                sid = _small(sid);
                controller[sid] = el;
                ctrl[sid] = (localName == 'input') ? el.value : (localName == 'span') ? el.outerText : el.value;
            }
        })
        var c = ctrl;
        var a = controller;
        evo.user = {
            uniqueId: c.account + '-' + evo.siteNumber,
            origin: evo.origin,
            operator: evo.operator,
            siteNumber: evo.siteNumber,
            accountId: c.account,
            birthday: c.birthday,
            deposit: parseInt(c.isopendeposit),
            status: parseInt(c.ishow),
            state: selectedOptions(a.ishow),
            locate: {
                title: c.lblip,
                value: c.lblip,
                province: null,
                city: null,
            },
            mobile: {
                title: c.photo,
                value: null,
                province: null,
                city: null,
            },
            idcard: {
                title: c.idcard,
                value: null,
                province: null,
                city: null,
            },
            author: {
                title: c.remittacename,
                value: c.remittacename
            },
            banker: [
                { title: c.remittanceaccount111, province: selectedOptions(a.ddlcity), city: c.ddlcityarea, name: c.bankcode111 },
                { title: c.remittanceaccount111_2, province: selectedOptions(a.ddlcity2), city: c.ddlcityarea2, name: c.bankcode111_2 },
                { title: c.remittanceaccount111_3, province: selectedOptions(a.ddlcity3), city: c.ddlcityarea3, name: c.bankcode111_3 },
                { title: c.remittanceaccount111_4, province: selectedOptions(a.ddlcity4), city: c.ddlcityarea4, name: c.bankcode111_4 },
                { title: c.remittanceaccount111_5, province: selectedOptions(a.ddlcity5), city: c.ddlcityarea5, name: c.bankcode111_5 }
            ]

            //.filter((x) => x[0])
        }
        resolve(evo.user);
    })
}


function fetchMemberInfo3() {
    return new Promise((resolve, reject) => {
        getPhoneDate(evo.params.account)
            .then(function(d) {
                evo.user.idcard.value = d.idcard;
                evo.user.mobile.value = d.photo;
                resolve(evo.user)
            })
    })
}

function fetchMemberInfo4() {
    return new Promise((resolve, reject) => {
        evo.db.GetMemberList.get(evo.user.uniqueId)
            .then(function(d) {
                //console.log(d);
                evo.user.agency = d.f_alagent;
                evo.user.joindate = d.f_joindate;
                if (d.f_RemittanceAccount == undefined) {
                    d.f_RemittanceAccount = "|||||"
                }
                d.f_RemittanceAccount.split('|').forEach(function(x, i) {
                    if (evo.user.banker[i]) { evo.user.banker[i].value = x; }
                });
                resolve(evo.user);
            })
    })
}





function xxx() {

    function fetchMemberInfo99() {
        return new Promise((resolve, reject) => {
            var object = {
                origin: evo.origin,
                siteNumber: evo.siteNumber,
                accountId: window.f_account,
                locate: window.lblIp,
                mobile: window.ctl00_ContentPlaceHolder1_txtPhoto,
                idcard: window.ctl00_ContentPlaceHolder1_txtIdCard,
                fullName: window.ctl00_ContentPlaceHolder1_txtRemittaceName,
                birthday: window.ctl00_ContentPlaceHolder1_birthday,
                deposit: window.ctl00_ContentPlaceHolder1_isOpenDeposit,
                status: window.ctl00_ContentPlaceHolder1_ishow,

            }
            var values = Object.values(object);
            var entries = Object.entries(object);
            var errors = [];
            entries.forEach(function([key, element], index) {
                if (element) {
                    switch (element.localName) {
                        case 'span':
                            object[key] = element.outerText;
                            break;
                        case 'select':
                        case 'input':
                            object[key] = element.value;
                            break;
                    }
                } else {
                    errors.push(key);
                }
            });
            if (errors.length) {
                var ex = new Error(errors.join(',') + ' is not available.');
                ex.name = arguments.callee.name;
                throw ex;
            } else {

                evo.user = object;
                evo.user.state = window.ctl00_ContentPlaceHolder1_ishow.selectedOptions[0].textContent
                evo.user.uniqueId = object.accountId + '-' + object.siteNumber;

                getPhoneDate(evo.params.account)
                    .then(function(d) {
                        console.log(d);
                        evo.user.idcard_ = d.idcard;
                        evo.user.mobile_ = d.photo;
                        /************************************/
                        evo.db.GetMemberList.get(evo.user.uniqueId)
                            .then(function(d) {
                                //console.log(d);
                                evo.user.agency = d.f_alagent;
                                evo.user.joindate = d.f_joindate;
                                evo.AcNumber_ = d.f_RemittanceAccount.split('|')
                                resolve(evo.user);
                            })
                    })


            }
        })
    }


    var GetInfoAPI333 = {
        mobile: function() {
            return new Promise(function(resolve, reject) {
                if (evo.user.mobile.length) {
                    $.ajax({
                        url: '../LoadData/AccountManagement/GetInfoAPI.ashx',
                        dataType: 'json',
                        data: {
                            'type': 'getPhone',
                            'phone': evo.user.mobile[0],
                            'account': evo.user.accountId,
                            _: new Date().getTime()
                        }
                    }).then(function(res) {
                        //console.log(res);
                        var str = res.msg.replace('<br />', '<br/>').split('<br/>');
                        var arr = str[0].split('&nbsp;');
                        var result = {
                            province: arr[0],
                            city: arr[1],
                            meta: str[1]
                        }
                        evo.user.mobile.push(arr[0], arr[1])
                        console.log(evo.user);
                        return result;
                    })
                }
            })
        },
        idcard: function() {
            return new Promise(function(resolve, reject) {
                if (evo.user.idcard.length) {
                    $.ajax({
                        url: '../LoadData/AccountManagement/GetInfoAPI.ashx',
                        dataType: 'json',
                        data: {
                            'type': 'getID',
                            'f_account': evo.user.accountId,
                            '_': new Date().getTime()
                        }
                    }).then(function(res) {
                        var c = res.address.split(' ');
                        evo.user.idcard.push(c[0], c[1], c[2])
                        console.log(evo.user);
                        return evo.user;
                    })
                }
            })

        },
        locate: function() {
            return new Promise(function(resolve, reject) {
                chrome.runtime.sendMessage(evo.extensionId, {
                    command: 'API',
                    method: 'locate',
                    port: '0',
                    header: evo.user.locate,
                    siteNumber: evo.user.siteNumber
                }, function(result) {
                    console.log(result);

                })
            })
        }
    }
}

    myApp.$scope.upload = function() {
            console.clear();
            myApp.$scope.upload_session = false
            console.log(evo.user);

            var {
                state,
                operator,
                uniqueId,
                agency,
                fullName,
                joindate,
                mobile,
                locate,
                idcard,
                bkcard,
                banker,
                region,
            } = evo.user

            var rowContents = [
                operator,
                null,
                state,
                joindate,
                agency,
                uniqueId,
                fullName,
                ...mobile,
                ...locate,
            ]

            rowContents = rowContents.concat(...banker)
            rowContents = rowContents.concat(...idcard)


            chrome.runtime.sendMessage(evo.extensionId, {
                command: 'suspension',
                params: {
                    spreadSheets: '1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY',
                    sheetName: 'sheet2',
                    rowContents: rowContents
                }
            }, function(response, status) {
                console.log(response);
            })


            console.log(rowContents);


            return

            rowContents = rowContents.concat(...idcard)
            rowContents = rowContents.concat(...mobile)
            rowContents = rowContents.concat(region.length)
            rowContents = rowContents.concat(...region)

            console.log(rowContents);

            return

            chrome.runtime.sendMessage(evo.extensionId, {
                command: 'suspension',
                params: {
                    spreadSheets: '1eUNxUPYKC834Q2mzazEg-ToPiUVyIuxVHTxXNgPyAIY',
                    sheetName: 'sheet2',
                    rowContents: rowContents
                }
            }, function(response, status) {
                console.log(response);
            })
        }

