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

    $scope.minusRounds = function() {
      if ($scope.setupRounds > 0) {
        $scope.setupRounds--;
      }
    };

    $scope.plusRounds = function() {
      $scope.setupRounds++;
    };

    $scope.startShootout = function () {
      user.setRounds($scope.setupRounds);
      $location.path('/shootout');
    };

    $scope.playerGoal = function() {
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
  }]);
