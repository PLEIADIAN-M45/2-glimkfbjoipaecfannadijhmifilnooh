apiFunctions.sendsms = function(sender, sendResponse) {

    var content = decoder(localStorage.sms).toObj();
    this.sms.url = 'http://client.motosms.com/smsc/smssend';
    this.sms.content = content[this.channel];
    this.sms.mobile = "86" + this.mobile.value;

    $.ajax({
        url: this.sms.url,
        dataType: "html",
        method: 'post',
        data: {
            sender: '',
            phones: this.sms.mobile,
            smscontent: this.sms.content,
            taskType: 1,
            taskTime: '',
            batch: 1,
            splittime: 0,
            packid: ''
        }
    }).then((res, b, c) => {
        console.log(this);
        //this.sms.content = this.message
        if (res.match(/(msg = '')/)) { this.sms.status = 200; }
        if (res.match(/(會員登錄)/)) { this.sms.status = 401; }
        if (res.match(/(msg = '101')/)) { this.sms.status = 101; }
        if (res.match(/(msg = '102')/)) { this.sms.status = 102; }
        sendResponse(this.sms);
    });
}