/**
 * FileName:app.js
 * CreatedBy: Suyash
 * purpose : perform routing according to state
 */
/*create a module myApp and inject the services*/
var app = angular.module('myApp', ['ui.router', 'firebase', 'angular-carousel-3d', 'ngImageCache']);

/*use config to configure different states and pass services in config function*/
app.config(function($stateProvider, $urlRouterProvider, ImageCacheProvider, $sceDelegateProvider) {

    /*  ImageCacheProvider is used to set images in the local storage*/
    ImageCacheProvider.setStorage(window.localStorage);

    /*it unblock the strict mode and set my firebase to whitelist*/
    $sceDelegateProvider.resourceUrlWhitelist([
        /*Allow same origin resource loads*/
        'self',
        /* Allow loading from our assets domain.  Notice the difference between * and **/
        'https://firebasestorage.googleapis.com/v0/b/ipl-project-5dbbb.appspot.com/**'
    ]);

    /* initially app goes to the home page*/
    $urlRouterProvider.otherwise('/home');
    /* $stateProvider give different states*/
    $stateProvider
    /* configure the home state*/
        .state('home', {
            url: '/home',
            templateUrl: 'template/home.html',
            controller: 'homeCtrl'
        })
        /* configure the player state*/
        .state('player', {
            url: '/player?teamname',
            templateUrl: 'template/player.html',
            controller: 'playerCtrl'
        })
});
/*create a service myCache using factory method and
use $cacheFactory to load json in localStorage*/
app.factory('myCache', function($cacheFactory) {
    return $cacheFactory('teamInfo');
});
app.factory('myPlayerCache', function($cacheFactory) {
    return $cacheFactory('teamName');
});
