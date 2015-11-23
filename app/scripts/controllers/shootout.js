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

    user.clearCurrentPlayers();

    $scope.players = user.getCurrentPlayers();
    $scope.rounds = 5;

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
      if ($scope.rounds > 0) {
        $scope.rounds--;
      }
    };

    $scope.plusRounds = function() {
      $scope.rounds++;
    };

    $scope.startShootout = function () {
      $location.path('/shootout');
    };

    $scope.playerGoal = function() {

    };

    $scope.playerMiss = function() {

    };

  }]);
