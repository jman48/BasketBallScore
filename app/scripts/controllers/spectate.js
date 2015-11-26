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

    // repeat updateScores
    setInterval(updateScores, waitTime);

    $scope.getWinner = function () {
      return Math.max.apply(null, $scope.players);
    };

  }]);
