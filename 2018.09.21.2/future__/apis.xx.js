apis.openDeposit = function({ frameId }) {
    //console.log(frameId);
    //console.log(apis.port[frameId]);
    apis.port[frameId].postMessage('setPermit')
    return Promise.resolve(frameId);
    // return apis.sendMessage({ frameId: $scope.user.frameId });
}




/*
chrome.webNavigation.onCreatedNavigationTarget.addListener(function(details) {
    console.log(details);
})
*/


/*
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log(tab);
})
*/


//requirejs(["angular", "jquery", "moment"], function(angular, jquery, moment) { requirejs([], function() {}) });
//var apis = { dexie, baseUrl: {}, port: {} };