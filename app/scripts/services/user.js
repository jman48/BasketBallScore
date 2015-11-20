'use strict';

/**
 * @ngdoc service
 * @name bballApp.user
 * @description
 * # user
 * Service in the bballApp.
 */
angular.module('bballApp')
  .service('user', ['$q', '$http', function ($q, $http) {

    var serverAddr = config.backend;

    // todo: replace with http requests
    var users = {
      'reserved': {
        username: 'reserved',
        totalShots: 101,
        highestStreak: 5,
        shootOutsWon: 2
      },
      'reserved1': {
        username: 'reserved1',
        totalShots: 50,
        highestStreak: 6,
        shootOutsWon: 4
      },
      'reserved2': {
        username: 'reserved2',
        totalShots: 75,
        highestStreak: 1,
        shootOutsWon: 6
      }
    };

    var currentUser = {};

    // helper function, returns user from users array
    var getUser = function (users, username) {
      return users[users.map(function (user) {
        return user.username;
      }).indexOf(username)];
    };

    this.register = function (username) {
      var url = serverAddr + "users";
      var promise = $http.get(url);
      var defer = $q.defer();
      promise.then(function (getSuccessRes){
        // if user already exists
        if (getUser(getSuccessRes.data, username)){
          defer.reject("Username is already taken");
        } else { // username is available

          var newUser = {
            "username": username
            //totalHoops: 0,
            //highestStreak: 0,
            //shootoutsWon: 0
          };

          currentUser = newUser;

          var postRes = $http.post(
            serverAddr + 'users',
            JSON.stringify(newUser)
          );
          postRes.then(function(postSuccessRes){
            defer.resolve(username);
          }, function(postFailRes){
            defer.reject("Post failed: " + postFailRes.statusText);
          });
        }
      }, function (getFailRes) {
        defer.reject("Get failed: " + getFailRes.statusText);
      });

      return defer.promise;
    };

    this.attemptLogin = function (username) {
      var defer = $q.defer();
      if (!username) {
        defer.reject("Username is not valid");
      } else if (users.hasOwnProperty(username.toLowerCase())) {
        currentUser = users[username.toLowerCase()];
        defer.resolve(username);

      } else defer.reject("Username is not registered");

      return defer.promise;
    }

    this.attemptDelete = function(username) {
      var defer = $q.defer();

      if (!username) {
        defer.reject("No username supplied.");
      } else if (!users.hasOwnProperty(username.toLowerCase())) {
        defer.reject("Cannot find username in database?");
      } else {
        delete users[username];
        currentUser = {};
        defer.resolve(username);
      }

      return defer.promise;
    }

    this.getUsers = function() {
      var result = [];
      angular.forEach(users, function(value, key) {
        result.push(value);
      })
      return result;
    };

    this.getCurrentUser = function() {
      return currentUser;
    };

    this.logOut = function() {
      currentUser = {};
    };
  }]);

