'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:SetupShootoutCtrl
 * @description
 * # SetupShootoutCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('SetupShootoutCtrl', ['$scope', 'user', '$location', function ($scope, user, $location) {

    $scope.players = user.getCurrentPlayers();
    $scope.setupRounds = 5;

    $scope.attemptAddPlayer = function (username) {

      $scope.errorMessage = undefined;

      var promise = user.addPlayer(username)
        .then(function (success) {
          $scope.players = user.getCurrentPlayers();
        }, function (errorMsg) {
          $scope.errorMessage = errorMsg;
        });
    };

    $scope.removePlayer = function(player) {
      user.removePlayerFromShootout(player);
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
      if (user.getCurrentPlayers().length > 1) {
        user.setRounds($scope.setupRounds);
        user.setActiveShootout(true);
        $location.path('/shootout');
      } else {
        $scope.errorMessage = "must have at least two players, please make some friends :(";
      }
    };

    $scope.playerGoal = function() {
      user.incrementGoals();
      user.nextPlayerTurn();
    };

    $scope.playerMiss = function() {
      user.nextPlayerTurn();
    };

    $scope.getRounds = function() {
      return user.getRounds();
    };

    $scope.getPlayerTurn = function() {
      return $scope.players[user.getPlayerTurn()][0].username;
    };

    $scope.getWinner = function() {
      return user.getWinner();
    };
  }]);
