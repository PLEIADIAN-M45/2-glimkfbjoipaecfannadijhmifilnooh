/**
 * Inject the plugin straight into requirejs
 */
define("Injector", {
    
    load: function(name, req, onload, config) {


        console.log(name, req);

        return

        //Load the script using XHR, from background
        var oReq = new XMLHttpRequest();

        oReq.addEventListener("load", function() {

            //Find depenencies in the script, and prepend the
            //Injector! plugin, forcing the load to go through this
            //plugin.
            var modified = getDeps(oReq.response)

            //have requirejs load the module from text
            //it will evaluate the define, and process dependencies
            onload.fromText(modified);
        });

        oReq.open("GET", req.toUrl(name) + ".js");
        oReq.send();

        //Find dependencies and prepend Injector!
        function getDeps(script) {
            //extract the define call, reduced to a single line
            var defineCall = script.match(/define([\s\S])*?{/m)[0].split("\n").join("");
            //extract dependenceis from the call
            var depsMatch = defineCall.match(/\[([\s\S]*?)\]/);

            //if there are dependencies, inject the injectors
            if (depsMatch) {
                var deps = depsMatch[0];
                var replaced = deps.replace(/(\'|\")([\s\S]*?)\1/g, '$1Injector!$2$1');
                return script.replace(/define([\s\S]*?)\[[\s\S]*?\]/m, 'define$1' + replaced);
            }
            //no dependencies, return script
            return script;
        }
    }
});