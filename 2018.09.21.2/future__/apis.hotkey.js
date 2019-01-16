apis.$keydown(async function(e) {
    console.log(e);
    switch (e.key) {
        case "Escape":
            console.clear();
            break;
        case "Delete":
            apis.delUser();
            break;
        case "`":
            console.log($scope.user);

            break;
        case "1":
            await apis.getUser();
            $scope.$apply();
            break;
        case "2":
            await apis.setUser();
            $scope.$apply();
            break;
        case "3":
            apis.setUser()
            break;
        case "4":

            break;
        case "5":
            apis.putUser();
            break;
        case "6":
            $scope.$apply();
            break;

        default:
            // statements_def
            break;
    }
})