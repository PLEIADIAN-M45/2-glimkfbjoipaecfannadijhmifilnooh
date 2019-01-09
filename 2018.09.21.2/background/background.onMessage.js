 var dexie = new Dexie('evo');
 dexie.version(5).stores({ user: 'unique', GB2260: 'code' });


 var apis = {}
 apis.getUser = function getUser(params) {
     //console.log("getUser");
     return dexie.user.get(params);
 };
 apis.putUser = function putUser(params) {
     //console.log("getUser");
     return dexie.user.put(params);
 };



 apis.xmlSpider = function(params1, params2) {

     return xmlSpider[params1.action].call(params1, params2)
 };

 var xmlSpider = {}

 xmlSpider.btnUserSet = async function(user) {

     console.log(this);
     console.log(user);



     //console.log(this);
     if(this.respData == "u-ok") {
         //var unique = [this.sendData.account, this.channel].toUnique();
         //var user = await this.user.get(unique);
         if(user.module) {
             return Promise.resolve(1)
         } else {
             if(user.permit[0] == this.sendData.isOpenDeposit) {
                 return Promise.resolve(1)
             } else {
                 user.module = (user.status[0] == 3) ? "authorize" : "suspended";
                 if(this.sendData.ishow == 3 && this.sendData.isOpenDeposit == 1) { this.sendData.ishow = 1; }
                 user.status.push(this.sendData.ishow)
                 user.permit.push(this.sendData.isOpenDeposit)
                 user.timing.push(this.timeSpan)
                 user.timing.timeDiff();
                 if(user.status[0] == 3 || user.status[1] == 1) {
                     user.sendSms = true;
                 }

                 return apis.putUser(user)

             }
         }
     }
 }


 xmlSpider.getmodel = function() {
     console.log(this);

 }


 /*
  var apis = [];

  apis[0] = function getUser(params) {
      //console.log("getUser");
      return dexie.user.get(params);
  };
  apis[1] = function putUser(params) {
      //console.log("petUser");
      return dexie.user.put(params);
  };
  apis[2] = function delUser(params) {
      //console.log("delUser");
      return dexie.user.delete(params);
  };

  apis[3] = null;
  apis[4] = null;
  apis[5] = null;
  apis[6] = null;
  apis[7] = null;
  apis[8] = null;
  apis[9] = null;

  apis[10] = null;
  apis[11] = null;
  apis[12] = null;
  apis[13] = null;
  apis[14] = null;
  apis[15] = null;

 */

 /*
  apis[20] = function xmlSpider(params) {
      if(xmlSpider[params.action]) {
          return xmlSpider[params.action].call(params)
      } else {
          return Promise.resolve(1)
      }


      return new Promise((resolve, reject) => {})
      console.log(params);
      return Promise.resolve(1)


  };;


  apis[21] = function(xmlSpider, user) {
      console.log(xmlSpider, user);
      if(xmlSpider.respData == "u-ok" && !user.module) {
          user.module = (user.status[0] == 3) ? "authorize" : "suspended";
          user.status.push(xmlSpider.sendData.ishow)
          user.permit.push(xmlSpider.sendData.isOpenDeposit)
          user.timing.push(xmlSpider.timeSpan)
          user.timing.timeDiff();
          if(user.status[0] == 3 || user.status[1] == 1) { user.sendSms = true; }
          return apis[1](user);
      } else {
          return Promise.resolve(1)
      }
  };*/

 /*
  var xmlSpider = {}
  xmlSpider.btnUserSet = async function() {
      //console.log(this);
      if(this.respData == "u-ok") {

          var unique = [this.sendData.account, this.channel].toUnique();

          var user = await this.user.get(unique);

          if(user.module) { return } else {
              if(user.permit[0] == this.sendData.isOpenDeposit) {
                  return;
              } else {
                  user.module = (user.status[0] == 3) ? "authorize" : "suspended";
                  if(this.sendData.ishow == 3 && this.sendData.isOpenDeposit == 1) { this.sendData.ishow = 1; }
                  user.status.push(this.sendData.ishow)
                  user.permit.push(this.sendData.isOpenDeposit)
                  user.timing.push(this.timeSpan)
                  user.timing.timeDiff();

                  if(user.status[0] == 3 || user.status[1] == 1) {
                      user.sendSms = true;
                  }

              }
          }
      }
  }

 */



 chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
     // console.log(request);
     // console.log(request.command, request.params);
     //var arg = Object.entries(request)
     //console.log(request);
     var _name = apis[request.command].name;

     apis[request.command](request.params1, request.params2).then((res) => {
         console.log(_name, res);
         sendResponse(res);
     })

     return true;
 })



 chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
     console.log(request);

 })

 Array.prototype.timeDiff = function(unit) {
     this[0] = moment(this[0]).format("YYYY-MM-DD HH:mm:ss")
     this[1] = moment(this[1]).format("YYYY-MM-DD HH:mm:ss")
     this[2] = moment(this[1]).diff(moment(this[0]), "minutes", true);
     return this;
 }