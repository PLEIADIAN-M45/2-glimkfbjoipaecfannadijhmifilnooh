define([], function() {

    HTMLElement.prototype.show = function() {
        //console.log(this);
        this.style.display = "initial";
    }

    HTMLElement.prototype.hide = function() {
        // console.log(this);
        this.style.display = "none";
    }

    Array.prototype.slash = function() { return this.join(String.fromCharCode(47)) }
    Array.prototype.parseToModel = function() { return this.map((elem) => { return [elem.sname, elem.model]; }).serialize(); };
    Array.prototype.parseToCtrl = function() { return this.map((elem) => { return [elem.sname, elem]; }).serialize(); };
    Array.prototype.serialize = function() {
        try {
            var obj = {};
            this.forEach(([name, value]) => { if(name && value) { obj[name] = value } });
            return obj;
        } catch (ex) {}
    }




    function invoke($anchorScroll, $animate, $animateCss, $cacheFactory, $compile, $controller, $document, $exceptionHandler, $filter, $http, $httpBackend,
        $httpParamSerializer, $httpParamSerializerJQLike, $interpolate, $interval, $jsonpCallbacks, $locale, $location, $log, $parse, $q, $rootElement,
        $rootScope, $sce, $sceDelegate, $templateCache, $templateRequest, $timeout, $window, $xhrFactory) {}


})

function _sname_(elem) { if(elem.name) return elem.name.split("$").pop(); if(elem.id) { return elem.id.replace('ctl00_ContentPlaceHolder1_', ''); } else { return "" } }

function _model_(elem) {
    switch (elem.localName) {
        case 'input':
            return elem.value;
        case 'select':
            return elem.selectedOptions[0].label
        case 'button':
            return elem.title;
        case 'span':
            return elem.outerText;
    }
}







//console.log('app.instance.js');
/*
if (!HTMLElement.hasOwnProperty("sname")) {}
if (!HTMLElement.hasOwnProperty("model")) {}

Object.defineProperty(HTMLElement.prototype, "sname", {
    get: function() {
        if (this.name) { return this.name.split("$").pop(); } else if (this.id) { return this.id.replace('ctl00_ContentPlaceHolder1_', ''); }
    }
});

Object.defineProperty(HTMLElement.prototype, "model", {
    get: function() {
        switch (this.localName) {
            case 'input':
                return trim(this.value);
            case 'select':
                if (this.selectedOptions[0]) {
                    return { value: trim(this.value), text: trim(this.selectedOptions[0].label) }
                } else {
                    return { value: trim(this.value) }
                }
            case 'button':
                return trim(this.title);
            case 'span':
                return trim(this.outerText);
        }
    }
});
*/











/*
define([], function() {

});
*/



//console.log(HTMLElement.prototype.sname);
//console.log(HTMLElement.prototype.model);
//define(['angular', 'Dexie', 'moment', 'material', 'semantic', 'Robot'], function(angular, Dexie, moment, mdc, semantic, Robot) {



//console.log(11, 22);




/*
 Array.prototype.serialize = function() {
     var obj = {};
     this.forEach(([name, value]) => { if (name && value) { obj[name.trim()] = value.trim() } });
     return obj;
 }

*/

/*
 Array.prototype.serialize = function() {
     try {
         var obj = {};
         this.forEach(([name, value]) => { if(name && value) { obj[name] = value } });
         return obj;
     } catch (ex) {}
 };
*/