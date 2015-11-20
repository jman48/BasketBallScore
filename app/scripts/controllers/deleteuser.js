'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:DeleteuserCtrl
 * @description
 * # DeleteuserCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('DeleteuserCtrl', ['$scope', 'user', '$location', function ($scope, user, $location) {

    $scope.confirmDelete = function(username) {
      var promise = user.attemptDelete(username);

      promise.then(function (success) {
        $location.path('/landing');
        user.currentUser = {};
      }, function (errorMsg) {
        $scope.errorMessage = errorMsg;
      });
    };

    $scope.cancelDelete = function() {
      $location.path('/landing');
    };

    $scope.username = function() {
      return user.currentUser.name;
    };
  }]);
