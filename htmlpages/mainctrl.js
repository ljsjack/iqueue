var app = angular.module("iqueue",['ui.router', 'ngStorage', 'ngResource']);

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

        .state('order', {
            url: '/home/orders',
            templateUrl: 'views/orders.html',
            data: {
                needLogin : true,
                needStore : false
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


app.factory('Server', function($resource){
    return $resource('/api/:id', null, {
        'update': {method: 'PUT'}
    });
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

        if (confirm("Any unsaved carts will be deleted! Are you sure you want to log out?")){
            shoppingCart.clearCart();
            $localStorage.user = null;
            $state.go('default');
        }
        else {

        }

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

app.controller('accountCtrl', function($localStorage, $scope, Server, $state){

    var userName = $localStorage.user.userName;
    var yourOrder = shoppingCart.listCart();
    var totalCost = shoppingCart.totalCart();


    var orderUp = {userName:"", orders:yourOrder, total : totalCost, readyPickup: false};

    orderUp.userName = userName;




    /*
     Checkout function sends the order data into the database.
     The localStorage of order data is also destroyed.
     */
    $scope.checkOut = function(){

        if(shoppingCart.countCart() === 0){
            alert("Your cart is empty!")
        }
        else {
            if (confirm("Are you sure you want to check out your order? This is irreversible.")) {
                console.log(orderUp);
                $scope.newOrder = new Server(orderUp);
                $scope.newOrder.$save();

                // Destroying the local data
                shoppingCart.clearCart();
                alert("Order Sent! Redirecting to home.");
                $state.go('order');

            }
            else {

            }
        }
    }

});


app.controller('storeCtrl', function($localStorage, Server, $scope){

    $scope.allOrders = Server.query({"readyPickup" : false});

    /*
     Gets the data from the database.
     */
    $scope.getData = function() {
        $scope.allOrders = Server.query({"readyPickup" : false});
    };

    /*
     * This function clears the individual food order from the local $scope.
     * It clears the whole order by the user when there are no more food orders. It will also
     clear the order from the data base.
     */
    $scope.clearOrder = function(orderIndex){

        $scope.allOrders[orderIndex].readyPickup = true;

        // Update the value of readyPickup in the database.
        Server.update({id: $scope.allOrders[orderIndex]._id}, $scope.allOrders[orderIndex]);

        $scope.allOrders.splice(orderIndex, 1);

        /*
        if ($scope.allOrders[orderIndex].orders.length == 0){
            $scope.id = $scope.allOrders[orderIndex]._id;
            Server.remove({id: $scope.id}, function(){
                $scope.allOrders.splice(orderIndex,1);
                $scope.allOrders = Server.query();
            });
        }
        */
    };


});

app.controller('ordersCtrl', function($localStorage, Server, $scope) {


    $scope.testData = Server.query({"userName": $localStorage.user.userName}, function(){
        console.log($scope.testData[0]);


        if ($scope.testData.length === 0) {
            $scope.testData.noOrder = "You currently do not have any orders.";
            console.log($scope.testData.noOrder);
        }
        else {
            $scope.testData.noOrder = undefined;
        }

        console.log($scope.testData);
    });

    $scope.deleteData = function(index) {
        var id = $scope.testData[index]._id;
        Server.remove({id: id}, function(){
            $scope.testData.splice(index, 1);
        });

    }





});


app.controller('terraceCtrl', function($scope){

    $scope.foodlist = ['Chicken Rice','Duck Rice'];


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