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

    $scope.spectatorMode = false;

    var spectatorWaitID,
      spectatorRefreshTime = 5000; // in ms

    $scope.username = function() {
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

    $scope.logOut = function() {
      user.logOut();
    };

    $scope.resetShootout = function() {
      game.resetShootout();
    };

    $scope.activeShootout = function() {
      return game.activeShootout();
    };

    $scope.toggleSpectatorMode = function () {
      $scope.spectatorMode = !$scope.spectatorMode;
      if ($scope.spectatorMode) {
        $location.path('/scores');
        waitForGame();
        spectatorWaitID = setInterval(waitForGame, spectatorRefreshTime);
      } else {
        $location.path('/login');
      }
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
    }
  }]);
