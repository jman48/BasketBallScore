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

    var updateWait = 1000; // in millis

    var update = function () {
      if ($scope.gameActive && spectate.getSpectateMode()) {
        updateScores();
        updateGameInfo();
      } else {
        stopUpdating();
        $location.path("/scores");
      }
    };

    update();
    // keep checking for changes in scores and game state
    var intervalId = setInterval(update, updateWait);

     function updateScores() {
      spectate.updateScores().then(function (players){
        console.log("updating scores");
        $scope.players = players;
      }, function (failRes) {
        console.log("GET players failed", failRes.statusText);
      });
    }

    function updateGameInfo() {
      spectate.updateGameInfo().then(function (game) {
        $scope.rounds = game.hoopsToWin;
        $scope.gameActive = game.is_active;

        if (!$scope.gameActive){
          var gameOverWait = 1000; // 10 seconds
          stopUpdating();
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
    }

    function stopUpdating() {
      clearInterval(intervalId);
    }

    $scope.getWinner = function () {
      return $scope.players.sort(function (a, b) {
        return -(a.score - b.score);
      })[0];
    };


  }]);
