'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:SpectateCtrl
 * @description
 * # SpectateCtrl
 * Shootout view, modified for spectators
 */
angular.module('bballApp')
  .controller('SpectateCtrl',['$scope', 'spectate', function ($scope, spectate) {

    $scope.players = [];
    $scope.rounds = 0;
    $scope.gameActive = true;

    var waitTime = 1000;

    var updateScores = function () {
      spectate.updateScores().then(function (players){
        console.log("updating scores");
        $scope.players = players;
      }, function (failRes) {
        console.log("GET players failed", failRes.statusText);
      });
    };

    var updateGameInfo = function () {
      spectate.updateGameInfo().then(function (game) {
        $scope.rounds = game.hoopsToWin;
        $scope.gameActive = game.is_active;
      }, function (failRes) {
        console.log("GET games failed", failRes.statusText);
      });
    };

    updateGameInfo();
    updateScores();

    // keep checking for changes in scores and game state
    setInterval(updateScores, waitTime);
    setInterval(updateGameInfo, waitTime);

    $scope.getWinner = function () {
      return $scope.players.sort(function (a, b) {
        return -(a.score - b.score);
      })[0];
    };

  }]);
