if (location.protocol == 'chrome-extension:22') {
    Api.prototype.idcard = function(request, sender, sendResponse) {
        function fesugar() {
            return {
                url: 'https://www.fesugar.com/get_identitycards',
                data: { id: request.value },
                callback: function(res) {
                    var d = res.data;
                    return {
                        province: d.address,
                        meta: d.birth + '/' + d.sex + '/' + getMemberAge(d.birth)
                    }
                }
            }
        }
        return [fesugar];
    }
}



if (location.protocol == 'chrome-extension:') {
    var GB2260 = angular.fromJson(localStorage["GB2260"])
    var MAP = new Map(GB2260)
    //console.log(GB2260);
    //console.log(MAP);
    Api.prototype.idcard = function(request, sender, sendResponse) {
        var prov = parseInt(request.value.substr(0, 2) + '0000');
        var city = parseInt(request.value.substr(0, 4) + '00');
        var area = parseInt(request.value.substr(0, 6));
        var result = {
            province: MAP.get(prov),
            city: MAP.get(city),
            area: MAP.get(area)
        }
        //console.log(result);
        sendResponse(result)
        /* console.log(request);
         console.log(prov, city, area);
         console.log(result);*/
    }
}