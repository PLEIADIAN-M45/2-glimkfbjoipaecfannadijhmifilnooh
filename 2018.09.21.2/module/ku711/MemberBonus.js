

requirejs(['xml'], function(xml) {
    //console.log(xml);
    xml._loadend = function() {
        var { _lastPath, _response } = this;
        //console.log(_lastPath, _response);
        //console.log(evo.IDB[_lastPath]);

        //console.log(_lastPath, _response);

        if (_lastPath == "GetMemberBonusLogBackendByCondition") {

        }



        if (_lastPath == "UpdateMemberBonusLog") {

            //console.log(_response);

            //var rec = json(sessionStorage[_response.AccountID])

            //assign(rec, _response, { AdjustTime: evo.getTime() })

            //console.log(rec);



            //assign(_response, { AdjustTime: evo.getTime() })




            //upload_4(_response)
            /*
            getUser({ account: 'kjpwei', channel: '16' }).then((x) => {
                console.log(x);
            })

            IDB['GetMemberBonusLogBackendByCondition']
                .get(_response.BonusNumber)
                .then((x) => {
                    console.log(x);
                })

            evo.sendMessage({
                command: 'apiFunctions:MemberBonus:host:channel',
                ..._response,
            }).then((x) => {
                console.log(x);
            })*/


        }
    }
})


//UpdateMemberBonusLog
/*

XMLHttpRequestWatch(function(_postData, xhr) {

    xhr.addEventListener('load', function() {
        var { responseURL, responseText } = this;
        var path = responseURL.split('/').pop();
        var postData = angular.fromJson(_postData);
        var res = angular.fromJson(responseText);
        switch (path) {
            case 'GetMemberBonusLogBackendByCondition':
                if (postData.DealType == null) {
                    var rows = res.Data.Data;
                    console.log(rows);
                    for (let row of rows) { evo.db.MemberBonus.put(row) }
                }
                break;
            case 'UpdateMemberBonusLog':
                var { AccountID, BonusNumber, BonusID, DealType } = postData;
                var option = { "3": "否", "2": "是" } [DealType];
                evo.db.MemberBonus.get(BonusNumber).then((x) => { upload_3(x, option, '111'); })
                break;
            case 'GetMemberBonusLogBackendByCondition':
                break;
        }
    });


})




evo.db.MemberBonus.get('B018100522421350701').then((x) => {
    console.log(x);
    upload_3(x, '是', '999');
})

*/

/*"postData": {
                  "mimeType": "application/json;charset=UTF-8",
                  "text": "{\"AccountID\":\"kjpwei\",\"BonusNumber\":\"B018100415191348002\",\"BonusID\":2,\"DealType\":2}"
              }
              */


/*
XMLHttpRequestWatch.load = function(_postData, xhr) {

    console.log(xhr);

    console.log(this);
}*/