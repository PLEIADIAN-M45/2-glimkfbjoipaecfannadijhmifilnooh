
define([

    evo.extend,


], function() {

})




/*
requirejs(['xml'], function(xml) {
    //console.log(xml);
    xml._loadend = function() {
        var { _lastPath, _response } = this;
        console.log(_lastPath, _response);
        //console.log(evo.IDB[_lastPath]);
        try {
            if (evo.IDB[_lastPath]) {
                for (let row of _response.rows) {
                    console.log(row);
                    evo.IDB[_lastPath].put(row);
                }
            }
        } catch (ex) {}
    }
})


*/
