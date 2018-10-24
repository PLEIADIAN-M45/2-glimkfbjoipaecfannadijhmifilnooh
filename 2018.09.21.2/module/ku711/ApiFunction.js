define([], function() {
    var apiFunction = function() {
        this.exec = function(mod) {
            var headers = { 'requestverificationtoken': evo.token, 'content-type': 'application/json;charset=UTF-8' }
            var data = json(mod.data);
            return new Promise((resolve, reject) => {
                $.ajax(evo.assign(mod, { headers, data, dataType: "json" })).then((d) => {
                    try { var res = d.Data.Data || d; if (res.length == 1) { resolve(...res); } else { resolve(res); } } catch (ex) {}
                })
            })
        }
    }
    apiFunction.prototype.getSystemLog = function() {
        return this.exec({
            url: "/member/api/Common/GetMemberInfoOperationLogByMultiAccountID",
            method: "POST",
            data: { "OperateType": 0, "OperatorList": [], "DataIDList": [], "PageIndex": 0, "PageSize": 5, "DataID": evo.account, "Operated": evo.account, "Platform": 0 }
        });
    }
    return new apiFunction();
})