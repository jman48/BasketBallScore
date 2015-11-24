'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('IndexCtrl', ['$scope', 'user', 'game', function ($scope, user, game) {
    $scope.username = function() {
      if (user.isLoggedOn()){
        return user.currentUser().username;
      } else {
        return "Guest?";
      }
    };

    $scope.loggedOn = function () {
      return user.isLoggedOn();
    };

    $scope.logOut = function() {
      user.logOut();
    };

    $scope.resetShootout = function() {
      game.resetShootout();
      game.setActiveShootout(false);
    };

    $scope.activeShootout = function() {
      return game.activeShootout();
    };
  }]);
