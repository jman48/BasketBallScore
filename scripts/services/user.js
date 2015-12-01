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

    var currentUser = null;

    // helper function, returns user from users array
    var getUser = function (users, username) {
      return users[users.map(function (user){
        return user.username.toLowerCase();
      }).indexOf(username.toLowerCase())];
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
            username: username,
            totalHoops: 0,
            highestStreak: 0,
            shootoutsWon: 0
          };

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

    this.getPlayer = function (username) {

      var defer = $q.defer();

      $http.get(url).then(function (successRes) {
        var users = successRes.data;
        var user = getUser(users, username);
        defer.resolve(user);
      }, function (failRes) {
        defer.reject("Get request failed: " + failRes.statusText);
      });
      return defer.promise;
    };

    this.delete = function (id) {
      return $q(function (resolve, reject) {
        $http.delete(url + "/" + id).then(function (successRes) {
          resolve(successRes);
        }, function (failRes) {
          reject("Something went wrong: " + failRes);
        });
      });
    };

    this.getUsers = function () {
      return $q(function (resolve, reject) {
        $http.get(url).then(function (successRes) {
          var users = successRes.data;
          resolve(users);
        }, function (failRes) {
          reject(failRes.statusText);
        });
      });
    };

    this.incrementHoops = function (){
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

    this.updateHighestStreak = function (newHighest) {
      currentUser.highestStreak = newHighest;
      $http.put(url + "/" + currentUser.id + "/highestStreak",
        {
          highestStreak: currentUser.highestStreak
        }
      );
    };

    this.updateShootoutsWon = function (goalScorer) {
      $http.put(url + "/" + goalScorer.id + "/shootoutsWon",
        {
          shootoutsWon: goalScorer.shootoutsWon
        });
    };

    this.currentUser = function (){
      return currentUser;
    };

    this.logOut = function () {
      currentUser = null;
    };

    this.isLoggedOn = function () {
      return currentUser;
    }
  }]);
