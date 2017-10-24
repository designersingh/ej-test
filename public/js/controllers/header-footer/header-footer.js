
ejApp.controller('headerFooterCtrl',['$scope','$rootScope','$sce','$location','toastr','ejAuth', function($scope, $rootScope,$sce,$location,toastr, ejAuth){

    
    console.log($location.path());
    
    $scope.header = {
        config:{
            location : $location.path()
        }
    };

    $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
        $scope.header.config.location = $location.path();
    });

    $scope.topNav = function(){
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 100) {
                // > 100px from top - show div
                $('#header').css({
                    'background':'rgba(0,114,255,.95)',
                    'padding':'5px 15px',
                    'box-shadow': '0px 1px 4px 0px rgba(150,150,150,.4)'

                });
            }else if(scrollTop <100){
                $('#header').css({
                    'background':'transparent',
                    'padding':'20px 15px',
                    'box-shadow':'none'
                });
            }
        });
    }

    $scope.signout = function(){
        ejAuth.logoutUser();
    }


}]);