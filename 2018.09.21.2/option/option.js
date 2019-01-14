function input_select() {
    console.log(this);
    $(this).select();
}

chrome.getAuthToken = function getAuthToken(interactive) {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ "interactive": interactive }, resolve)
    })
}

chrome.getTokenInfo = function(token) {
    return $.post('https://www.googleapis.com/oauth2/v2/tokeninfo', { access_token: token })
}


function setItem(obj) {
    Object.assign($scope, obj)
    if (!$scope.$$phase) { $scope.$apply(); }
    Object.entries(obj).forEach(([name, value]) => {
        value = angular.toJson(value);
        localStorage.setItem(name, value);
    })
}

function assign(items) {
    Object.assign($scope, items);
    if (!$scope.$$phase) { $scope.$apply(); }
}

var chromeVersion = navigator.userAgent.match(/Chrome\/(\d+\.?)+/g)[0].split('/')[1]


angular.module('myApp', [])

    .controller('myCtrl', function($scope, $http, $timeout) {

        window.$scope = $scope;
        $scope.assign = assign;
        $scope.assign(initial);

        $scope.chromeVersion =
            chromeVersion;

        $scope.save =
            function(config) {
                chrome.storage.sync.set({ config }, function() {
                    console.log(config);
                })
            };


        async function start() {
            $("input[type=text]").click(input_select);
            $('.dropdown').dropdown();
            chrome.getAuthToken(true).then(chrome.getTokenInfo).then(setItem);
            chrome.storage.sync.get(setItem);
            chrome.identity.getProfileUserInfo(setItem);


            console.log($scope.config);

        }


        $timeout(start, 1000);



        $scope.login = function(name, index) {

            //$scope.save($scope.config);



            //console.log($scope.config[name]);


            //console.log($scope.config[name].server);

            var server = $scope.config[name].server

            //.replace(/(host|admin)/g, '$1' + parseInt(site.port.slice(-2)))

            ;
            ["26", "35", "17", "21", "2", "5"].map((port) => {
                console.log(server.replace(/(host|admin)/g, "$1" + port));
            })


            ;
            ["26", "35", "17", "21", "2", "5"].map((port) => {
                console.log(server.replace("net:", "net:63" + port.padStart(2, "0")));
            });



            /*
            $('.login.' + name).hide();
            setTimeout(function() {
                $('.login.' + name).show();
            }, 5000)
            var _sites = $scope.sites[name];
            var _board = $scope.config[name];
            var _page = $scope.pages[name];
            var _country = $scope.config.countries;
            if (!_board.username) {
                return false
            }
            if (!_board.password) {
                return false
            }
            if (!_board.server) {
                return false
            }
            if (!_board.security && name == 'cashier') {
                return false
            }
            $.each(_sites, function(index, site) {
                var server = _board.server;
                server = server.replace(/(host|admin)/g, '$1' + parseInt(site.port.slice(-2)));
                //server = server.replace(/(\d{1,3})$/g, '$1:' + site.port);
                server = server.replace(/(:)$/g, '$1' + site.port);
                var path = server + _page;
                //console.log(path);
                if (_country[site.country]) {
                    createTabs(path)
                }
            });
            */
        };
    })