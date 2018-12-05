

 /*
            if(deps[0] == "App") {
                //console.log(deps);
                setTimeout(function() {
                    console.log(window.App);
                }, 2000)
            }*/
            //console.log(callback);





   const addEventListener = (event, handler, eventMap) =>
       eventMap.has(event) ?
       new Map(eventMap).set(event, eventMap.get(event).concat([handler])) :
       new Map(eventMap).set(event, [handler]);
   const dispatchEvent = (event, eventMap) =>
       (eventMap.has(event) && eventMap.get(event).forEach(a => a())) ||
       event;


//var c = new factory()
//console.log(c);





  var $viewElement = document.getElementById('View') || document;
  var $view = angular.element($viewElement);
  var $module = angular.module("OBSApp");
  var $rootScope = angular.element(document).scope();
  var $injector = $view.injector();
  var $scope = $view.scope();
  var $invoke = $injector.invoke;
  var $compile = $injector.get('$compile');


  return new OBSApp().$scope;


  //this.$viewer = angular.element(this.element)
  //this.$element = angular.element(document.querySelector('[ng-controller]'))


  //angular.element("#View") || angular.element(document.body);
  /*
  Object.prototype
  Object.isExtensible()
  Function.prototype
  String.prototype
  */


  //return angular.bootstrap(document, ["OBSApp"]);


  class Scope extends App {



      //console.log(x);
      //this.$scope.__proto__[x] = factory[x];


      constructor() {
          super();
          //this.ctrl = parseToCtrl.call(elems);
          //this.model = parseToModel.call(elems);
          this.url = new URL(location.href);
          this.searchParams = new URLSearchParams(location.search);
          this.params = Array.from(this.searchParams).serialize();
          this.baseUrl = require.toUrl('.');
          this.extensionId = localStorage.extensionId;
          this.channel = localStorage.channel;
          this.account = this.params.account;
          this.unique = [this.account, this.channel].join("-");
          this.operator = localStorage.operator;
          this.path = location.pathname.split('?')[0].split('.')[0].split('/').pop().toLowerCase();
          this.origin = location.origin;
          this.port = location.port;
          this.host = (this.port) ? { "8876": "wa111", "26": "wa111", "35": "wa111", "17": "wa111", "16": "ku711" } [this.port] : location.host.split(".")[1];
          this.route = window.module;
          this.stylesheet = { "edit": ['edit'], "logs": ['logs', 'cards'] } [this.route];
          this.components = { "edit": ['edit', 'dialog'], "logs": ['cards'] } [this.route];
          this.dexie = new Dexie('evo');
          console.log(this);
          //console.log(this.$mainModule);
      }


      sendMessage(message) {
          return new Promise((resolve, reject) => {
              chrome.runtime.sendMessage(this.extensionId, message, function(res) { try { resolve(res) } catch (ex) { reject(ex) } })
          })
      }





      assign() { Object.assign(this, ...arguments) };

      apply(res) { if(!this.$$phase) { this.$apply(); }; return res; }


      injectStylesheet() {
          if(!this.stylesheet) { return false };
          this.stylesheet.map((str) => { return require.toUrl('../css/@.css').replace('@', str); }).map((src) => { $("<link>", { rel: "stylesheet", type: "text/css", href: src }).appendTo('body'); });
      };

      injectComponents() {
          if(!this.components) { return false };
          this.components.map((str) => { return require.toUrl('../html/@.html').replace('@', str); }).map((src) => {
              console.log(this);
              /*
              fetch(src).then(responseType.text).then((html) => {
                  var template = angular.element(html);
                  this.$projElement.append(template);
                  this.$compile(template)(this.$scope);
                  this.$scope.$apply();
              });*/
          });
      };


      invoke() {
          this.injectStylesheet();
          this.injectComponents();
          //console.log(this.stylesheet);
          //console.log(this.components);
      };




  }
  return new App();

   /*
                get channel() {

                }
                set channel(value) {
                    console.log(value);
                    //this = value
                }
                */






/*
            this.bind({
                channel: window.siteNumber,
                siteName: this.model.spTitle2,
                operator: this.model.hdfsite_tab.split('_')[0]
            })*/



/*

this.bind({ siteName: this.model.spTitle2 })
        localStorage.assign({
    channel: window.siteNumber,
    siteName: this.model.spTitle2,
    operator: this.model.hdfsite_tab.split('_')[0]
})*/