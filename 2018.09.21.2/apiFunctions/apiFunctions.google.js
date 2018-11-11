apiFunctions.google = function() {
    delete request.banker[0].sites;
    delete request.idcard.sites;
    delete request.locate.sites;
    delete request.mobile.sites;
    delete request.author.sites;
    //console.log(request);
    evo.store.user.put(request);
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbx4-8tpjiIXqS78ds9qGGTt8xNmu39EQbZ50X59ohBEGyI2RA4I/exec',
        method: 'get',
        data: {
            test: true,
            audience: angular.fromJson(localStorage.tokenInfo).audience,
            command: request.command,
            params: angular.toJson(request)
        }
    }).then(function(d) {
        console.log(d);
        sendResponse(d);
    })
    return true;
}