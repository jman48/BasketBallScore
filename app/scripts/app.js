'use strict';

/**
 * @ngdoc overview
 * @name bballApp
 * @description
 * # bballApp
 *
 * Main module of the application.
 */
angular
  .module('bballApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        redirectTo: "/login"
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/deleteuser', {
        templateUrl: 'views/deleteuser.html',
        controller: 'DeleteUserCtrl'
      })
      .when('/landing', {
        templateUrl: 'views/landing.html',
        controller: 'SinglePlayerCtrl'
      })
      .when('/scores', {
        templateUrl: 'views/scoretable.html',
        controller: 'ScoreTableCtrl'
      })
      .when('/logout', {
        redirectTo: '/login'
      })
      .when('/setup_shootout', {
        templateUrl: 'views/setup_shootout.html',
        controller: 'SetupShootoutCtrl'
      })
      .when('/shootout', {
        templateUrl: 'views/shootout.html',
        controller: 'SetupShootoutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // makes post requests to the rails server work properly
    // without it, rails server responds with 406 - Not Acceptable
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

  }])

  .run( ['$rootScope', '$location', 'user', function ($rootScope, $location, user) {
    // need to be logged in to view these
    var blackList = [
      "/landing",
      "/setup_shootout"
    ];
    // register listener to watch route changes
    $rootScope.$on("$locationChangeStart", function (event, next, current) {
      if (!user.isLoggedOn()){

        // util method
        String.prototype.endsWith = function(suffix) {
          return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };

        // if going to a blacklist page
        if (blackList.some(function (route) {
            return next.endsWith(route);
          })){
          // redirect
          $location.path("/login");
        }
      }
    });
  }]);
