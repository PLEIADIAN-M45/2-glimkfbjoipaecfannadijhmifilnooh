define([], function() {

    return function() {

        $scope.scrollHeightPoster = function() {
            console.log(document.body.scrollHeight + 50);
            window.parent.postMessage({
                id: $scope.iFrameId,
                scrollHeight: document.body.scrollHeight + 50
            }, '*');
        }


        
    }
})