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
    var usernames = ['reserved'];

    var users = {
      'reserved': {
        totalShots: 100,
        highestStreak: 5,
        shootOutsWon: 30
      }
    };

    var currentUser = {};

    // AngularJS will instantiate a singleton by calling "new" on this function
    this.attemptRegister = function(username){
      var defer = $q.defer();
      if (!username)
        defer.reject("Username is not valid");
      if (usernames.indexOf(username) == -1){
        usernames.push(username);
        defer.resolve(username);
      }
      else defer.reject("Username is already taken");

      return defer.promise;
    };

    this.attemptLogin = function(username){
      var defer = $q.defer();
      if (!username)
        defer.reject("Username is not valid");
      if (usernames.indexOf(username) !== -1){
        currentUser = users[username];
        defer.resolve(username);
      }
      else defer.reject("Username is not registered");
      return defer.promise;
    };
  }]);

