/**
 * Created by MrSingh on 1/17/16.
 */

ejApp.controller('loginCtrl',[ '$scope','$rootScope','$location','$http','toastr','ejAuth','localStorageService', function($scope, $rootScope,$location,$http,toastr,ejAuth, localStorageService){

    if($rootScope.loggedIn){
        $location.path('/');
    }

    $rootScope.bgHome = true;

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        //..do something  //if you don't want event to bubble up
        $rootScope.bgHome = false;
    });


    $scope.signupUser = function (data) {
        ejAuth.signupUser(data)
            .then(function(success){
                if(success){
                    toastr.success('Account successfully created.');
                } else{
                    toastr.error('Bummer... there is an error registering');
                }
            });
    }

    $scope.loginUser = function (data) {
        ejAuth.authenticateUser(data)
            .then(function(success){
                if(success){
                    toastr.success('Log In Successful');
                } else{
                    toastr.error('Bummer... Incorrect username/password');
                }
            });
    }




}]);