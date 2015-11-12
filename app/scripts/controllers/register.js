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

      $scope.attemptLogin = function(userName){
        $scope.nameOK = user.attemptLogin(userName);
        if ($scope.nameOK){
          $scope.nameRegistered = true;
          $location.path('/login')
        }
      }
  }]);
