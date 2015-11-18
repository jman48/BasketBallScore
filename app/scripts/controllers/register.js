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
      $scope.attemptRegister = function(userName){
        var promise = user.attemptRegister(userName);
        promise.then(function(username) {
          $location.path('/login');
        },
          function(errorMsg){
            $scope.errorMessage = errorMsg;
        });
      };
  }]);
