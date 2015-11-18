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
  .config(function ($routeProvider) {
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
      .when('/deleteuser', {
        templateUrl: 'views/deleteuser.html',
        controller: 'DeleteuserCtrl'
      })
      .when('/landing', {
        templateUrl: 'views/blank.html'
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
  });

