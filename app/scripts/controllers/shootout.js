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

    $scope.attemptAddPlayer = function (username) {

      $scope.errorMessage = undefined;

      var promise = user.addPlayer(username)
        .then(function (success) {
          $scope.players = user.getCurrentPlayers();
        }, function (errorMsg) {
          $scope.errorMessage = errorMsg;
        });
    };

    $scope.startShootout = function () {

    };

  }]);
