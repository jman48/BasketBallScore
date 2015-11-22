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
  }]);
