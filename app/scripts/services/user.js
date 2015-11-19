'use strict';

/**
 * @ngdoc service
 * @name bballApp.user
 * @description
 * # user
 * Service in the bballApp.
 */
angular.module('bballApp')
  .service('user', ['$q','$http', function ($q, $http) {
    var usernames = ['reserved'];
    var tempConfig = { backend: 'http://bballnz.herokuapp.com' };
    var serverAddr = tempConfig.backend;

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

    this.login = function(username){
      var defer = $q.defer();
      var url = serverAddr + 'users';

      $http.post(url).then(function (successRes) {
        var users = successRes.data;
        var user = getUsers(users, username);
        if (user){ // user exists
          currentUser = user;
          defer.resolve(username);
        } else {
          defer.reject("User doesn't exist ya chump");
        }
      }, function (failRes) {
        defer.reject("Get request failed: " + failRes.statusText);
      });
      return defer.promise;
    };
  }]);

