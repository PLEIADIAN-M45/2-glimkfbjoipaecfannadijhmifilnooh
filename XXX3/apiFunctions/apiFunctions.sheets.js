

//console.log(user);
//_robot.call(this)

//async function exec() {}
//exec.call(this);


/*
    var action = this.sendData.action || this.sendData.type;
    if (robot[action]) { robot[action].call(this); return Promise.resolve({}) }

    var action = this.lastPath;
    if (robot[action]) { robot[action].call(this); return Promise.resolve({}) }

*/
/*
var robot = $robot[this.lastPath];
if(robot) { return robot.call(this); }
*/



/*
xmlSpider.loadend = function() {
    var robot = $robot[this.command];
    if(robot) { return robot.call(this); }
    var robot = $robot[this.lastPath];
    if(robot) { return robot.call(this); }
}
*/

//console.log(chrome.runtime);
//console.log(location.);
/*
    var connectName = location.pathname.split('.')[0].split('/').pop();
    var port = chrome.runtime.connect(evo.extensionId, {
        name: connectName
    })
    port.onMessage.addListener(function(a) {
        console.log(a);
    })*/

//console.log(port);



/* chrome.runtime.onConnect.addListener(function(port) {
     console.log(port);

 })*/
/*

authorize_ku711: function(user, postData) {
    //console.log(postData);
    // user.status[1] = postData.f_ishow;
    // user.permit[1] = postData.f_depositStatus;
    user.status[1] = postData.MemberStatus;
    user.permit[1] = postData.IsDeposit;
    user.timing[1] = moment().format('YYYY-MM-DD HH:mm:ss');
    user.timing[2] = timeDiff(user.timing);
    user.permit = user.permit.map($Num);

    if (user.status[0] == user.status[1] && user.permit[0] == user.permit[1]) { return }
    if (user.status[0] == 3) {
        user.command = "google:scripts:authorize"
    } else {
        user.command = "google:scripts:suspended"
    }


    apiFunctions.google(user);

    //console.log(user.command);
    //postData.timespan;
},
*/