define([], function() {
    /*
    HTMLElement.prototype.show = function() { this.style.display = "initial"; }
    HTMLElement.prototype.hide = function() { this.style.display = "none"; }
    Array.prototype.slash = function() { return this.join(String.fromCharCode(47)) }
    Array.prototype.parseToModel = function() { return this.map((elem) => { return [elem.sname, elem.model]; }).serialize(); };
    Array.prototype.parseToCtrl = function() { return this.map((elem) => { return [elem.sname, elem]; }).serialize(); };
    function invoke($anchorScroll, $animate, $animateCss, $cacheFactory, $compile, $controller, $document, $exceptionHandler, $filter, $http, $httpBackend,
        $httpParamSerializer, $httpParamSerializerJQLike, $interpolate, $interval, $jsonpCallbacks, $locale, $location, $log, $parse, $q, $rootElement,
        $rootScope, $sce, $sceDelegate, $templateCache, $templateRequest, $timeout, $window, $xhrFactory) {}
   */
    Array.prototype.serialize = function() {
        try {
            var obj = {};
            this.forEach(([name, value]) => { if(name && value) { obj[name] = value } });
            return obj;
        } catch (ex) {}
    }

})

function _sname_(elem) { if(elem.name) return elem.name.split("$").pop(); if(elem.id) { return elem.id.replace('ctl00_ContentPlaceHolder1_', ''); } else { return "" } }

function _model_(elem) { switch (elem.localName) {
        case 'input':
            return elem.value;
        case 'select':
            return elem.selectedOptions[0].label
            case 'button': return elem.title;
        case 'span':
            return elem.outerText; } }