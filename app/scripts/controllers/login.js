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

    user.logOut();

    $scope.attemptLogin = function (username) {
      var promise = user.attemptLogin(username);

      promise.then(function (success) {
        $location.path('/landing');
      }, function (errorMsg) {
        $scope.errorMessage = errorMsg;
      });
    };

    $scope.register = function () {
      $location.path('/register');
    };
  }]);
