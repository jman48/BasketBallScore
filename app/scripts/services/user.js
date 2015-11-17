'use strict';

/**
 * @ngdoc service
 * @name bballApp.user
 * @description
 * # user
 * Service in the bballApp.
 */
angular.module('bballApp')
  .service('user', ['$q', function ($q) {
    var users = {
      'reserved': {
        totalHoops: 100,
        highestStreak: 5,
        shootOutsWon: 30
      }
    };

    var currentUser = users["reserved"];

    // AngularJS will instantiate a singleton by calling "new" on this function
    this.attemptRegister = function(username){
      var defer = $q.defer();
      if (!username) {
        defer.reject("Username is not valid");
      }
      // if user does not exist
      if (!users[username]){
        users[username] = {
          totalHoops: 0,
          highestStreak: 0,
          shootOutsWon: 0
        };
        defer.resolve(username);
      }
      else defer.reject("Username is already taken");

      return defer.promise;
    };

    this.attemptLogin = function(username){
      var defer = $q.defer();
      if (!username){
        defer.reject("Username is not valid");
      }
      if (users[username]){
        currentUser = users[username];
        defer.resolve(username);
      }
      else defer.reject("Username is not registered");
      return defer.promise;
    };

    this.incrementHoops = function(){
      currentUser.totalHoops++;
    };

    this.decrementHoops = function(){
      currentUser.totalHoops--;
    };

    this.currentUser = function(){
      return currentUser;
    };

    this.updateHighestStreak = function(newHighest){
      currentUser.highestStreak = newHighest;
    };
  }]);

