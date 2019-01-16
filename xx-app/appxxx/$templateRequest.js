 console.log($sce, $location);


 //$sceDelegate.trustAs($sce.URL, "chrome-extension://glimkfbjoipaecfannadijhmifilnooh/module/html/*")
 $sce.trustAsResourceUrl("chrome-extension://glimkfbjoipaecfannadijhmifilnooh/module/html/edit.html")
 $templateRequest("chrome-extension://glimkfbjoipaecfannadijhmifilnooh/module/html/edit.html").then(function(html) {
     console.log(html);
     /*
     var template = angular.element(html);
     angular.element(document.getElementById('space-for-folders')).append($compile(template)($scope));
     */
 });

 //console.log(arguments);
 //Object.assign(this, new router());


 //$controller(constructor, locals, [bindings]);
 //$locals
 //ƒ $controller(expression, locals, later, ident)