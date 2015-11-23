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

    // local server when built with dev
    // remove server when built with prod
    var serverAddr = config.backend;
    var url = serverAddr + 'users';

    var currentUser = {};

    var currentPlayers = [];

    // helper function, returns user from users array
    var getUser = function (users, username) {
      return users[users.map(function (user) {
        return user.username;
      }).indexOf(username)];
    };

    this.register = function (username) {
      var promise = $http.get(url);
      var defer = $q.defer();
      promise.then(function (getSuccessRes) {
        // if user already exists
        if (getUser(getSuccessRes.data, username)) {
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
          postRes.then(function (postSuccessRes) {
            defer.resolve(username);
          }, function (postFailRes) {
            defer.reject("Post failed: " + postFailRes.statusText);
          });
        }
      }, function (getFailRes) {
        defer.reject("Get failed: " + getFailRes.statusText);
      });

      return defer.promise;
    };

    this.login = function (username) {

      var defer = $q.defer();

      $http.get(url).then(function (successRes) {
        var users = successRes.data;
        var user = getUser(users, username);
        if (user) { // user exists
          currentUser = user;
          defer.resolve(username);
        } else {
          defer.reject("That username doesn't exist ya chump");
        }
      }, function (failRes) {
        defer.reject("Get request failed: " + failRes.statusText);
      });
      return defer.promise;
    };

    this.addPlayer = function (username) {

      var defer = $q.defer();
      var url = serverAddr + 'users';

      $http.get(url).then(function (successRes) {
        var users = successRes.data;
        var user = getUser(users, username);
        if (user) { // user exists

          var isPlaying = false;

          for (var i = 0; i < currentPlayers.length; i++) {
            if (currentPlayers[i].username.toLowerCase() === username.toLowerCase()) {
              isPlaying = true;
            }
          }

          if (!isPlaying) {
            console.log(currentPlayers.indexOf(user));
            currentPlayers.push(user);
            defer.resolve(username);
          } else {
            defer.reject("Player already entered");
          }

        } else {
          defer.reject("That username doesn't exist my good sir");
        }
      }, function (failRes) {
        defer.reject("Get request failed: " + failRes.statusText);
      });
      return defer.promise;
    };

    this.removePlayerFromShootout = function (player) {

      var index = currentPlayers.indexOf(player)

      // to get around a weird bug where if you delete the first one it only deletes
      // that one, but if you delete any other it will delete the next one as well
      if (index == 0) {
        currentPlayers.splice(index, index + 1);
      } else {
        currentPlayers.splice(index, index);
      }

    };

    this.attemptDelete = function (username) {
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
    };

    this.getUsers = function() {
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
      updateHoops();
    };

    this.decrementHoops = function () {
      currentUser.totalHoops--;
      updateHoops();
    };

    var updateHoops = function () {
      $http.put(url + "/" + currentUser.id + "/totalHoops",
        {
          totalHoops: currentUser.totalHoops
        });
    };

    this.currentUser = function(){
      return currentUser;
    };

    this.updateHighestStreak = function(newHighest) {
      currentUser.highestStreak = newHighest;
      $http.put(url + "/" + currentUser.id + "/highestStreak",
        {
          highestStreak: currentUser.highestStreak
        }
      );
    };

    this.getCurrentUser = function() {
      return currentUser;
    };

    this.getCurrentPlayers = function () {
      return currentPlayers;
    };

    this.logOut = function () {
      currentUser = {};
    };

    this.clearCurrentPlayers = function () {
      currentPlayers = [];
    };
  }]);

