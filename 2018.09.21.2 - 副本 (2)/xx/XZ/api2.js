define([], function() {


    function apiFunctions() {

        this.smsService = {

            smsc: {


            },
            Nexmo: function() {
                console.log(this);


                /*settings: {
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
                }*/
            }
        }
    }



    /*apiFunctions.prototype.exec = function(a) {
        alert(13)

    }
*/

    return new apiFunctions();


})





/*
this.exec = function(mod) {
      return new Promise((resolve, reject) => {
          $.ajax(evo.assign(mod, { dataType: "json" })).then((d) => {
              var res = d.rows || d;
              try { if(res.length == 1) { resolve(...res) } else { resolve(res) } } catch (ex) {}
          })
      })
  }
  */