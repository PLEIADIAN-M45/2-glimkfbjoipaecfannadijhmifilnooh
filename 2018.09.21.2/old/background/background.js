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
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.captureVisibleTab(tab.windowId, {
        format: 'png'
    }, function(dataUrl) {
        console.log(dataUrl);
        fs.createWriter(dataUrl)
    })
})
*/

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


openOptionsPage();