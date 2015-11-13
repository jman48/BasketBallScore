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
    var users = ['reserved'];
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.attemptRegister = function(username){
      var defer = $q.defer();
      if (!username)
        defer.reject("Username is not valid");
      if (users.indexOf(username) == -1){
        users.push(username);
        defer.resolve(username);
      }
      else defer.reject("Username is already taken");

      return defer.promise;
    }
  }]);

