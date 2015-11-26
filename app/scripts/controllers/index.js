'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('IndexCtrl', ['$scope', '$location', 'user', 'game', function ($scope, $location, user, game) {
    $scope.username = function () {
      if (user.isLoggedOn()){
        return user.currentUser().username;
      } else {
        return "Guest?";
      }
    };

    $scope.loggedOn = function () {
      return user.isLoggedOn();
    };

    $scope.logOut = function () {
      user.logOut();
    };

    $scope.resetShootout = function () {
      game.resetShootout();
      game.setActiveShootout(false);
      $location.path('/setup_shootout');
    };

    $scope.activeShootout = function () {
      return game.activeShootout();
    };

    $scope.highScores = function () {
      if (screen.width <= 549) {
        $location.path('/mobilescores');
      } else {
        $location.path('/scores');
      }
    };
  }]);
