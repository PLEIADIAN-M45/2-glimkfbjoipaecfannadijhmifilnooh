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




//openOptionsPage();

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