if (location.protocol == 'chrome-extension:') {
    Api.prototype.sms = function(request) {
        /*console.log(request.header);
        console.log(request.message);
        console.log(request.siteNumber);*/
        function Motosms() {
            return {
                dataType: 'html',
                method: 'post',
                url: 'https://client.motosms.com/smsc/smssend',
                data: {
                    sender: '',
                    phones: request.header,
                    smscontent: request.message,
                    taskType: 1,
                    taskTime: '',
                    batch: 1,
                    splittime: 0,
                    packid: ''
                },
                callback: function(res) {
                    console.log(res);
                    if (res.match(/(var msg = '';)/)) { var status = 'success'; }
                    if (res.match(/(var msg = '101';)/)) { var status = 'failed'; }
                    if (res.match(/(var msg = '102';)/)) { var status = 'limited'; }
                    if (res.match(/(會員登錄)/)) { var status = 'login'; }
                    return {
                        siteNumber: request.siteNumber,
                        message: request.message,
                        status: status
                    }
                }
            }
        };
        return [Motosms];
    }
}