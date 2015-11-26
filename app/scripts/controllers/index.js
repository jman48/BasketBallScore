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
      $scope.collapse();
      $location.path('/logout');
    };

    $scope.resetShootout = function () {
      game.resetShootout();
      game.setActiveShootout(false);
      $scope.collapse();
      $location.path('/setup_shootout');
    };

    $scope.activeShootout = function () {
      return game.activeShootout();
    };

    $scope.highScores = function () {
      if (screen.width <= 549) {
        $location.path('/mobilescores');
        $(".navbar-collapse").collapse('hide');
      } else {
        $location.path('/scores');
      }
    };

    $scope.logIn = function () {
      $location.path('/login');
      $scope.collapse();
    };

    $scope.register = function () {
      $location.path('/register');
      $scope.collapse();
    };

    $scope.delete = function () {
      $location.path('/deleteuser');
      $scope.collapse();
    };

    $scope.collapse = function () {
      $(".navbar-collapse").collapse('hide');
    }
  }]);
