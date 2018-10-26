function MainController($scope) {
    this.title = 'Some title';

    $scope.$watch(angular.bind(this, function() {
        return this.title;
    }), function(newVal, oldVal) {
        // handle changes
    });
}



//It is easier to just do :
function MainController($scope) {
    this.title = 'Some title';
    $scope.$watch('MC.title', function(newVal, oldVal) {
        // handle changes
    });
}


function config($stateProvider) {
    $stateProvider
        // MAIN ABSTRACT STATE, ALWAYS ON
        .state('main', {
            abstract: true,
            url: '/',
            controller: 'MainController as MC',
            templateUrl: '/routing-demo/main.html'
        })
        // A SIMPLE HOMEPAGE
        .state('main.homepage', {
            url: '',
            controller: 'HomepageController as HC',
            templateUrl: '/routing-demo/homepage.html'
        })
        // THE ABOVE IS ALL GOOD, HERE IS TROUBLE
        // A COMPLEX PRODUCT PAGE
        .state('main.product', {
            abstract: true,
            url: ':id',
            controller: 'ProductController as PC',
            templateUrl: '/routing-demo/product.html',
        })
        // PRODUCT DEFAULT SUBSTATE
        .state('main.product.index', {
            url: '',
            views: {
                'widget': {
                    controller: 'WidgetController as PWC',
                    templateUrl: '/routing-demo/widget.html'
                },
                'intro': {
                    controller: 'IntroController as PIC',
                    templateUrl: '/routing-demo/intro.html'
                },
                'content': {
                    controller: 'ContentController as PCC',
                    templateUrl: '/routing-demo/content.html'
                }
            }
        })
        // PRODUCT DETAILS SUBSTATE
        .state('main.product.details', {
            url: '/details',
            views: {
                'widget': {
                    controller: 'WidgetController as PWC',
                    templateUrl: '/routing-demo/widget.html'
                },
                'content': {
                    controller: 'ContentController as PCC',
                    templateUrl: '/routing-demo/content.html'
                }
            }
        });
}

angular.module('articleApp', ['ui.router'])
    .config(config);



function yoda() {

    var privateMethod = function() {
        // this function is not exposed
    };

    var publicMethod1 = function() {
        // this function is exposed, but it's internals are not exposed
        // some logic...
    };

    var publicMethod2 = function(arg) {
        // THE BELOW CALL CANNOT BE SPIED ON WITH JASMINE
        publicMethod1('someArgument');
    };

    // IF THE LITERAL IS RETURNED THIS WAY, IT CAN'T BE REFERRED TO FROM INSIDE
    return {
        publicMethod1: function() {
            return publicMethod1();
        },
        publicMethod2: function(arg) {
            return publicMethod2(arg);
        }
    };
}

function yoda() {

    var privateMethod = function() {
        // this function is not exposed
    };

    var publicMethod1 = function() {
        // this function is exposed, but it's internals are not exposed
        // some logic...
    };

    var publicMethod2 = function(arg) {
        // the below call cannot be spied on
        publicMethod1('someArgument');

        // BUT THIS ONE CAN!
        hostObject.publicMethod1('aBetterArgument');
    };

    var hostObject = {
        publicMethod1: function() {
            return publicMethod1();
        },
        publicMethod2: function(arg) {
            return publicMethod2(arg);
        }
    };

    return hostObject;
}
angular.module('app', [])
    .factory('yoda', yoda);







function scoringService($q) {

    var scoreItems = function(items, weights) {
        var deferred = $q.defer();
        var worker = new Worker('/worker-demo/scoring.worker.js');
        var orders = {
            items: items,
            weights: weights
        };
        worker.postMessage(orders);
        worker.onmessage = function(e) {
            if (e.data && e.data.ready) {
                deferred.resolve(e.data.items);
            }
        };

        return deferred.promise;
    };
    var hostObject = {
        scoreItems: function(items, weights) {
            return scoreItems(items, weights);
        }
    };

    return hostObject;

}

angular.module('app.worker')
    .factory('scoringService', scoringService);






//Now, the worker:

'use strict';

function scoringFunction(items, weights) {
    var itemsArray = [];
    for (var i = 0; i < items.length; i++) {
        // some heavy processing
        // itemsArray is populated, etc.
    }

    itemsArray.sort(function(a, b) {
        if (a.sum > b.sum) {
            return -1;
        } else if (a.sum < b.sum) {
            return 1;
        } else {
            return 0;
        }
    });

    return itemsArray;
}

self.addEventListener('message', function(e) {
    var reply = {
        ready: true
    };
    if (e.data && e.data.items && e.data.items.length) {
        reply.items = scoringFunction(e.data.items, e.data.weights);
    }
    self.postMessage(reply);
}, false);


function AnotherController() {
    this.text = 'abc';
}

function testForToptal() {
    return {
        controller: 'AnotherController as AC',
        template: '<p>{{ AC.text }}</p>'
    };
}

function testForToptal() {
    return {
        controller: 'AnotherController',
        controllerAs: 'AC',
        template: '<p>{{ AC.text }}</p>'
    };
}














app.config(function($stateProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            controller: 'MainController as MC ',
            templateUrl: ' /path/to/template.html '
        })
}).directive('testForToptal', testForToptal);

app.directive('upperCase', function() {
    return {
        scope: false,
        template: 'Name: <input ng-model="name"></input>'
    }
});