'use strict';

/**
 * @ngdoc service
 * @name bballApp.user
 * @description
 * # user
 * Service in the bballApp.
 */
angular.module('bballApp')
  .service('user', ['$q', '$rootScope', '$http', function ($q, $rootScope, $http) {

    // backend serverAddr
    var serverAddr = config.backend;

    var currentUser = {username: "test", totalHoops: 100, highestStreak: "3"};

    var users = [];

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
      if (!username) {
        defer.reject("Username is not valid");
      }
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
      if (!username){
        defer.reject("Username is not valid");
      }
      if (users[username]){
        currentUser = users[username];
        defer.resolve(username);
      } else {
        defer.reject("Username is not registered");
      }
      return defer.promise;
    };

    this.getUsers = function() {
      var url = serverAddr + 'users';
      return $q(function (resolve, reject) {
        $http.get(url).then(function (successRes) {
          var users = successRes.data;
          resolve(users);
        }, function (failRes) {
          reject(failRes.statusText);
        });
      });
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

