'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:ScoretableCtrl
 * @description
 * # ScoretableCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('ScoretableCtrl', ['$scope', 'user', function ($scope, user) {

    $scope.users = user.getUsers();
    $scope.sortBy = 'totalShots';
    $scope.highScore = 'totalShots';
    $scope.reverse = true;

    $scope.order = function (sortBy) {
      $scope.users = user.getUsers();
      $scope.reverse = ($scope.sortBy === sortBy) ? !$scope.reverse : true;
      $scope.sortBy = sortBy;

      // Don't change the high score if user asks to sort by name, otherwise
      // high score will show the highest score in the field sorted by
      $scope.highScore = (sortBy !== 'name') ? sortBy : $scope.highScore;
    };

    $scope.getGlyph = function (name) {
      if (name === $scope.sortBy) {
        if ($scope.reverse) {
          return "glyphicon glyphicon-triangle-bottom";
        } else {
          return "glyphicon glyphicon-triangle-top";
        }
      } else {
        return "";
      }
    };

    $scope.printHighScore = function () {
      var result = "Highest score in ";

      switch ($scope.highScore) {
        case 'totalShots':
          result += "'hoops' is ";
          break;
        case 'highestStreak':
          result += "'longest streak' is ";
          break;
        case 'shootOutsWon':
          result += "'shootouts won' is ";
          break;
        default:
          result += $scope.highScore;
      }

      // I feel like there must be a much easier way to find the highest scoring
      // player according to a particular field?

      var maxScore = -1;
      var highestPlayer = "";

      for (var i = 0; i < $scope.users.length; i++) {
        var user = $scope.users[i];
        var score = 0;

        switch ($scope.highScore) {
          case 'totalShots':
            score = user.totalShots;
            break;
          case 'highestStreak':
            score = user.highestStreak;
            break;
          case 'shootOutsWon':
            score = user.shootOutsWon;
            break;
        }

        if (maxScore < score) {
          maxScore = score;
          highestPlayer = user.name;
        }
      }

      return result += highestPlayer.toUpperCase();
    };

    $scope.matchActiveRow = function(thisUser) {
      if (thisUser.name === user.getCurrentUser().name) {
        return "info";
      } else {
        return "";
      }
    };
  }]);
