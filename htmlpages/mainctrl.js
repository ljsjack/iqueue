var app = angular.module("iqueue",['ui.router', 'ngStorage']);

app.config(function($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'views/firstpage.html',
            data: {
                needLogin : false
            }

        })

        .state('aboutus', {
            url: '/aboutus',
            templateUrl: 'views/aboutus.html',
            data: {
                needLogin : false
            }
        })

        .state('aboutUsLogged', {
            url: '/aboutuslogged',
            templateUrl: 'views/aboutuslogged.html',
            data: {
                needLogin : true
            }
        })

        .state('deck', {
            url: '/deck',
            templateUrl: 'views/deck.html',
            data: {
                needLogin : true
            }
        })

        .state('terrace', {
            url: '/terrace',
            templateUrl: 'views/terrace.html',
            data: {
                needLogin : true
            }
        })

        .state('frontier', {
            url: '/frontier',
            templateUrl: 'views/frontier.html',
            data: {
                needLogin : true
            }
        })

        .state('technoedge', {
            url: '/technoedge',
            templateUrl: 'views/technoedge.html',
            data: {
                needLogin : true
            }
        })

        .state('koufu', {
            url: '/koufu',
            templateUrl: 'views/koufu.html',
            data: {
                needLogin : true
            }
        })

        .state('foodclique', {
            url: '/foodclique',
            templateUrl: 'views/foodclique.html',
            data: {
                needLogin : true
            }
        })

        .state('loggedin', {
            url: '/loggedin',
            templateUrl : 'views/loggedin.html',
            data: {
                needLogin : true
            }
        })

        .state('account', {
            url: '/account',
            templateUrl : 'views/account.html',
            data: {
                needLogin : true
            }
        });


});


app.run(function($rootScope, $localStorage, $state){
    $rootScope.$on('$stateChangeStart', function(e,to){

        var user = $localStorage.user;

        if (!to.data.needLogin && user.authenticated){
            e.preventDefault();
            $state.go("loggedin");
        }
        else if (to.data.needLogin && !user.authenticated){
            e.preventDefault();
            $state.go("home");
        }



    })

});










app.factory('ivleInfo', function($http, $q){

    var baseUrl = "https://ivle.nus.edu.sg/api/Lapi.svc";
    var apiKey = "BjCvF8PqrwKfRZkH6cjLf";
    var functions = {};

    functions.getUsername = function(token) {
        var defer = $q.defer();
        var uNameUrl = baseUrl + "/UserName_Get?APIKey=" + apiKey + "&token=" + token;
        var uNameUrlJsonP = "https://crossorigin.me/" + uNameUrl;


        $http.get(uNameUrlJsonP).success(function(data){
            defer.resolve(data);
        });
        return defer.promise;

    };

    return functions;

});



/* Overall controller for the app
 */

app.controller('overallCtrl', function($rootScope, $location, $http, $scope, $localStorage, ivleInfo, $state){

    if ($localStorage.user.authenticated != null){
        $rootScope.user = $localStorage.user;
    }

    $rootScope.apiKey = "BjCvF8PqrwKfRZkH6cjLf";
    $rootScope.baseUrl = "https://ivle.nus.edu.sg/api/Lapi.svc";


    var currUrl = $location.absUrl();
    var indexToken = currUrl.search("token");

    // There is a token string in the URL. Will extract and do a verification with the server.
    if (indexToken > 0) {
        var endIndex = currUrl.search("/loggedin");

        var token = currUrl.substr(indexToken + 6);


        $localStorage.user.authenticated = true;
        $localStorage.user.userToken = token;
        ivleInfo.getUsername(token).then(function(data){
            $localStorage.user.userName = data;
            $rootScope.user = $localStorage.user;
        });



        // Redirecting the user to the loggedin page.
        if ($localStorage.user.authenticated) {
            $location.path('/loggedin');
            history.replaceState(null, null, $localStorage.appUrl + "loggedin");
        }

    }

    $scope.logOut = function(){
        $localStorage.user.authenticated = false;
        $localStorage.user.userToken = null;
        $localStorage.user.userName = null;
        $state.go('home');

    }


});



app.controller('loggedInCtrl', function($location, $scope, $rootScope, $localStorage, ivleInfo){


});


/* This is the controller for the unloggedin default page.
 */

app.controller('firstPageCtrl', function($location, $scope, $rootScope, $localStorage){

    $localStorage.appUrl = $location.absUrl();

    // This is the URL for IVLE log in.
    $scope.ivleLogInUrl = "https://ivle.nus.edu.sg/api/login/?apikey=" + $rootScope.apiKey + "&url=" + $localStorage.appUrl;



});


/*
 Service to store the information of a user. Currently under construction.

 app.factory('CurrentUser', function(ivleInfo) {

 function CurrentUser() {

 }

 CurrentUser.prototype = {


 logIn: function (token) {
 this.authenticated = true;
 this.userToken = token;


 },

 logOut: function () {
 this.authenticated = false;
 this.userToken = null;
 this.userName = null;
 },

 getAuth: function() {
 return this.authenticated;
 },

 getUsername: function() {
 return this.userName;
 },

 getUsertoken: function(){
 return this.userToken;
 },

 setUserName: function(name){
 this.userName = name;
 }

 };

 return CurrentUser;
 });

 */