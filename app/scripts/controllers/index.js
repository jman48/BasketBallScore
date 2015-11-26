'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('IndexCtrl', ['$scope', 'user', 'game', '$location', 'spectate',
    function ($scope, user, game, $location, spectate) {

    var spectatorWaitID,
      spectatorRefreshTime = 5000; // in ms

    $scope.username = function () {
      if (user.isLoggedOn()){
        return user.currentUser().username;
      } else {
        // shouldn't happen
        return "Guest?";
      }
    };

    $scope.loggedOn = function () {
      return user.isLoggedOn();
    };

    $scope.logOut = function () {
      user.logOut();
      $scope.collapse();
      $location.path('/logout');
    };

    $scope.resetShootout = function () {
      game.resetShootout();
      $location.path('/setup_shootout');
    };

    $scope.activeShootout = function () {
      return game.activeShootout();
    };

    $scope.toggleSpectatorMode = function () {
      $scope.spectatorMode = !$scope.spectatorMode;
      if ($scope.spectatorMode) {
        $scope.startWaitingForGame();
        spectate.spectatorMode(true);
      } else {
        spectate.spectatorMode(false);
        $location.path('/login');
      }
    };

    $scope.startWaitingForGame = function () {
      $location.path('/scores');
      waitForGame();
      spectatorWaitID = setInterval(waitForGame, spectatorRefreshTime);
    };

    var waitForGame = function () {
      // check for game
      spectate.isActiveGame().then(function (game) {
        // stop checking for games
        clearInterval(spectatorWaitID);
        // watch the game
        $location.path('/spectate');
      }, function (failRes) {
        // keep waiting
      });
    };

    $scope.currentShootout = function () {
      $scope.collapse();
      $location.path('/shootout');
    };

    $scope.highScores = function () {
      if (screen.width <= 549) {
        $location.path('/mobilescores');
        $(".navbar-collapse").collapse('hide');
      } else {
        $location.path('/scores');
      }
    };

    $scope.logIn = function () {
      $location.path('/login');
      $scope.collapse();
    };

    $scope.register = function () {
      $location.path('/register');
      $scope.collapse();
    };

    $scope.delete = function () {
      $location.path('/deleteuser');
      $scope.collapse();
    };

    $scope.collapse = function () {
      $(".navbar-collapse").collapse('hide');
    };

  }]);
