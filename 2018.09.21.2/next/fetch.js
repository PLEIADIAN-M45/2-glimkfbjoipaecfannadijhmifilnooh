var body = { "AccountID": "", "IDNumber": "", "RigistedIP": "", "TotalDepositAmount": null, "AccountNumber": "", "AccountName": "", "Email": "", "PhoneVerified": null, "IDVerified": null, "MinDeposit": null, "MaxDeposit": null, "StartRegistedTime": "", "EndRegistedTime": "", "PageNumber": 0, "RecordCounts": 20, "OrderField": "", "Desc": "true", "TotalDepositBonus": null, "AccountBookLevel": "", "AliPayLevel": "", "WeChatLevel": "", "CellPhone": "", "IsBlackList": null, "LevelType": null, "MemberStatus": "1", "IsFisrstDeposit": null, "MemberMemoType": null, "TransferOutStatus": null, "IsLogIn": null, "AgencyID": "", "TestType": null, "PayeeAccountNo": "", "LineType": "", "AccountingType": null, "ManageAccountID": "", "NickName": "" };

//console.log(Object.entries(body));

var formData = new FormData();

Object.entries(body).forEach(([name, value]) => {
    //console.log(name, value);
    formData.append(name, value);
})
/*
https://developer.mozilla.org/en-US/docs/Web/API/Blob
*/



fetch("https://bk.ku711.net/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo", {
        //"body": "{\"AccountID\":\"\",\"IDNumber\":\"\",\"RigistedIP\":\"\",\"TotalDepositAmount\":null,\"AccountNumber\":\"\",\"AccountName\":\"\",\"Email\":\"\",\"PhoneVerified\":null,\"IDVerified\":null,\"MinDeposit\":null,\"MaxDeposit\":null,\"StartRegistedTime\":\"\",\"EndRegistedTime\":\"\",\"PageNumber\":0,\"RecordCounts\":20,\"OrderField\":\"\",\"Desc\":\"true\",\"TotalDepositBonus\":null,\"AccountBookLevel\":\"\",\"AliPayLevel\":\"\",\"WeChatLevel\":\"\",\"CellPhone\":\"\",\"IsBlackList\":null,\"LevelType\":null,\"MemberStatus\":\"1\",\"IsFisrstDeposit\":null,\"MemberMemoType\":null,\"TransferOutStatus\":null,\"IsLogIn\":null,\"AgencyID\":\"\",\"TestType\":null,\"PayeeAccountNo\":\"\",\"LineType\":\"\",\"AccountingType\":null,\"ManageAccountID\":\"\",\"NickName\":\"\"}",
        
        "body": json(body),
        "method": "POST",
        "mode": "cors"
    })
    .then((resp) => resp.json())
    .then((d) => { console.log(d); })



var debug = body;
var blob = new Blob([JSON.stringify(debug, null, 2)], { type: 'application/json' });


console.log(blob);



function blobtoDataURL(blob, callback) {
    var fr = new FileReader();
    fr.onload = function(e) {
        callback(e.target.result);
    };
    console.log(fr);
    fr.readAsArrayBuffer(blob)
    /*fr.readAsBinaryString(blob)
    fr.readAsText(blob)
    fr.readAsDataURL(blob);
    */
}

blobtoDataURL(blob, function(dataURL) {
    console.log(dataURL);
});




/*
console.log(blob);
console.log(Buffer);
var buffer = new ArrayBuffer(8);
console.log(buffer.byteLength);
*/

/*
Methods
arrayBuffer()
blob()
formData()
json()
text()
*/








/*
console.log(formData);
console.log(formData.values());
*/



/*
$.ajax({
    url: "https://bk.ku711.net/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo",
    method: "POST",
    data: {
        "AccountID": "",
        "IDNumber": "",
        "RigistedIP": "",
        "TotalDepositAmount": null,
        "AccountNumber": "",
        "AccountName": "",
        "Email": "",
        "PhoneVerified": null,
        "IDVerified": null,
        "MinDeposit": null,
        "MaxDeposit": null,
        "StartRegistedTime": "",
        "EndRegistedTime": "",
        "PageNumber": 0,
        "RecordCounts": 20,
        "OrderField": "",
        "Desc": "true",
        "TotalDepositBonus": null,
        "AccountBookLevel": "",
        "AliPayLevel": "",
        "WeChatLevel": "",
        "CellPhone": "",
        "IsBlackList": null,
        "LevelType": null,
        "MemberStatus": "2",
        "IsFisrstDeposit": null,
        "MemberMemoType": null,
        "TransferOutStatus": null,
        "IsLogIn": null,
        "AgencyID": "",
        "TestType": null,
        "PayeeAccountNo": "",
        "LineType": "",
        "AccountingType": null,
        "ManageAccountID": "",
        "NickName": ""
    }
}).then((d) => { console.log(d); })

*/


//.then((resp) => resp.Data.Data)

/*
fetch("https://bk.ku711.net/member/api/MemberInfoManage/GetMemberSNInfoBackendWithExtraInfo", {
        "credentials": "include",
        "headers": {
            "requestverificationtoken": "3VQvs2PfY6XefdzvMjreDJjBx_F8TlUj1y7ednHma4eF9X-2Y_gMY-XmFWNrr8w37RHwuvNX_N7okyFzlZgHuaehlV81:0wQQU_iIKT1doexrBLi0yCHdAKCa-Y1dovLzcppxFZP1qjzfdRqnggykcTmaOBJxqO-ZHDRbUFEjAtI4Hh_sUUw9uO19Isk6e8HXvRqOr-V31UPWtklFfeICZP-jQzluIXZPkQ2",
            "content-type": "application/json;charset=UTF-8",
            "origin": "chrome-extension://glimkfbjoipaecfannadijhmifilnooh"
        },
        //"referrer": "https://bk.ku711.net/member/MemberInfoManage/MemberInfoManage",
        //"referrerPolicy": "no-referrer-when-downgrade",
        "body": "{\"AccountID\":\"\",\"IDNumber\":\"\",\"RigistedIP\":\"\",\"TotalDepositAmount\":null,\"AccountNumber\":\"\",\"AccountName\":\"\",\"Email\":\"\",\"PhoneVerified\":null,\"IDVerified\":null,\"MinDeposit\":null,\"MaxDeposit\":null,\"StartRegistedTime\":\"\",\"EndRegistedTime\":\"\",\"PageNumber\":0,\"RecordCounts\":20,\"OrderField\":\"\",\"Desc\":\"true\",\"TotalDepositBonus\":null,\"AccountBookLevel\":\"\",\"AliPayLevel\":\"\",\"WeChatLevel\":\"\",\"CellPhone\":\"\",\"IsBlackList\":null,\"LevelType\":null,\"MemberStatus\":\"1\",\"IsFisrstDeposit\":null,\"MemberMemoType\":null,\"TransferOutStatus\":null,\"IsLogIn\":null,\"AgencyID\":\"\",\"TestType\":null,\"PayeeAccountNo\":\"\",\"LineType\":\"\",\"AccountingType\":null,\"ManageAccountID\":\"\",\"NickName\":\"\"}",
        "method": "POST",
        "mode": "cors"
    })
    .then((resp) => resp.json())
    .then(function(d) {
        console.log(d);
    })
    */

//https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data

/*

var formData = new FormData();
var fileField = document.querySelectorAll("input");
console.log(fileField);

var formData = new FormData();
formData.append('username', 'abc123');
console.log(formData);
console.log(formData.values());



formData.append('avatar', fileField[0]);*/





/*
fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', JSON.stringify(response)));
U
*/