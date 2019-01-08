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