/**
* FileName:app.js
* CreatedBy: Suyash
* purpose : perform routing according to state
*/
// connecting myApp to the module and inject the services
var app = angular.module('myApp', ['ui.router', 'firebase', 'angular-carousel-3d','ngImageCache']);
// use config to configure different states and pass services in config function
app.config(function($stateProvider, $urlRouterProvider,ImageCacheProvider,$sceDelegateProvider) {

    ImageCacheProvider.setStorage(window.localStorage);

    $sceDelegateProvider.resourceUrlWhitelist([
       // Allow same origin resource loads.
       'self',
       // Allow loading from our assets domain.  Notice the difference between * and **.
       'https://firebasestorage.googleapis.com/v0/b/ipl-project-5dbbb.appspot.com/**'
     ]);

    // initially app goes to the home page
    $urlRouterProvider.otherwise('/home');
    // $stateProvider give different states
    $stateProvider
    // configure the home state
        .state('home', {
            url: '/home',
            templateUrl: 'template/home.html',
            controller: 'homeCtrl'
        })
        // config the player state
        .state('player', {
            url: '/player?teamname',
            templateUrl: 'template/player.html',
            controller: 'playerCtrl'
        })
});
app.factory('myCache', function($cacheFactory) {
 return $cacheFactory('teamInfo');
});
