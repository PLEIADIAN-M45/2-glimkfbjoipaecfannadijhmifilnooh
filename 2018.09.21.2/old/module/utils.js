define(['evo', 'semantic'], function(evo) {
    evo.error = function() {
        var templateUrl = evo.baseUrl + "Components/error.html";
        fetch(templateUrl).then(function(response) {
            return response.text()
        }).then(function(templateHTML) {
            var element = document.createElement('myApp-template-' + evo.time.value());
            element.innerHTML = templateHTML;
            document.body.appendChild(element);
        })
    }
})