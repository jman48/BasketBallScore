'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('IndexCtrl', ['$scope', 'user', 'game', '$location', function ($scope, user, game, $location) {

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
      game.setActiveShootout(false);
    };

    $scope.activeShootout = function() {
      return game.activeShootout();
    };

    $scope.toggleSpectatorMode = function () {
      $scope.spectatorMode = !$scope.spectatorMode;
      if ($scope.spectatorMode) {
        $location.path('/scores');
        spectatorWaitID = setInterval(waitForGame, spectatorRefreshTime);
      } else {
        $location.path('/login');
      }
    };

    var waitForGame = function () {
      // check for game
      if (game.activeShootout()){
        $location.path('/spectate-game');
        clearInterval(spectatorWaitID);
      }
    }
  }]);
