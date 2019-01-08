define(["angular", "angular-sanitize", "angular-animate"], (angular) => {

    $('html').attr('ng-app', $name);
    $("<div>", { "id": $ctrlId, "ng-controller": $ctrlId }).appendTo("body");
    angular.module($name, ["ngSanitize", "ngAnimate"]).controller($ctrlId, function() {});
    angular.bootstrap(document, [$name]);
    //return this.$loadModule();
})