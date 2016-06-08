var app = angular.module("iqueue",['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'firstpage.html'
        })
        .when('/anotherPage',{
            template: 'Welcome user,again!'
        })
        .otherwise({
            redirectTo: '/'
        });
});
