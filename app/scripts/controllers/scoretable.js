'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:ScoretableCtrl
 * @description
 * # ScoretableCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('ScoreTableCtrl', ['$scope', 'user', '$q', function ($scope, user, $q) {

    $scope.sortBy = 'shootoutsWon'; // default
    $scope.reverse = true;
    $scope.users = [];

    this.updateUsers = function () {
      return $q(function (resolve, reject) {
        user.getUsers().then(function (users) {
          $scope.users = users;
          resolve(users);
        }, function (failMessage) {
          $scope.errorMessage = failMessage;
          reject($scope.errorMessage);
        });
      });
    };

    this.updateUsers();

    $scope.order = function (sortBy) {
      $scope.reverse = ($scope.sortBy === sortBy) ? !$scope.reverse : true;
      $scope.sortBy = sortBy;
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

    $scope.getHighScoreText = function () {
      var result = "Highest score in ";

      switch ($scope.sortBy) {
        case 'totalHoops':
          result += "'total hoops' is ";
          break;
        case 'highestStreak':
          result += "'longest streak' is ";
          break;
        case 'shootoutsWon':
          result += "'shootouts won' is ";
          break;
        default:
          result += $scope.sortBy;
      }

      return result;

    };

    $scope.getHighScoreName = function () {
      var winner;
      if ($scope.users.length > 0){
        winner = $scope.users.sort(function (a, b) {
          return -(a[$scope.sortBy] - b[$scope.sortBy]);
        })[0];
      } else {
        winner = { username: "" };
      }

      return winner.username.toUpperCase();

    };

    $scope.matchActiveRow = function(thisUser) {
      if (user.isLoggedOn()){
        if (thisUser.username === user.currentUser().username) {
          return "info";
        } else {
          return "";
        }
      } else {
        return "";
      };
    };
  }]);
