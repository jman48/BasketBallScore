'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:SetupShootoutCtrl
 * @description
 * # SetupShootoutCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('SetupShootoutCtrl', ['$scope', 'game', '$location', '$http',
    function ($scope, game, $location, $http) {

    $scope.players = game.getCurrentPlayers();
    $scope.setupRounds = 5;

    $scope.attemptAddPlayer = function (username) {

      $scope.errorMessage = undefined;

      game.addPlayer(username)
        .then(function (currentPlayers) {
          $scope.players = currentPlayers;
        }, function (errorMsg) {
          $scope.errorMessage = errorMsg;
        }
      );
    };

    $scope.removePlayer = function(player) {
      game.removePlayerFromShootout(player);
    };

    $scope.decrementRounds = function() {
      if ($scope.setupRounds > 1) {
        $scope.setupRounds--;
      }
    };

    $scope.incrementRounds = function() {
      $scope.setupRounds++;
    };

    $scope.startShootout = function () {
      if (game.getCurrentPlayers().length > 1) {
        game.startGame($scope.setupRounds);
        $location.path('/shootout');
      } else {
        $scope.errorMessage = "must have at least two players, please make some friends :(";
      }
    };

    $scope.playerGoal = function() {
      game.incrementGoals();
      game.nextPlayerTurn();
    };

    $scope.playerMiss = function() {
      game.nextPlayerTurn();
    };

    $scope.getRounds = function() {
      return game.getRounds();
    };

    $scope.getPlayerTurn = function() {
      var player = game.getPlayerTurn();
      if (player === undefined) {
        return "";
      } else {
        return game.getPlayerTurn().username;
      }
    };

    $scope.getWinner = function() {
      return game.getWinner();
    };
  }]);
