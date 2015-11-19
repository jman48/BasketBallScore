'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:DeleteuserCtrl
 * @description
 * # DeleteuserCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('DeleteuserCtrl', ['$scope', 'user', '$location', '$rootScope', function ($scope, user, $location, $rootScope) {

    $scope.confirmDelete = function(username) {
      var promise = user.attemptDelete(username);

      promise.then(function (success) {
        $location.path('/landing');
        $rootScope.userName = null;
      }, function (errorMsg) {
        $scope.errorMessage = errorMsg;
      });
    };

    $scope.cancelDelete = function() {
      $location.path('/landing');
    };
  }]);
