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
        redirectTo: "/scores"
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
      .when('/mobilescores', {
        templateUrl: 'views/mobilescoretable.html',
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
      .when('/spectate', {
        templateUrl: 'views/spectate.html',
        controller: 'SpectateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // makes post requests to the rails server work properly
    // without it, rails server responds with 406 - Not Acceptable
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

  }])

  // prevents access to some pages if not logged in
  .run( ['$rootScope', '$location', 'user', 'game', 'spectate', function ($rootScope, $location, user, game, spectate) {
    // register listener to watch route changes
    $rootScope.$on("$locationChangeStart", function (event, next, current) {

      var redirect = function () {
        $location.path("/scores");
      };

      // util method
      String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };

      if (!user.isLoggedOn()){
        // need to be logged in to view these
        var blackList = [
          "/landing"
        ];
        // if going to a blacklist page
        if (blackList.some(function (route) {
            return next.endsWith(route);
          })
        ){
          redirect();
        }
      }

      // if on shootout page with shootouts in progress
      if (next.endsWith("/shootout") && !game.activeShootout()) {
        redirect();
      }

      // if on spectate page with nothing to spectate
      if (next.endsWith("/spectate")) {
        // if spectator mode off
        if (!spectate.getSpectateMode) {
          redirect();
        }
        // if no game to spectate
        spectate.isActiveGame().then(function (){/* ok */}, function () {
            redirect();
          });
      }

    });
  }])

  // for auto-focusing text inputs in login and register
  // from here: http://stackoverflow.com/a/20865048/1696114
  .directive('autoFocus', function($timeout) {
    return {
      restrict: 'AC',
      link: function(_scope, _element) {
        $timeout(function(){
          _element[0].focus();
        }, 0);
      }
    };
  });
