apiFunctions.smssend = function() {
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
    }
}