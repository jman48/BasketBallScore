'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('LoginCtrl', ['$scope', 'user', '$location', function ($scope, user, $location) {
    $scope.attemptLogin = function(username){
      if (!username){
        $scope.errorMessage('invalid name');
      } else {
        var promise = user.login(username);
        promise.then(function (success) {
          $location.path('/landing');
        }, function (errorMsg) {
          $scope.errorMessage = errorMsg;
        });
      }
    };

    $scope.register = function(){
      $location.path('/register');
    }
  }]);
