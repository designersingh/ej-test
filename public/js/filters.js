/**
 * Created by MrSingh on 1/17/16.
 */
'use strict';

var cf = angular.module('customFilters', []);

cf.filter('trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

cf.filter('removeSpaces', function(){
    return function(text){
        text = text.replace(/\s/g, '');
        text = text.replace(/&/g, '');
        return text;
    }
});


cf.factory('OpenGraphTags', function ($location) {
    var ogTitle = '';
    var ogSubTitle = '';
    var ogImage = '';
    var ogDescription = '';
    var ogUrl = $location.absUrl();
    var seoDescription = '';
    var seoKeyword = '';
    var fbAppId    = '';
    var ogImageWidth = 300;
    var ogImageHeight = 300;

    return {
        ogTitle: function () {
            return ogTitle;
        },
        setOgTitle: function (newTitle) {
            ogTitle = newTitle;
        },
        ogSubTitle: function () {
            return ogSubTitle;
        },
        setOgSubTitle: function (newSubTitle) {
            ogSubTitle = newSubTitle;
        },
        ogImage: function () {
            return ogImage;
        },
        setOgImage: function (newImage) {
            ogImage = newImage;
        },
        ogDescription: function () {
            return ogDescription;
        },
        setOgDescription: function (newDescription) {
            ogDescription = newDescription;
        },
        seoDescription: function () {
            return seoDescription;
        },
        setSeoDescription: function (newSeoDescription) {
            seoDescription = newSeoDescription;
        },
        seoKeyword: function () {
            return seoKeyword;
        },
        setSeoKeyword: function (newSeoKeyword) {
            seoKeyword = newSeoKeyword;
        },
        ogUrl: function () {
            return ogUrl;
        },
        setOgUrl: function (newUrl) {
            ogUrl = newUrl;
        },
        fbAppId: function () {
            return fbAppId;
        },
        setFbAppId: function (fbAppId) {
            fbAppId = fbAppId;
        },
        ogImageWidth: function () {
            return ogImageWidth;
        },
        setOgImageWidth: function (imageWidth) {
            ogImageWidth = imageWidth;
        },
        ogImageHeight: function () {
            return ogImageHeight;
        },
        setOgImageHeight: function (imageHeight) {
            ogImageHeight = imageHeight;
        }
    };
});

