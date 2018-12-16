
//'encrypt','extension'
//    console.log("host", evo.host, 'adapter:', evo.adapter, location.pathname);










requirejs(['moment', 'dexie', 'material', 'evo', 'semantic'], function(moment, Dexie, mdc, evo, semantic) {


    window.extend({ moment, Dexie, mdc, evo });

    //console.log('------------', evo);

    requirejs(['common', 'spreadsheets'], function() {


        requirejs(['myApp'], function(myApp) {

            /*requirejs(['root'], function() {

            })*/

        })

        /*requirejs([evo.adapter], function() {

        })*/


    })
});