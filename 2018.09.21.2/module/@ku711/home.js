define([], function() {
    return {
        host: "ku711",
        channel: "16",
        requestverificationtoken: $("ajax-anti-forgery-token").attr("token"),
        operator: $scope.ctrl.resetModel.AccountID.toUpperCase()
    }
})






//Object.assign(localStorage, obj)

//console.log(obj);



/*
console.log($scope);
console.log($("ajax-anti-forgery-token").attr("token"))
console.log($scope.ctrl.resetModel.AccountID.toUpperCase());

    
return {
    siteName: "KU711",
    channel: "16",
    requestverificationtoken: $("ajax-anti-forgery-token").attr("token"),
    operator: $scope.ctrl.resetModel.AccountID.toUpperCase()
}
*/

//define(["App"], function({ $scope }) {})






//if (evo.test) { $('.collapse').removeClass('collapse') }