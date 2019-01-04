if (siteNumber == '16') {
    Api.prototype.settings = function(mod) {
        return {
            url: location.origin + mod.url,
            data: JSON.stringify(mod.data),
            method: 'post',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            headers: {
                'requestverificationtoken': $('ajax-anti-forgery-token').attr('token'),
                'x-requested-with': 'XMLHttpRequest'
            },
            start: time.value,
            timeout: 10000
        }
    }

    Api.prototype.mobile = function(request) {
        return {
            url: '/Member/api/MemberInfoManage/GetVerifyPhoneLocal',
            data: { "Name": request.accountId, "AccountID": request.accountId, "CellPhone": request.header, "EnabledVerified": true, "Identitycard": "", "VerifyUsage": 13 },
            callback: function(res) {
                var d = res.Data;
                return {
                    province: d.Province,
                    city: d.City,
                    meta: d.Cardtype
                }
            }
        }
    }
    Api.prototype.idcard = function(request) {
        return {
            url: '/Member/api/MemberInfoManage/GetVerifyIdentity',
            data: { "AccountID": request.accountId, "Identitycard": request.header, "Name": request.fullName, "CellPhone": "", "EnabledVerified": true, "VerifyUsage": 1 },
            callback: function(res) {
                var d = res.Data.IdCardInfo;
                return {
                    province: d.ResidentAddress,
                    meta: d.BirthDay + '/' + d.Sex + '/' + getMemberAge(d.BirthDay)
                }
            }
        }
    }
    Api.prototype.GetMemberList = function(request, sendResponse) {
        var data = { "AccountID": "", "IDNumber": "", "RigistedIP": "", "TotalDepositAmount": null, "AccountNumber": "", "AccountName": "", "Email": "", "PhoneVerified": null, "IDVerified": null, "MinDeposit": null, "MaxDeposit": null, "StartRegistedTime": "", "EndRegistedTime": "", "PageNumber": 0, "RecordCounts": 20, "OrderField": "", "Desc": "true", "TotalDepositBonus": null, "AccountBookLevel": "", "AliPayLevel": "", "WeChatLevel": "", "CellPhone": "", "IsBlackList": null, "LevelType": null, "MemberStatus": null, "IsFisrstDeposit": null, "MemberMemoType": null, "TransferOutStatus": null, "IsLogIn": null, "AgencyID": "", "TestType": null, "PayeeAccountNo": "", "LineType": "", "AccountingType": null, "ManageAccountID": "", "NickName": "" };
        data[request.param] = request.header;
        return {
            url: '/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo',
            data: data,
            callback: function(res) {
                return {
                    total: res.Data.TotalItemCount,
                    rows: res.Data.Data
                }
            }
        }
    }



    Api.prototype.GetMemberAlertInfoBackendByMultiplayer = function(request, sendResponse) {
        //var data = { "AccountID": "", "IDNumber": "", "RigistedIP": "", "TotalDepositAmount": null, "AccountNumber": "", "AccountName": "", "Email": "", "PhoneVerified": null, "IDVerified": null, "MinDeposit": null, "MaxDeposit": null, "StartRegistedTime": "", "EndRegistedTime": "", "PageNumber": 0, "RecordCounts": 20, "OrderField": "", "Desc": "true", "TotalDepositBonus": null, "AccountBookLevel": "", "AliPayLevel": "", "WeChatLevel": "", "CellPhone": "", "IsBlackList": null, "LevelType": null, "MemberStatus": null, "IsFisrstDeposit": null, "MemberMemoType": null, "TransferOutStatus": null, "IsLogIn": null, "AgencyID": "", "TestType": null, "PayeeAccountNo": "", "LineType": "", "AccountingType": null, "ManageAccountID": "", "NickName": "" };
        // data[request.param] = request.header;
        return {
            url: '/member/api/AlertInfoManage/GetMemberAlertInfoBackendByMultiplayer',
            data: request.params,
            callback: function(res) {
                //console.log(res.Data);
                return {
                    rows: res.Data
                }
            }
        }
    }
}