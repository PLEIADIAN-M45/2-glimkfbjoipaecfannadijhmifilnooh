define(['xhr'], function(xhr) {
    xhr._loadend = function() {
        console.log(this);
    }
});









/*xml._loadend = function() {
    var { _lastPath, _response } = this;
    if (evo.IDB[_lastPath]) {
        console.log(_lastPath);
        try {
            for (let row of _response.rows) {
                console.log(row);
                evo.IDB[_lastPath].put(row);
            }
        } catch (ex) {
            console.log(ex);
        }
    } else {
        console.log(_lastPath);
    }
}*/