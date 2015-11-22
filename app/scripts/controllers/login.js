'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('LoginCtrl', ['$scope', 'user', '$location', '$rootScope', function ($scope, user, $location, $rootScope) {

    $scope.attemptLogin = function (username) {
      var promise = user.login(username)
        .then(function (success) {
          $location.path('/landing');
        }, function (errorMsg) {
          $scope.errorMessage = errorMsg;
        });
    };
  }]);
