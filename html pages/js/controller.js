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
        .otherwise({
            redirectTo: '/'
        });
});
