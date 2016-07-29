var app = angular.module("iqueue",['ui.router', 'ngStorage']);

app.config(function($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('default', {
            url: '/',
            templateUrl: 'views/firstpage.html',
            data: {
                needStore: false,
                needLogin : false
            }

        })

        .state('aboutus', {
            url: '/aboutus',
            templateUrl: 'views/aboutus.html',
            data: {
                needStore: false,
                needLogin : false
            }
        })

        .state('aboutUsLogged', {
            url: '/home/aboutus',
            templateUrl: 'views/aboutuslogged.html',
            data: {
                needStore: false,
                needLogin : true
            }
        })

        .state('deck', {
            url: '/home/deck',
            templateUrl: 'views/deck.html',
            data: {
                needStore: false,
                needLogin : true
            }
        })

        .state('terrace', {
            url: '/home/terrace',
            templateUrl: 'views/terrace.html',
            data: {
                needStore: false,
                needLogin : true
            }
        })

        .state('frontier', {
            url: '/home/frontier',
            templateUrl: 'views/frontier.html',
            data: {
                needStore: false,
                needLogin : true
            }
        })

        .state('technoedge', {
            url: '/home/technoedge',
            templateUrl: 'views/technoedge.html',
            data: {
                needStore: false,
                needLogin : true
            }
        })

        .state('koufu', {
            url: '/home/koufu',
            templateUrl: 'views/koufu.html',
            data: {
                needStore: false,
                needLogin : true
            }
        })

        .state('foodclique', {
            url: '/home/foodclique',
            templateUrl: 'views/foodclique.html',
            data: {
                needStore: false,
                needLogin : true
            }
        })

        .state('home', {
            url: '/home',
            templateUrl : 'views/loggedin.html',
            data: {
                needLogin : true,
                needStore: false
            }
        })

        .state('account', {
            url: '/home/account',
            templateUrl : 'views/account.html',
            data: {
                needLogin : true,
                needStore : false
            }
        })

        .state('store', {
            url: '/home/store',
            templateUrl : 'views/store.html',
            data: {
                needLogin : true,
                needStore: true
            }

        })


});


app.run(function($rootScope, $localStorage, $state){
    $rootScope.$on('$stateChangeStart', function(e,to){

        var user = $localStorage.user;

        // If need store and user is not a storeowner.
        if (to.data.needStore && !user.isStoreOwner){
            e.preventDefault();
            $state.go("home");
        }

        else if (!to.data.needLogin && user.authenticated){
            e.preventDefault();
            $state.go("home");
        }
        else if (to.data.needLogin && user == null){
            e.preventDefault();
            $state.go("default");
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

    if ($localStorage.user != null){
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

        $localStorage.user = {};

        $localStorage.user.authenticated = true;
        $localStorage.user.userToken = token;
        ivleInfo.getUsername(token).then(function(data){
            if (data === "LOW JIAN SHENG"){
                $localStorage.user.isStoreOwner = true;
            }
            else {
                $localStorage.user.isStoreOwner = false;
            }
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
        $localStorage.user = null;
        $state.go('default');

    };




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

app.controller('accountCtrl', function(){

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