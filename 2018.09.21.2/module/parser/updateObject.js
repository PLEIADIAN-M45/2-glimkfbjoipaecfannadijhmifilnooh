function updateObject(hash, obj) {
    if (hash.length === 1) obj[hash[0]] = null;
    else obj[hash[0]] = [hash[1]];
    return obj;
}

function parse(url) {
    if (typeof url !== 'string') return false;
    if (url.indexOf('?') === -1) return false;
    const params = url.slice(url.indexOf('?') + 1).split('&');
    if (params.length < 1 || params[0] === '') return false;
    return params.reduce((result, value, index) => {
        const hash = value.split(/=(.+)?/);
        if (!Object.keys(result).length) {
            return updateObject(hash, result);
        } else {
            for (let key in result) {
                if (result.hasOwnProperty(hash[0])) {
                    result[hash[0]] = result[hash[0]].concat(hash[1]);
                } else {
                    return updateObject(hash, result);
                }
            }
            return result;
        }
    }, {});
}

var c = parse("http://127.0.0.1:26/LoadData/AccountManagement/MemberModify.ashx?action=getmodel&account=JIABO1006")

console.log(c);

function getModel() {
    fetch(evo.origin + "/LoadData/AccountManagement/MemberModify.ashx", {
        "headers": { "accept": "*/*", "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6", "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "x-requested-with": "XMLHttpRequest" },
        "body": "action=getmodel&account=" + account,
        "method": "POST",
    }).then(json).then((d) => { console.log(d); })
}
// getModel()


fetch(evo.origin + "/LoadData/AccountManagement/MemberModify.ashx", {
        "headers": { "accept": "*/*", "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6", "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "x-requested-with": "XMLHttpRequest" },
        "body": "action=getmodel&account=" + account,
        "method": "POST",
    }).then(json).then((d) => { console.log(d); })



fetch(evo.origin + "/LoadData/AccountManagement/MemberModify.ashx", {
    "headers": { "accept": "*/*", "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6", "content-type": "application/x-www-form-urlencoded; charset=UTF-8", "x-requested-with": "XMLHttpRequest" },
    "body": "action=getmodel&account=" + account,
    "method": "POST",
}).then(json).then((d) => { console.log(d); })

var url = new URL("http://127.0.0.1:26/LoadData/AccountManagement/MemberModify.ashx?action=getmodel&account=JIABO1006")
console.log(url.searchParams.set(account, "123"));

// var c = new URLSearchParams("?action=getmodel&account=account")

console.log(url);