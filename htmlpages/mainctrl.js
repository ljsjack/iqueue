var app = angular.module("iqueue",['ui.router']);

app.config(function($urlRouterProvider, $stateProvider, $httpProvider){



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

        .state('aboutUsLogged', {
            url: '/aboutuslogged',
            templateUrl: 'views/aboutuslogged.html'
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
        });


});




/* Overall controller for the app
 */

app.controller('overallCtrl', function($rootScope, $location, $http, $scope){

    $rootScope.apiKey = "BjCvF8PqrwKfRZkH6cjLf";
    $rootScope.baseUrl = "https://ivle.nus.edu.sg/api/Lapi.svc";

    var currUrl = $location.absUrl();
    var indexToken = currUrl.search("token");

    // There is a token string in the URL. Will extract and do a verification with the server.
    if (indexToken > 0) {
        var endIndex = currUrl.search("/loggedin");

        $rootScope.token = currUrl.substr(indexToken + 6);

        $location.path('/loggedin');


        var uNameUrl = $rootScope.baseUrl + "/UserName_Get?APIKey=" + $rootScope.apiKey + "&Token=" + $rootScope.token;

        var uNameUrlJsonP = "https://crossorigin.me/" + uNameUrl;
        console.log(uNameUrl);
        console.log(uNameUrlJsonP);
        $http.get(uNameUrlJsonP)
            .then(function(response){
                $rootScope.uName = response.data;
            })



    }





});


/* This is the controller for the unloggedin default page.
 */

app.controller('firstPageCtrl', function($location, $scope, $rootScope){

    $rootScope.baseUrl = $location.absUrl();
    // This is the URL for IVLE log in.
    $scope.ivleLogInUrl = "https://ivle.nus.edu.sg/api/login/?apikey=" + $rootScope.apiKey + "&url=" + $rootScope.baseUrl;




});


app.controller('loggedInCtrl', function($location, $scope, $rootScope){


});



