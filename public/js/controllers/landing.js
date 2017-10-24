/**
 * Created by MrSingh on 1/17/16.
 */

ejApp.controller('landingCtrl', [
    '$scope', '$rootScope','$location','$http','globalFunctions','OpenGraphTags','ENV','$sce','$q','scrollToElement','$routeParams','$filter',
    function($scope, $rootScope, $location,$http,globalFunctions,OpenGraphTags,ENV,$sce,$q,scrollToElement,$routeParams,$filter){
    
    console.log('Inside landing controller');
    
    var location = $location.url();

    switch (location){

        case '/':
            OpenGraphTags.setOgTitle("Home - eventjoin");
            OpenGraphTags.setSeoKeyword("eventjoin");
            OpenGraphTags.setSeoDescription("eventjoin ");
            OpenGraphTags.setOgImage("/images/eventjoin-feature-image.jpg");
            $rootScope.OpenGraphTags = OpenGraphTags;
            break;

        default:
            break;

    }

    
    $scope.landing = {
        config                      : {
        	pageFullyLoaded         : false,
            scrollTo                : function(section){
                scrollToElement(section);
            },
            navigateTo              : function(url){
                $location.url(url);
            }
        },
        data                        : {},
        init                        : function() {
            console.log('init Landing page');
            
            var apiUrl = "https://www.eventbriteapi.com/v3/events/search/?token=6YZPFN5YNKFGGW74C3EB&q=angular";
            $http.get(apiUrl)
            .then(function(response){
                console.log(response);
                $scope.landing.data = response.data.events;
            })
            .catch(function(response){
                console.log(response);
            });
            
        }
    };
    

    window.prerenderReady = true;
    
}]);