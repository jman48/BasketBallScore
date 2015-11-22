'use strict';

/**
 * @ngdoc function
 * @name bballApp.controller:SinglePlayerCtrl
 * @description
 * # SinglePlayerCtrl
 * Controller of the bballApp
 */
angular.module('bballApp')
  .controller('SinglePlayerCtrl', ['$scope', 'user', function ($scope, user) {
    $scope.totalHoops = user.currentUser().total_hoops;
    $scope.highestStreak = user.currentUser().highest_streak;
    $scope.currentStreak = 0;

    $scope.incrementHoops = function(){
      $scope.totalHoops++;
      user.incrementHoops();
    };

    $scope.decrementHoops = function(){
      $scope.totalHoops--;
      user.decrementHoops();
      $scope.cancelStreak();
    };

    $scope.cancelStreak = function(){
      $scope.currentStreak = 0;
    };

    $scope.incrementStreak = function(){
      $scope.currentStreak++;
      if ($scope.currentStreak > user.currentUser().highest_streak){
        user.updateHighestStreak($scope.currentStreak);
        $scope.highestStreak = $scope.currentStreak;
      }
    };

  }]);
