/**
 * Created by MrSingh on 1/17/16.
 */
'use strict';

var ejApp = angular.module('eventjoin',[
    'ngRoute',
    'ngResource',
    'ngCookies',
    'LocalStorageModule',
    'customFilters',
    'eventjoin.factories',
    'toastr',
    'ui.bootstrap',
    'config',
    'ngValidate',
    'ngMask',
    'ngTextTruncate'
]);

ejApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('ejHttpInterceptor');
}]);

ejApp.run(['$rootScope', '$location', '$window','ejAuth','$http','ENV','OpenGraphTags',
    function($rootScope, $location, $window, ejAuth,$http, ENV, OpenGraphTags) {

        //$http.defaults.headers.common['x-access-token'] = ejAuth.getToken();

        $rootScope.$on('$routeChangeSuccess',
            function(event) {
                $window.scrollTo(0, 0);

                if (!$window.ga) {
                    return;
                }
                $window.ga('send', 'pageview', {
                    page: $location.path()
                });
            });

        $rootScope.$on('$routeChangeStart', function(event){
            angular.element('#navbar').removeClass('in');
        });

        // closing navbar collapse when content is loaded
        $rootScope.$on('$viewContentLoaded', function () {
            $(".nav a").click(function () {
                if ($(".navbar-collapse").hasClass("in")) {
                    $('[data-toggle="collapse"]').click();
                }
            });

            //call it here
            var defaultPageTitle = 'eventjoin - Groceries Just Became Awesome!';
            var defaultPageDescription = "Life is Busy! How Awesome It Would be if Groceries Were Easy ";
            var defaultImage = $location.protocol() +'://'+location.host+'/images/eventjoin-feature-image.jpg';
            var host = $location.protocol() +'://'+location.host;


            OpenGraphTags.setOgUrl($location.absUrl());

            if(OpenGraphTags.ogTitle() === ''){
                $rootScope.pageSeoTitle =  defaultPageTitle;
            }else{
                $rootScope.pageSeoTitle = OpenGraphTags.ogTitle();
            }

            if(OpenGraphTags.seoDescription() === ''){
                $rootScope.pageSeoDescription =  defaultPageDescription;
            }else{
                $rootScope.pageSeoDescription = OpenGraphTags.seoDescription();
            }

            if(OpenGraphTags.ogImage() === ''){
                $rootScope.pageSeoImage =  defaultImage;
            }else{
                $rootScope.pageSeoImage = host + OpenGraphTags.ogImage();
            }
        });

        var screenWidth = {
            lg  : false,
            md  : false,
            sm  : false,
            xs  : false
        };

        angular.element($window).bind('resize', function(){
            var winWidth = $window.innerWidth;
            __processWinWidth(winWidth);
        }).trigger('resize');

        function __processWinWidth(winWidth){
            if(winWidth > 1200){
                __setWidthProperties('lg');
            } else if(winWidth > 992){
                __setWidthProperties('md');
            }else if(winWidth > 768){
                __setWidthProperties('sm');
            }else if(winWidth < 768){
                __setWidthProperties('xs');
            }
        }

        function __setWidthProperties(property){
            angular.forEach(screenWidth, function(val, prop){
                prop == property ? screenWidth[prop] = true : screenWidth[prop] = false;
            });
            $rootScope.screenWidth = screenWidth;
            $rootScope.$broadcast('screenWidth', $rootScope.screenWidth);
        }

        $rootScope.$on('screenWidth', function (event, data) {
            //do something with new value 'data'
            $rootScope.screenWidth = data;
            $rootScope.$digest();
        });

    }
]);

ejApp.config(function ($validatorProvider) {
    $validatorProvider.setDefaults({
        errorElement: 'span',
        errorClass: 'help-block text-red border-red'
    });

    $validatorProvider.addMethod("phoneUS", function (a, b) {
        console.log(a, b);
        return a = a.replace(/\s+/g, ""), this.optional(b) || a.length > 9 && a.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/);
    }, "Please enter a valid US.");
});

ejApp.config(function(toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: false,
        containerId: 'toast-container',
        maxOpened: 3,
        newestOnTop: true,
        positionClass: 'toast-bottom-left',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body'
    });
});

ejApp.factory('ejHttpInterceptor',['localStorageService', '$rootScope', '$location','toastr',
    function(localStorageService, $rootScope, $location,toastr){

    var interceptor = {};

    interceptor.request = function (config) {
        var token = localStorageService.get('token');

        /*if(token){
            config.headers['x-access-token'] = token;
        }*/

        return config;
    };

    interceptor.responseError = function (response) {
        console.log(response);
        
        return response;
    };

    return interceptor;

}]);

