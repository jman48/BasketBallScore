'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:ScoretableCtrl
 * @description
 * # ScoretableCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('ScoretableCtrl', ['$scope', 'user', function ($scope, user) {
    $scope.users = user.getUsers();
    $scope.sortBy = 'hoops';
    $scope.reverse = false;
    $scope.order = function(sortBy) {
      $scope.users = user.getUsers();
      $scope.reverse = ($scope.sortBy === sortBy) ? !$scope.reverse : true;
      $scope.sortBy = sortBy;
    };
  }]);
