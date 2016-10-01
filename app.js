/**
* FileName:app.js
* CreatedBy: Suyash
* purpose : perform routing according to state
*/
// connecting myApp to the module and inject the services
var app = angular.module('myApp', ['ui.router', 'firebase', 'angular-carousel-3d','ngImgCache']);
// use config to configure different states and pass services in config function
app.config(function($stateProvider, $urlRouterProvider) {
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
