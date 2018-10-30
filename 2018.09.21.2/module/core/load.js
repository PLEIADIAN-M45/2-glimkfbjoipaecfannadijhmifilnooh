window.extend = function() { return Object.assign(this, ...arguments); }

document.addEventListener('copy', function(e) {
    e.clipboardData.setData('text/plain', e.target.attributes["data-content"].value);
    e.preventDefault();
});

//'encrypt','extension'
//    console.log("host", evo.host, 'adapter:', evo.adapter, location.pathname);










requirejs(['moment', 'dexie', 'material', 'evo', 'semantic'], function(moment, Dexie, mdc, evo, semantic) {


    window.extend({ moment, Dexie, mdc, evo });

    //console.log('------------', evo);

    requirejs(['common', 'spreadsheets'], function() {


        requirejs(['root.App'], function(myApp) {

            console.log(myApp);

            requirejs(['root'], function() {})
        })

        /*requirejs([evo.adapter], function() {

        })*/


    })
});