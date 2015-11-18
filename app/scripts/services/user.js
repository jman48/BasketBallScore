'use strict';

/**
 * @ngdoc service
 * @name bballApp.user
 * @description
 * # user
 * Service in the bballApp.
 */
angular.module('bballApp')
  .service('user', ['$q', '$rootScope', function ($q, $rootScope) {

    var users = {
      'reserved': {
        name: 'reserved',
        totalShots: 101,
        highestStreak: 5,
        shootOutsWon: 2
      },
      'reserved1': {
        name: 'reserved1',
        totalShots: 50,
        highestStreak: 6,
        shootOutsWon: 4
      },
      'reserved2': {
        name: 'reserved2',
        totalShots: 75,
        highestStreak: 1,
        shootOutsWon: 6
      }
    };

    this.currentUser = {};

    // AngularJS will instantiate a singleton by calling "new" on this function
    this.attemptRegister = function(username){
      var defer = $q.defer();
      if (!username || username === undefined) {
        defer.reject("Username is not valid");
      } else if (!users.hasOwnProperty(username.toLowerCase())){
        users[username.toLowerCase()] = {name: username,
          totalShots: 0,
          highestStreak: 0,
          shootOutsWon: 0};
        this.currentUser = users[username.toLowerCase()];
        $rootScope.userName = username;
        defer.resolve(username);
      } else {
        defer.reject("Username is already taken");
      }

      return defer.promise;
    };

    this.attemptLogin = function(username){
      var defer = $q.defer();
      if (!username) {
        defer.reject("Username is not valid");
      } else if (users.hasOwnProperty(username.toLowerCase())){
        this.currentUser = users[username.toLowerCase()];
        $rootScope.userName = username;
        defer.resolve(username);
      } else {
        defer.reject("Username is not registered");
      }
      return defer.promise;
    };

    this.attemptDelete = function(username) {
      var defer = $q.defer();

      if (!username) {
        defer.reject("No username supplied.");
      } else if (!users.hasOwnProperty(username.toLowerCase())) {
        defer.reject("Cannot find username in database?");
      } else {
        delete users[username];
        this.currentUser = {};
        defer.resolve(username);
      }

      return defer.promise;
    };

    this.getUsers = function() {
      var result = [];
      angular.forEach(users, function(value, key) {
        result.push(value);
      })
      return result;
    };
  }]);

