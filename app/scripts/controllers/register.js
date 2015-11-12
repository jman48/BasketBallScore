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
        $scope.nameOK = user.attemptRegister(userName);
        if ($scope.nameOK){
          $scope.nameRegistered = true;
          $location.path('/login')
        }
      }
  }]);
