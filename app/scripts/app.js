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
      .when('/landing', {
        templateUrl: 'views/blank.html'
      })
      .when('/logout', {
        redirectTo: '/login'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

