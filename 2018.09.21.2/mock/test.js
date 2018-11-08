//fetch('../bonus-har/GetSystemLog-222-host26.wa111.net.har')



var url = '../gift/26/host26.wa111.net.har'

var url = '../gift/16/bk.ku711.net-2.har'
var url = '../gift/16/bk.ku711.net-1.har'

var url = '../d/host26.wa111.net.har'

fetch(url)


    .then(function(response) {
        return response.json();
    })
    .then(function(d) {

        //console.log(d.log.entries);
        var entries = d.log.entries;

        console.log(entries);

        for (let x of entries) {

            var { request, response } = x;
            var { url, method, postData, queryString } = request;
            var { content } = response;
            var responseURL = new URL(url);

            //console.log(queryString);
            //console.log(responseURL.pathname);

            switch (responseURL.pathname) {
                case '/LoadData/AccountManagement/MemberModify.ashx':
                    console.log(postData);
                    console.log(queryString);

                    // statements_1
                    break;
                default:
                    // statements_def
                    break;
            }


            if (url.includes('MemberModify.ashx')) {


                //console.log(queryString);

                var target = queryString.filter(({ name, value }) => {
                    //console.log(name, value);
                    return (name == "action")
                })

                // console.log(target);

                //request.queryString
                //console.log(url.split('/'));

                // console.log(url);
                // console.log(x.response.content.text);

                // document.write(x.response.content.text)
            }

            if (url.includes('UpdateMemberBonusLog')) {
                //console.log(url.split('/'));

                // console.log(url);
                //console.log(x.response.content.text);

                // document.write(x.response.content.text)
            }
            if (url.includes('aspx')) {
                //console.log(url.split('/'));

                // console.log(url);
                // console.log(x.response.content.text);

                // document.write(x.response.content.text)
            }

            if (url.includes('DepositBonusAdd')) {
                //console.log(url.split('/'));

                //console.log(x);
                //console.log(x.response.content.text);

                // document.write(x.response.content.text)
                // "{"AccountID":"kjpwei","StartTime":"2018-10-04","EndTime":"2018-10-04","BonusType":null}"
            }
        }

        //console.log(JSON.stringify(myJson));
    });

/*
bonus-har/GetSystemLog-222-host26.wa111.net.har


bonus-har/DepositBonus.har

bonus-har/MemberLog-F61539-host26.wa111.net.har
bonus-har/bonus-ok-host2.wa111.net.har
['../bonus-har/bonus-ok-host26.wa111.net.har', '../bonus-har/bonus-ok-host35.wa111.net.har']*/