'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:SpectateCtrl
 * @description
 * # SpectateCtrl
 * Shootout view, modified for spectators
 */
angular.module('bballApp')
  .controller('SpectateCtrl',['$scope', function ($scope) {

    $scope.players = [];

    $scope.updateScores = function () {
      // todo when scores are available from server
    };

    $scope.getWinner = function () {
      return null;
    };

  }]);
