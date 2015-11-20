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
        redirectTo: "/landing"
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/landing', {
        templateUrl: 'views/landing.html',
        controller: 'SinglePlayerCtrl'
      })
      .when('/scores', {
        templateUrl: 'views/scoretable.html',
        controller: 'ScoretableCtrl'
      })
      .when('/logout', {
        redirectTo: '/login'
      })
      .otherwise({
        redirectTo: '/'
      });

    // makes post requests to the rails server work properly
    // without it, rails server responds with 406 - Not Acceptable
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

  }]);

