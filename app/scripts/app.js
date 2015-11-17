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
        redirectTo: '/register'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/login', {
        templateUrl: 'views/blank.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
