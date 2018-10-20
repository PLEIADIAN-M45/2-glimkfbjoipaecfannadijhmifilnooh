define(['xml'], function(xml) {
    //console.log(xml);
    xml._loadend = function() {

        //console.log(this);

        /*var { _lastPath, _response } = this;

        console.log(this);
        console.log(_lastPath, _response);

        try {
            for (let row of _response.rows) {
                //console.log(row);
                evo.IDB[_lastPath].put(row);
            }
        } catch (ex) {}*/
    }

});

/*define(['xml'], function(xml) {

    console.log(xml);


    xml._loadend = function() {
        //console.log(this.status);


        console.log(this);
    }


});

*/



/*  console.log(xmlhttprequest);

     xmlhttprequest._loadend = function() {
         console.log(this.params);
     }*/