function Factory2() {

    console.log(this);
    console.log(this.$scope);


    //console.log(App);
    //console.log(this);
    //console.log(this);
    //angular.extend(this, Factory.prototype);

    //console.log(Object.getOwnPropertyDescriptors(this));

    //  console.log(Object.create(this));


    //angular.extend(this.$scope, Factory.prototype);
    //angular.extend(this.$scope, Factory.prototype);




    //Object.defineProperties(this.$scope, Object.getOwnPropertyDescriptors(this));
    //Object.defineProperties(this.$scope, Object.create(this));



    //Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));



    //var a = Object.getOwnPropertyDescriptors(this)

    //var c = Object.getOwnPropertyDescriptors(this)

    //console.log(c);
    /*
            $rootScope = this.$rootScope;
            $scope = this.$scope;
            // console.log(x);
            angular.extend(this, Factory.prototype);
    */
    /*
    this.$scope = $scope;
    this.$rootScope = $rootScope;

    angular.extend(this, Factory.prototype);*/

    //angular.extend($rootScope, this);
    //$xmlSpider.$scope = $rootScope
    //console.log($rootScope);
}

/*
        function $clipboard(str) {
            console.log(this);
            window.clipboardData = str;
            document.execCommand("copy");
            //document.addEventListener('keydown', callback);
        }*/

/***************************************************/
/*account,
channel,
unique,
$model,
$ctrl,
*/

var obj = {

}


//console.log($mdc.constructor.name);

//console.log($dexie.constructor.name);
/*
        ;
        [
            $mdc,
            $dexie,
            $xmlSpider,
            $sendMessage,
            $getUser,
            $delUser,
            $putUser,
            $setUser,
            $ajax,
            createTab,
            getModule,
            $console,
            $keydown
        ].forEach((f) => {
            switch (typeof f) {
                case "object":
                    console.log(f, f.name || f.constructor.name);
                    break;
                case "function":
                    //console.log(typeof f, f.name);
                    break;
                default:
                    // statements_def
                    break;
            }
        })*/


//console.log(angular);


return new Factory();
//$scope.$digest();





//console.log(this.$apply);
//this.$apply=
//Object.assign($rootScope, Factory.prototype)

/*
return function($anchorScroll, $animate, $animateCss, $cacheFactory, $compile, $controller, $document, $exceptionHandler, $filter, $http, $httpBackend,
            $httpParamSerializer, $httpParamSerializerJQLike, $interpolate, $interval, $jsonpCallbacks, $locale, $location, $log, $parse, $q, $rootElement,
            $rootScope, $sce, $sceDelegate, $templateCache, $templateRequest, $timeout, $window, $xhrFactory) {}
            */


//set channel(value) { localStorage.channel = value }
//get channel() { return localStorage.channel || this.params.siteNumber; }
//set $operator(value) { localStorage.operator = value }
//get $operator() { return localStorage.operator; }
//set siteName(value) { localStorage.siteName = value }
//get siteName() { return localStorage.siteName; }