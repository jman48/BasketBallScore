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
      $scope.nameOK = true;

      $scope.attemptRegister = function(userName){
        var promise = user.attemptRegister(userName);
        promise.then(function(username) {
          $scope.nameRegistered = true;
          $location.path('/login');
        },
          function(errorMsg){
            $scope.nameOK = false;
            $scope.errorMessage = errorMsg;
        });
      };
  }]);
