var app = angular.module("iqueue",['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'firstpage.html'
        })

        .state('aboutus', {
            url: '/aboutus',
            templateUrl: 'aboutus.html'
        })

        .state('deck', {
            url: '/deck',
            templateUrl: 'deck.html'
        })

        .state('terrace', {
            url: '/terrace',
            templateUrl: 'terrace.html'
        })

        .state('frontier', {
            url: '/frontier',
            templateUrl: 'frontier.html'
        })

        .state('technoedge', {
            url: '/technoedge',
            templateUrl: 'technoedge.html'
        })

        .state('koufu', {
            url: '/koufu',
            templateUrl: 'koufu.html'
        })

        .state('foodclique', {
            url: '/foodclique',
            templateUrl: 'foodclique.html'
        })

        .state('loggedin', {
            url: '/loggedin',
            templateUrl : 'loggedin.html'
        })

        .state('account', {
            url: '/account',
            templateUrl : 'account.html'
        })
});


/* Overall controller for the app
 */

app.controller('overallCtrl', function($rootScope, $location){
    var currUrl = $location.absUrl();
    var indexToken = currUrl.search("token");
    if (indexToken > 0) {
        var endIndex = currUrl.search("#");
        $rootScope.token = currUrl.substring(indexToken + 6, endIndex);
        $location.path("/loggedin").replace();
    }




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

});

/* This is the controller for the unloggedin default page.
 */

app.controller('firstPageCtrl', function($location, $scope){

    // This is the URL for IVLE log in.
    var apiKey = "BjCvF8PqrwKfRZkH6cjLf";
    $scope.ivleLogInUrl = "https://ivle.nus.edu.sg/api/login/?apikey=" + apiKey + "&url=" + $location.absUrl() + "#/loggedin"

})




