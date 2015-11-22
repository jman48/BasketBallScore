'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('RegisterCtrl', ['$scope', 'user', '$location', function ($scope, user, $location) {

    $scope.attemptRegister = function (username) {
      // if invalid username
      if (!username) {
        $scope.errorMessage = "Invalid username";
      } else {
        var promise = user.register(username);
        promise.then(function (success) {
          $location.path('/landing');
        }, function (errorMsg) {
          $scope.errorMessage = errorMsg;
        });
      }
    };
  }]);
