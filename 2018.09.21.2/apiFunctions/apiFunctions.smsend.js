apiFunctions.sendsms = function(sender, sendResponse) {

    var { operator, account, channel, mobile, status } = this.params;
    var smscontent = decoder(localStorage.sms).toObj();
    var message = smscontent[channel];

    $.ajax({
        dataType: "html",
        url: 'http://client.motosms.com/smsc/smssend',
        method: 'post',
        data: {
            sender: '',
            phones: '86' + mobile.value,
            smscontent: message,
            taskType: 1,
            taskTime: '',
            batch: 1,
            splittime: 0,
            packid: ''
        }
    }).then((res, b, c) => {
        //if (res.match(/(會員登錄)/)) { var status = this.params.status[0]; }
        if (res.match(/(會員登錄)/)) { var status = 3; }
        if (res.match(/(msg = '')/)) { var status = 0; }
        if (res.match(/(msg = '101')/)) { var status = 101; }
        if (res.match(/(msg = '102')/)) { var status = 102; }
        console.log(status);
        sendResponse({ operator, account, channel, message, mobile, status })
    });
}


function parseUrl(str) {
    var url = new URL(str);
    console.log(url);
    var account = url.searchParams.get('account');
    console.log(account);
}




function xxx() {
    fetch("http://client.motosms.com/smsc/smssend", {
        "credentials": "include",
        "headers": {
            "accept": "text/html, */*; q=0.01",
            "accept-language": "zh-TW,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7,en;q=0.6",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": "sender=&phones=8617878978978&smscontent=%E6%AC%A2%E8%BF%8E%E6%82%A8%E7%9A%84%E5%8A%A0%E5%85%A5%0A%E6%9C%AC%E7%BD%91%E4%B8%BB%E7%BD%91%E5%9D%80%EF%BC%9AHTTPS%3A%2F%2FJX11.NET%0A%E6%84%9F%E8%B0%A2%E6%82%A8&taskType=1&taskTime=&batch=1&splittime=0&packid=",
        "method": "POST",
        "mode": "cors"
    }).then((d) => {
        console.log(d);
        return d.text()
    }).then((r) => {
        console.log(r);
    })
}

// return Promise.resolve()
//return Promise.resolve({ operator, account, channel, message, mobile, status });
//setTimeout(() => {}, 3000)
//console.log(smscontent, channel);
/*
    console.log(message);
    console.log(status);
    console.log(mobile.value);
*/
/*
var { account, mobile, status, channel, operator } = this.params;
var smss = new Map(evo.decoder(localStorage.sms));
var countrycode = { "16": "86", "26": "86", "35": "86", "17": "86", "21": "886", "35": "886", "2": "886" } [channel];
var mobile = countrycode + mobile;
var message = smss.get(Number(channel));
if(smss == undefined) { return false }
if(channel == undefined) { return false }
if(mobile == undefined) { return false }
if(mobile.includes('*') == undefined) { return false }
if(countrycode == undefined) { return false }
if(message == undefined) { return false }
return {
    career: 'smsc',
    settings: {
        dataType: 'html',
        method: 'post',
        url: 'https://client.motosms.com/smsc/smssend',
        data: { sender: '', phones: mobile, smscontent: message, taskType: 1, taskTime: '', batch: 1, splittime: 0, packid: '' }
    },
    callback: function(res) {
        if(res.match(/(會員登錄)/)) { var status = 3; }
        if(res.match(/(msg = '')/)) { var status = 0; }
        if(res.match(/(msg = '101')/)) { var status = 101; }
        if(res.match(/(msg = '102')/)) { var status = 102; }
        console.log(status);
        return { operator, account, channel, message, mobile, status }
    }
}*/
/*
console.log(sender);
console.log(sendResponse);
*/