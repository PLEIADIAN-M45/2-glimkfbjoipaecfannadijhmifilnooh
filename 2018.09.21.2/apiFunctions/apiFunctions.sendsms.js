apiFunctions.sendsms = function(sender, sendResponse) {

    console.log(this);

    var content = decoder(localStorage.sms).toObj();
    this.content = content[this.channel];

    $.ajax({
        url: this.requestUrl,
        dataType: "html",
        method: 'post',
        data: {
            sender: '',
            phones: this.mobile,
            smscontent: this.content,
            taskType: 1,
            taskTime: '',
            batch: 1,
            splittime: 0,
            packid: ''
        }
    }).then((res, b, c) => {
        //this.sms.content = this.message
        if(res.match(/(msg = '')/)) { this.status = 200; }
        if(res.match(/(會員登錄)/)) { this.status = 401; }
        if(res.match(/(msg = '101')/)) { this.status = 101; }
        if(res.match(/(msg = '102')/)) { this.status = 102; }
        sendResponse(this);
    });

}








//this.url = 'http://client.motosms.com/smsc/smssend';
//this.sms.mobile = "86" + this.mobile.value;