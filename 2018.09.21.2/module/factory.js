/*define([], function() {
    console.log(this);
})
*/


function invoke() {
    fnStylesheet();
    fnComponents();
    console.log('_invoke......');
}

function fnStylesheet() {
    $scope.stylesheet.forEach(function(name) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = require.toUrl("./css/" + name + ".css");
        link.onload = function() { /*console.log(link.href);*/ }
        document.body.appendChild(link);
    });
}

function fnComponents() {
    if (!$scope.components) { return };
    $scope.components.forEach((name) => {
        var templateUrl = require.toUrl("./html/" + name + ".html");
        fetch(templateUrl).then((resp) => { return resp.text() }).then((html) => {

            var template = angular.element(html);
            $projElement.append(template);
            $compile(template)($scope);
            //$compile(template.contents())($scope);
            //console.log(template.contents());
            $scope.template_loaded = 1;
            $scope.$apply();
        })
    })
}


function connect(message) {
    chrome.runtime.connect(this.extensionId, { name: this.channel })
}



define([], function() {



})

