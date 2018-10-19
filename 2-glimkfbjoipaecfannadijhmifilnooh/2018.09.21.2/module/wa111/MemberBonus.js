//console.log(1223);

/*
$(document).ajaxComplete(function(event, xhr, settings) {

    if (settings.url.includes("DepositBonus.ashx")) {
        var res = angular.fromJson(xhr.responseText)
        for (let row of res.rows) { evo.db.DepositBonus.put(row); }
    }

    if (settings.url.includes("DelDiceWinRecords.ashx")) {
        var s = settings.url.split('?');
        var searchParams = new URLSearchParams(s[1]);
        var pas = searchParams.get('pas');
        var id = searchParams.get('id');
        var option = { "1": "否", "3": "是" } [pas];
        evo.db.DepositBonus.get(id).then((x) => { upload_3(x, option, '111'); })
    }
});


XMLHttpRequestWatch(function(_postData, xhr) {
  console.log(xhr);

})*/





/*
console.group()
console.groupEnd()
*/

//YBF5566-26 可給
//function chuli(id, money, type) {
//function deal(id, type) {

/*
evo.db.DepositBonus.get(1673292).then((x) => {
    //console.log(x);
    upload_3(x, '是', '999');
})

*/



/// "url": "http://host26.wa111.net/LoadData/NextDayVolume/DelDiceWinRecords.ashx?pas=3&id=1673292&type=15&money=500&_=1538646244510",

/*
"url": "http://host26.wa111.net/LoadData/NextDayVolume/DelDiceWinRecords.ashx?pas=3&id=1673292&type=15&money=500&_=1538646244510",
"content": {
    "size": 1,
    "mimeType": "text/plain",
    "compression": -119,
    "text": "1"
},*/