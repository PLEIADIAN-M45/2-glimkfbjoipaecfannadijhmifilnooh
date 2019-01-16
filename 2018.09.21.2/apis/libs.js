function parseToObject(obj) {
    //let obj = Object.create(null);
    console.log(obj);
};

function viewer(res) {
    //console.log(res);
    return res;
}

function runLoalSetting() {
    window.isLocal = true;
    apis.baseUrl = { "0": "http://chrome.evo.net", "26": "http://host26.wa111.net", "35": "http://host35.wa111.net", "17": "http://host17.wa111.net", "16": "https://bk.ku711.net" }
    chrome.browserAction.onClicked.addListener((tab) => { chrome.runtime.reload(); });
    /*
    if(!window.isLocal) {
        global.author.push(["王杰", "LIYOU1314", "26", "投诉支付宝"])
        global.banker.push(["6217856300"])
        global.banker.push(["62170033"])
        global.locate.push(["115.215.229.116"])
        //global.locate.push(["223.104.33.115"])
        //global.idcard.push(["3401221987100616"])
        global.mobile.push(["13514966"])
        global.mobile.push(["18587763"])
    }
    */

}

function refreshAllWindow() {
    chrome.tabs.getAllInWindow((tabs) => {
        tabs.filter((tab) => {
            var flag = false;
            if(tab.url.includes('127.0.0.1')) { flag = true; }
            //if(tab.url.includes('IGetMemberInfo')) { flag = true; }
            if(tab.url.includes('wa111')) { flag = true; }
            if(tab.url.includes('ku711')) { flag = true; }
            if(tab.url.includes('tp33')) { flag = true; }
            if(flag) { chrome.tabs.reload(tab.id); }
        })
    })
}

function GOOGLESCRIPT(user) {
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
        method: 'get',
        data: {
            test: true,
            audience: localStorage.audience,
            command: "google:scripts",
            user: angular.toJson(user)
        }
    }).then(function(d) {
        console.log(d);
    })
}






//params.lastModify = moment(Date.now())
//params.timespan = moment().format('YYYY-MM-DD HH:mm:ss')
//if(window.isLocal) { user.module = null; };
//if(user.module) { return };

/*
case "CREATEMEMBERINFOOPERATIONLOG":
    //console.log(params);
    break;
*/
/*
apis.googles = function googles(user) {
    try {
        delete user.banker[0].sites;
        delete user.idcard.sites;
        delete user.locate.sites;
        delete user.mobile.sites;
        delete user.author.sites;
        delete user.regions;
    } catch (ex) {};

    console.log(user);
    return
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
        method: 'get',
        data: {
            test: true,
            audience: localStorage.audience,
            command: "google:scripts",
            user: angular.toJson(user)
        }
    }).then(function(d) {
        console.log(d);
    })
}*/


/*
var o = {
    a: 7,
    get b() {
        return this.a + 1;
    },
    set c(x) {
        this.a = x / 2;
    }
};

console.log(o.a); // 7
console.log(o.b); // 8
o.c = 50;
console.log(o.a); // 25
*/