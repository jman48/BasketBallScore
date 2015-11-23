'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('IndexCtrl', ['$scope', 'user', function ($scope, user) {
    $scope.username = function() {
      return user.getCurrentUser().username;
    };

    $scope.logOut = function() {
      user.logOut();
    };

    $scope.resetShootout = function() {
      user.resetShootout();
      user.setActiveShootout(false);
    };

    $scope.activeShootout = function() {
      return user.activeShootout();
    };
  }]);
