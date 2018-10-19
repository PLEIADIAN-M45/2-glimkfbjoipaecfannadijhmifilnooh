function GetMemberModify({ f_accounts }) {
    fetch("http://host26.wa111.net/Aspx/MemberModify.aspx?account=" + f_accounts, {
        "method": "get",
    }).then(resText).then(resShow);
}

function GetSystemLog({ f_accounts }) {
    var formData = new FormData();
    var data = "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=" + f_accounts + "&zwrq2=&logType=memberlog&f_number=null&type=null&selType=&selShow=-1&txtID=&selDengji=";
    data.split('&').map((x) => { return x.split('=') }).map(([name, value]) => { formData.append(name, value) })
    //console.log(formData);
    fetch("http://host26.wa111.net/LoadData/AccountManagement/GetSystemLog.ashx", {
        "body": formData,
        "method": "POST",
    }).then(resJson).then(resShow);
}

function GetPhoneDate({ f_accounts }) {
    fetch("http://host26.wa111.net/LoadData/AccountManagement/GetMemberList.ashx?type=getPhoneDate&account=" + f_accounts, {
        "method": "GET",
        "mode": "cors"
    }).then(resJson).then(resShow);
}

function resJson(res) { return res.json(); }

function resText(res) { return res.text(); }

function resShow(res) { console.log(res) }


//GetInfoAPI
function GetID({ f_accounts }) {
    fetch("http://host26.wa111.net/LoadData/AccountManagement/GetInfoAPI.ashx?type=getID&f_account=" + f_accounts, {
        "method": "GET",
        "mode": "cors"
    }).then(resJson).then(resShow);
}



function GetPhone({ f_accounts }) {
    fetch("http://host26.wa111.net/LoadData/AccountManagement/GetInfoAPI.ashx?type=getPhone&phone=178****8978&account=" + f_accounts, {
        "method": "GET",
        "mode": "cors"
    }).then(resJson).then(resShow);
}

function GetMemberList() {
    fetch("http://host26.wa111.net/LoadData/AccountManagement/GetMemberList.ashx?ddlWarn=0&f_Account=&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=&txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=1&selAccountType=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=1&pageIndex=1&hidevalue_RecordCount=26944&type=getAllUser&_=1539697274300", {
        "method": "GET",
        "mode": "cors"
    }).then(resJson).then(function(res) {
        //res.rows.map(GetMemberModify);
        //res.rows.map(GetSystemLog);
        //res.rows.map(GetPhoneDate);
        //res.rows.map(GetPhone);
        res.rows.map(GetID);
    });
}
GetMemberList();



/*


/* "body": {
               tabName: "",
               zwrq: "",
               pageIndex: "",
               f_target: "",
               f_handler: "",
               ddlType: 0,
               f_accounts: "F61539",
               zwrq2: "",
               logType: "memberlog",
               f_number: null,
               type: null,
               selType: "",
               selShow: -1,
               txtID: "",
               selDengji: ""
           },*/
/*
fetch("http://host26.wa111.net/LoadData/AccountManagement/GetSystemLog.ashx", {
    "credentials": "include",
    "headers": {},
    "referrer": "http://host26.wa111.net/Aspx/MemberLog.aspx?tbName=member&f_accounts=F61539",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=F61539&zwrq2=&logType=memberlog&f_number=null&type=null&selType=&selShow=-1&txtID=&selDengji=",
    "method": "POST",
    "mode": "cors"
});*/


var _data = new URLSearchParams();
for (let pair of new FormData(aspnetForm.elements)) {
    _data.append(pair[0], pair[1]);
}
console.log(_data);


var _data = new URLSearchParams();
for (let pair of new FormData(aspnetForm)) {
    _data.append(pair[0], pair[1]);
}
console.log(_data);
*/

/*console.log(f_accounts);
var f_accounts = "F61539"


var _data = new URLSearchParams();
for (let pair of new FormData(aspnetForm.elements)) {
    _data.append(pair[0], pair[1]);
}
console.log(_data);*/
/*
The FormData interface provides a way to easily construct a set of key/value pairs representing 
form fields and their values, which can then be easily sent using the 
XMLHttpRequest.send() method. It uses the same format a form would use 
if the encoding type were set to "multipart/form-data".
            details.requestHeaders.push({ name: 'content-type', value: 'application/json;charset=UTF-8' });

*/
/*
f you want to send the data as application/x-www-form-urlencoded you will either have to specify the body as an URL-encoded string, or pass a URLSearchParams object. The latter unfortunately cannot be directly initialized from a form element. If you don’t want to iterate through your form elements yourself (which you could do using HTMLFormElement.elements), you could also create a URLSearchParams object from a FormData object:

            "data": "tabName=&zwrq=&pageIndex=&f_target=&f_handler=&ddlType=0&f_accounts=F61539&zwrq2=&logType=memberlog&f_number=null&type=null&selType=&selShow=-1&txtID=&selDengji=",

*/

//Content-Type: text/plain;charset=UTF-8

/*

23
down vote
accepted
+50
To quote MDN on FormData (emphasis mine):

The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data".

So when using FormData you are locking yourself into multipart/form-data. 
There is no way to send a FormData object as the body and not sending data in the multipart/form-data format.

If you want to send the data as application/x-www-form-urlencoded 
you will either have to specify the body as an URL-encoded string, or pass a URLSearchParams object. 
The latter unfortunately cannot be directly initialized from a form element.
 If you don’t want to iterate through your form elements yourself
  (which you could do using HTMLFormElement.elements), you could also create a URLSearchParams object from a FormData object:


const data = new URLSearchParams();
for (const pair of new FormData(formElement)) {
    data.append(pair[0], pair[1]);
}

fetch(url, {
    method: 'post',
    body: data,
})
.then(…);
*/

//console.log(f_accounts);
//.then((res) => { return res.text(); }).then((res) => { console.log(res) })
//.then((res) => { return res.json(); })
//GetMemberModify()