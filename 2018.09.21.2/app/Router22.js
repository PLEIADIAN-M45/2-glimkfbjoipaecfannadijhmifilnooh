 class Router {

     constructor(x) {
         this.rootUrl = chrome.runtime.getURL("/")
         this.baseUrl = chrome.runtime.getURL(x);
         this.extensionId = chrome.runtime.id;
         this.port = location.port;
     }


     get rootUrl() { return localStorage.rootUrl }
     set rootUrl(value) { localStorage.rootUrl = value }
     get baseUrl() { return localStorage.baseUrl }
     set baseUrl(value) { localStorage.baseUrl = value }
     get extensionId() { return localStorage.extensionId }
     set extensionId(value) { localStorage.extensionId = value }

     get server() {
         return (location.port) ? { "6326": "wa111", "6335": "wa111", "6317": "wa111", "6302": "wa111", "8876": "wa111" } [location.port] : location.host.split('.')[1]
     }
     set server(value) {
         localStorage.server = value
     }


 }

  class Router33 {
        constructor() {
            this.aaa = 324
        }
        get $server() {
            return localStorage.server;
        }
        get $locate() {
            return location.pathname.split(".")[0].split("/").pop().toLowerCase();
        }
        get $router() {
            return { wa111, ku711 } [this.$server];
        }
        get $module() {
            return this.$router[this.$locate];
        }
        static _$module() {
            console.log(this.aaa);
            console.log(this.$server);
            return 3
        }
    }


    class Router {
        constructor() {
            //console.log(this.constructor.$server);
            /*for(var i in this.constructor) {
                console.log(i);
            }*/
            this.fuck()
            //this.$module23 = 6
            //console.log(this.constructor.$server);
            //console.log(Object.getOwnPropertyDescriptors(this));
            //console.log(Object.getOwnPropertyNames(this.__proto__));
            //console.log(Object.getOwnPropertyNames(this));
        }

        fuck() {
            for(var i in this.constructor) {
                console.log(i);
            }

        }
    }
    Router.$server = localStorage.server;
    Router.$locate = location.pathname.split(".")[0].split("/").pop().toLowerCase();
    Router.$router = { wa111, ku711 } [Router.$server];
    Router.$module = Router.$router[Router.$locate];

    //console.log(Router.prototype);
    //console.log(Router.__proto__);


 /*
  get xxx() { return }
      set xxx() {}


 */




 var server = {
     "6326": "wa111",
     "6335": "wa111",
     "6317": "wa111",
     "6302": "wa111",
     "8876": "wa111",
     "26": "wa111",
     "16": "ku711",
     "": location.host.split('.')[1]
 } [location.port];


 var rootUrl = chrome.runtime.getURL("/");
 //var baseUrl = chrome.runtime.getURL(server);
 var baseUrl = chrome.runtime.getURL("app");

 var extensionId = chrome.runtime.id;