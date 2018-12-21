console.log(123);
console.log(siteNumber);

if (siteNumber && siteNumber !== '16') {

    console.log(9999999);

    Api.prototype.settings = function(mod) {
        return {
            url: location.origin + mod.url,
            data: mod.data,
            method: 'get',
            dataType: 'json',
            start: time.value,
            timeout: 10000
        }
    }

    Api.prototype.mobile = function(request) {
        return {
            url: '/LoadData/AccountManagement/GetInfoAPI.ashx',
            data: {
                'type': 'getPhone',
                'phone': request.header,
                'account': request.accountId,
                _: new Date().getTime()
            },
            callback: function(res) {
                var str = res.msg.replace('<br />', '<br/>').split('<br/>');
                var arr = str[0].split('&nbsp;');
                return {
                    province: arr[0],
                    city: arr[1],
                    meta: str[1]
                }
            }
        }
    }

    Api.prototype.idcard = function(request) {
        return {
            url: '/LoadData/AccountManagement/GetInfoAPI.ashx',
            data: {
                'type': 'getID',
                'f_account': request.accountId,
                '_': new Date().getTime()
            },
            callback: function(res) {
                var c = res.address.split(' ');
                return {
                    province: c[0],
                    city: c[1],
                    area: c[2],
                    meta: res.birthday + '/' + res.sex + '/' + getMemberAge(res.birthday)
                }
            }
        }
    }

    Api.prototype.GetMemberList = function(request, sendResponse) {
        var data = { f_BankAccount: "", txtPhoto: "", txtIdCard: "", f_RemittanceName: "", f_Account: "", txtAlipayAccount: "", txtEmail: "", txtPickName: "", txtChat: "", ddlBankInfo: "", zwrq: "", zwrq2: "", selSurplus: "", selShow: "", selIsDeposit: "", selLevel: "", selBank: "", selMutualStatus: "", ddlAliPay: "", ddlWeChat: "", ddlWarn: 0, hidevalue_totals: "", pageIndex: 1, hidevalue_RecordCount: 0, type: "getAllUser", _: new Date().getTime() };
        data[request.param] = request.header;
        data.pageIndex = request.page || 1;
        return {
            url: '/LoadData/AccountManagement/GetMemberList.ashx',
            data: data,
            callback: function(res) {
                return res;
            }
        }
    }
}