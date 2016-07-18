var app = angular.module("iqueue",['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'firstpage.html'
        })
        .when('/mainpage',{
            templateUrl: 'firstpage.html'
        })

        .when('/aboutus',{
            templateUrl: 'aboutus.html'
        })
        .when('/signup',{
            templateUrl: 'signup.html'
        })
        .when('/deck',{
            templateUrl: 'deck.html'
        })
        .when('/terrace',{
            templateUrl: 'terrace.html'
        })
        .when('/frontier',{
            templateUrl: 'frontier.html'
        })
        .when('/technoedge',{
            templateUrl: 'technoedge.html'
        })
        .when('/koufu',{
            templateUrl: 'koufu.html'
        })
        .when('/foodclique',{
            templateUrl: 'foodclique.html'
        })
        .when('/loggedin', {
            templateUrl : 'loggedin.html'
        })
        .when('/account',{
            templateUrl : 'account.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});




app.controller('logInCtrl',function($scope, $location, $rootScope){
    var apiKey = "BjCvF8PqrwKfRZkH6cjLf";

    $scope.ivleLogInUrl = "https://ivle.nus.edu.sg/api/login/?apikey=" + apiKey + "&url=" + $location.absUrl() + "#/loggedin"
    var currUrl = $location.absUrl();
    var indexToken = currUrl.search("token");

    if (indexToken > 0){
        var endIndex = currUrl.search("#");
        $rootScope.token = currUrl.substring(indexToken + 6,endIndex);
        $location.path("/loggedin");

        // For retrieving ivle user information.
        /*
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://ivle.nus.edu.sg/api/Lapi.svc/UserName_Get?APIKey="
            + apiKey + "&Token=" + $rootScope.token, true);
        xhr.send();

        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                $rootScope.username = JSON.parse(xhr.responseText);
            }
        }

        xhr.addEventListener("readystatechange", processRequest, false);
        */

    }


});

app.controller('firstPageCtrl', function($location, $scope){

    var apiKey = "BjCvF8PqrwKfRZkH6cjLf";

    $scope.ivleLogInUrl = "https://ivle.nus.edu.sg/api/login/?apikey=" + apiKey + "&url=" + $location.absUrl() + "#/loggedin"
    var currUrl = $location.absUrl();
    var indexToken = currUrl.search("token");

})




app.controller('overallCtrl', function($rootScope, $location){
    var currUrl = $location.absUrl();
    var indexToken = currUrl.search("token");
    if (indexToken > 0) {
        var endIndex = currUrl.search("#");
        $rootScope.token = currUrl.substring(indexToken + 6, endIndex);
        $location.path("/loggedin");
    }

});