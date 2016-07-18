var app = angular.module("iqueue",['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider



        .state('home', {
            url: '/',
            templateUrl: 'views/firstpage.html'
        })

        .state('aboutus', {
            url: '/aboutus',
            templateUrl: 'views/aboutus.html'
        })

        .state('deck', {
            url: '/deck',
            templateUrl: 'views/deck.html'
        })

        .state('terrace', {
            url: '/terrace',
            templateUrl: 'views/terrace.html'
        })

        .state('frontier', {
            url: '/frontier',
            templateUrl: 'views/frontier.html'
        })

        .state('technoedge', {
            url: '/technoedge',
            templateUrl: 'views/technoedge.html'
        })

        .state('koufu', {
            url: '/koufu',
            templateUrl: 'views/koufu.html'
        })

        .state('foodclique', {
            url: '/foodclique',
            templateUrl: 'views/foodclique.html'
        })

        .state('loggedin', {
            url: '/loggedin',
            templateUrl : 'views/loggedin.html'
        })

        .state('account', {
            url: '/account',
            templateUrl : 'views/account.html'
        })
});


/* Overall controller for the app
 */

app.controller('overallCtrl', function($rootScope, $location, $state){


    var currUrl = $location.absUrl();
    var indexToken = currUrl.search("token");
    // There is a token string in the URL. Will extract and do a verification with the server.
    if (indexToken > 0) {
        var endIndex = currUrl.search("#");
        $rootScope.token = currUrl.substring(indexToken + 6, endIndex);



    }





});

/* This is the controller for the unloggedin default page.
 */

app.controller('firstPageCtrl', function($location, $scope, $rootScope){

    $rootScope.baseUrl = $location.absUrl() + 'loggedin';
    // This is the URL for IVLE log in.
    var apiKey = "BjCvF8PqrwKfRZkH6cjLf";
    $rootScope.apiKey = apiKey;
    $scope.ivleLogInUrl = "https://ivle.nus.edu.sg/api/login/?apikey=" + apiKey + "&url=" + $rootScope.baseUrl;



});




