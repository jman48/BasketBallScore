'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:SpectateCtrl
 * @description
 * # SpectateCtrl
 * Shootout view, modified for spectators
 */
angular.module('bballApp')
  .controller('SpectateCtrl',['$scope', 'spectate', '$location', function ($scope, spectate, $location) {

    $scope.players = [];
    $scope.rounds = 0;
    $scope.gameActive = true;

    var updateWait = 10000; // in millis
    var ctrl = this;

     this.updateScores = function () {
      spectate.updatePlayers().then(function (players){
        $scope.players = players;
      }, function (failRes) {
        console.log("GET players failed", failRes.statusText);
      });
    };

    this.updateGameInfo = function () {
      spectate.updateGameInfo().then(function (game) {
        $scope.rounds = game.hoopsToWin;
        $scope.gameActive = game.is_active;

        if (!$scope.gameActive){
          var gameOverWait = 1000; // 10 seconds
          ctrl.stopUpdating();
          setTimeout(function () {
            $location.path('/scores');
            $scope.startWaitingForGame();
            }, gameOverWait
          );
        }
      }, function (failRes) {
        console.log("GET games failed", failRes.statusText);
        // if game is not reachable, assume it has ended
        $scope.gameActive = false;
      });
    };

    this.stopUpdating = function() {
      clearInterval(intervalId);
    };

    $scope.getWinner = function () {
      return $scope.players.sort(function (a, b) {
        return -(a.score - b.score);
      })[0];
    };

    this.update = function () {
      if (spectate.getSpectateMode()) {
        ctrl.updateScores();
        ctrl.updateGameInfo();
      } else {
        ctrl.stopUpdating();
        $location.path("/scores");
      }
    };

    var intervalId = setInterval(this.update, updateWait);
    this.update();
    // keep checking for changes in scores and game state

  }]);
