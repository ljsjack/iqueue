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
            templateUrl: 'loggedin.html',
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
    $rootScope.token = "hello";

    if (indexToken > 0){
        var endIndex = currUrl.search("#");
        $rootScope.token = currUrl.substring(indexToken + 6,endIndex);

        // For retrieving ivle user information.
        //var xhr = new XMLHttpRequest();
        //xhr.open('GET', "http://ipinfo.io/json", true);


        $location.path("/loggedin");
    }


});



app.controller('overallCtrl', function($rootScope, $location){


});