var isJson = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
var openOptionsPage = function() { chrome.runtime.openOptionsPage() };
var createTabs = function(url) { chrome.tabs.create({ url: url }) }
//openOptionsPage();

/*
var json = function(a) {
    try {
        return (typeof a == 'string') ? JSON.parse(a) : JSON.stringify(a);
    } catch (ex) {
        //console.log(ex);
        return a;
    }
};
*/
/*
var db = new Dexie('evo');
db.version(1).stores({
    user: 'uniqueId',
    mobile: 'uniqueId',
    locate: 'uniqueId',
    idcard: 'uniqueId',
    sms: 'uniqueId',
    DepositBonus: 'uniqueId',
    PhoneDate: 'uniqueId',
    MemberList: 'uniqueId'
});
*/





//createTabs("/mock/test.html")


/*
http://dexie.org/docs/Dexie/Dexie.delete()
Dexie.delete('database_name');
db.delete().then(() => {
    console.log("Database successfully deleted");
}).catch((err) => {
    console.error("Could not delete database");
}).finally(() => {
    // Do what should be done next...
});
*/
//



/*
var selShow = 1;
fetch("http://host26.wa111.net/LoadData/AccountManagement/GetMemberList.ashx?ddlWarn=0&f_Account=&f_RemittanceName=&f_BankAccount=&txtAlipayAccount=&txtEmail=&txtPhoto=&txtIdCard=&txtPickName=&txtChat=&ddlBankInfo=&zwrq=&zwrq2=&selSurplus=&selShow=" + selShow + "&selAccountType=&selIsDeposit=&selLevel=&selBank=&selMutualStatus=&ddlAliPay=&ddlWeChat=&hidevalue_totals=&pageIndex=1&hidevalue_RecordCount=0&type=getAllUser&_=1540046540572", {
        "credentials": "include",
        "headers": {},
        "referrer": "http://host26.wa111.net/Aspx/MemberList.aspx?sort=Font_xianyousuoyouhuiyuan",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
    })
    .then((resp) => resp.json())
    .then(function(data) {
        console.log(data);
        data.rows.forEach((d) => {
            console.log(d.f_accounts, d.f_nickName, d.f_joindate, d.f_ishow, d.f_depositStatus, d.f_RemittanceAccount);
        })
    })*/

