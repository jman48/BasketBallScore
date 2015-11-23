'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:DeleteuserCtrl
 * @description
 * # DeleteuserCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('DeleteUserCtrl', ['$scope', 'user', '$location', function ($scope, user, $location) {

    $scope.confirmDelete = function(username) {
      var promise = user.delete(user.currentUser().id);
      promise.then(function (success) {
        $location.path('/login');
        user.logOut();
      }, function (errorMsg) {
        $scope.errorMessage = errorMsg;
      });
    };

    $scope.getUsername = function() {
      return user.getCurrentUser().username;
    };
  }]);
