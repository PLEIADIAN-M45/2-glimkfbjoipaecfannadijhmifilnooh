define(["app.spider.extend", "md5"], function() {

    // var arr = [
    function $getAllResponseHeaders(obj) {
        return obj.getAllResponseHeaders().split('\r').map((x) => {
            return x.split(":")
        }).serialize();
    }

    function $serialize({ href, url, postData }) {
        var obj = {};
        if (href) { if (href.includes('?')) { decodeURIComponent(href).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
        if (url) { if (url.includes('?')) { decodeURIComponent(url).split('?')[1].split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
        if (postData) { try { return JSON.parse(postData) } catch (ex) { postData.split('&').map((x) => { return x.split('=') }).forEach(([name, value]) => { obj[name] = value; }); } }
        return obj;
    }

    function json(str) { try { if (str.constructor.name == "Response") { return str.json() } if (typeof str == "object") { var res = JSON.stringify(str); } else { var res = JSON.parse(str); } } catch (ex) { var res = str; } return res; }

    function $fromJson(obj) { try { var str = JSON.stringify(obj); } catch (ex) { var str = obj; } return str; }

    function $tryJson({ responseText }) { try { return JSON.parse(responseText); } catch (ex) { return responseText } }

    function $isJson(d) { try { JSON.parse(d); } catch (ex) { return false; } return true; }

    function $hostname() { if (location.port) { return { "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" }[location.port]; } else { return location.hostname.split('.')[1]; } }

    function $lastPath({ url }) { return url.split('?')[0].split('/').pop().replace(/\.\w+/, ''); }

    function $mimeType({ responseText }) { return $isJson(responseText) ? "json" : "text"; }

    function $dataRows({ respData }) { try { return respData.rows || respData.Data.Data; } catch (ex) {} }

    function setToMap(key, arr) {
        //console.log(this);
        var obj = {};
        arr.map((d) => { obj[d[key]] = d; })
        return obj;
    }


    function trim(value) { return value.toString().trim() };

    function s(a) { console.log(a); }

    return {
        $getAllResponseHeaders,
        $serialize,
        $fromJson,
        $tryJson,
        $hostname,
        $lastPath,
        $mimeType,
        $dataRows,
        MD5,
        setToMap
    }


    return class _xmlSpider {
        constructor(xmlSpider) {
            //console.log(a);
            this.xmlSpider = xmlSpider
            this.channel = localStorage.channel;
            this.server = localStorage.server;

            //this.responseHeaders = $getAllResponseHeaders(this);
            //Object.assign(this, a)
            //Object.assign(xmlSpider, this)

            Object.assign(this, xmlSpider)

        }

        get getAllResponseHeaders() {
            return this.xmlSpider.getAllResponseHeaders().split('\r').map((x) => {
                return x.split(":")
            })
        }


        /*
        return this.mom.getAllResponseHeaders().split('\r').map((x) => {
            return x.split(":")
        }).serialize();
        */
    }


})

//onloadstart        //onload        //onloadend        //console.log(moment);

/*
method: "GET"
onabort: null
onerror: null
onload: null
onloadend: null
onloadstart: null
onprogress: null
onreadystatechange: ƒ ()
ontimeout: null
postData: null
readyState: 4
requestHeaders: {Accept: "/", X-Requested-With: "XMLHttpRequest"}
response: "{"total":1,"records":1,"rows":[{"f_id":2220763,"f_"
responseText: "{"total":1,"records":1,"rows":[{"f_id":2220763,"f_"
responseType: ""
responseURL: "http://127.0.0.1:26/LoadData/AccountManagement/GetMemberList.ashx?ddlWarn=0&f_Account=&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=&txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=3&selAccountType=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=1&pageIndex=1&hidevalue_RecordCount=1&type=getAllUser&_=1547115385182"
responseXML: null
startedDateTime: 1547115390015
status: 200
statusText: "OK"
timeout: 0
upload: XMLHttpRequestUpload {onloadstart: null, onprogress: null, onabort: null, onerror: null, onload: null, …}
url: "http://127.0.0.1:26/LoadData/AccountManagement/GetMemberList.ashx?ddlWarn=0&f_Account=&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=&txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=3&selAccountType=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=1&pageIndex=1&hidevalue_RecordCount=1&type=getAllUser&_=1547115385182"
withCredentials: false
    */
/*
        /*function() {
            //console.log(3);
            //console.log(this);
            //console.log(this.extensionId);
            /*
            getmodel: 開通表
            StopMember:
            getDepositBonusList:
            delDiceWinRecords:
            DelDiceWinRecords:
            -------------------------
            UpdateMemberBonusLog
            GetMemberBonusLogBackendByCondition
            UpdateMemberRiskInfoAccountingBackend
            UpdateMemberSNInfoBackend
            UpdateMemberRisksInfoBackendIsFSuspension

        };
        */



//console.log(arr);

//console.log(...Array.from(arr));


//[...Array.from(arr)]








/*
var obj = {};
arr.map((fn) => { obj[fn.name] = fn; }) return obj;
})
*/

/*
return class _xmlSpider {
    constructor(sp) {

    }

    get responseHeaders() {
        return 213
    }

    $serialize() {

    }

}
*/


//console.log($getAllResponseHeaders);



/*{
    $getAllResponseHeaders,
    $serialize,
    $fromJson,
    $tryJson,
    $hostname,
    $lastPath,
    $mimeType,
    $dataRows
}*/
//console.log($dataRows);




//console.log(b);




// console.log(CryptoJS);
//var c = CryptoJS.MD5("CODE").toString()
//console.log(c);
/*

*/

//console.log(MD5("CODE"));