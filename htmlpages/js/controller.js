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
            templateUrl: 'loggedin.html'
        })
        .when('/loggedin/:type', {
            templateUrl: 'loggedin.html'
        })
        .when('/loggedin/:type/:id',{
            templateUrl: 'loggedin.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('logInCtrl',function($scope, $location){
    var apiKey = "BjCvF8PqrwKfRZkH6cjLf";
    $scope.ivleLogInUrl = "https://ivle.nus.edu.sg/api/login/?apikey=" + apiKey + "&url=" + $location.absUrl() + "loggedin"

})


