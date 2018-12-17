define([], function(app) {
    'use strict';

    function factoryFunc($http, $resource) {
        var Ideas;

        Ideas = $resource('/api/ideas/:id', { id: '@id' });

        var svc = {
            allIdeas: allIdeas,
            ideaDetails: ideaDetails
        };

        return svc;

        function allIdeas() {
            return Ideas.query().$promise;
        }

        function ideaDetails(id) {
            return Ideas.get({ id: id }).$promise;
        }
    }



    factoryFunc.$inject = ['$http', '$resource'];

    console.log(factoryFunc.$inject);



    var abc = function() {

    }

    abc.$inject = ['$http', '$resource'];


    console.log(abc.$inject);

    return factoryFunc;
});




















// Service
function InboxService($http) {
    this.getEmails = function getEmails() {
        return $http.get('/emails');
    };
}
angular
    .module('app')
    .service('InboxService', InboxService);

// Factory
function InboxService($http) {
    return {
        getEmails: function() {
            return $http.get('/emails');
        }
    };
}
angular
    .module('app')
    .factory('InboxService', InboxService);








function InboxService($http) {
    this.getEmails = function getEmails() {
        return $http.get('/emails');
    };
}
angular
    .module('app')
    .service('InboxService', InboxService);







function InboxController(InboxService) {
    InboxService
        .getEmails()
        .then(function(response) {
            // use response
        });
}


angular
    .module('app')
    .controller('InboxController', InboxController);










function ideasHomeController($scope, ideasDataSvc) {
    $scope.ideaName = 'Todo List';
    $scope.gridOptions = {
        data: 'ideas',
        columnDefs: [
            { field: 'name', displayName: 'Name' },
            { field: 'technologies', displayName: 'Technologies' },
            { field: 'platform', displayName: 'Platforms' },
            { field: 'status', displayName: 'Status' },
            { field: 'devsNeeded', displayName: 'Vacancies' },
            { field: 'id', displayName: 'View Details', cellTemplate: '&lt;a ng-href="#/details/{{row.getProperty(col.field)}}"&gt;View Details&lt;/a&gt;' }
        ],
        enableColumnResize: true
    };
    ideasDataSvc.allIdeas().then(function(result) {
        $scope.ideas = result;
    });
}



app.factory('ideasDataSvc', ideasDataSvc);



console.log(app);