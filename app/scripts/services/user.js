'use strict';

/**
 * @ngdoc service
 * @name bballApp.user
 * @description
 * # user
 * Service in the bballApp.
 */
angular.module('bballApp')
  .service('user', function () {
    var users = [];
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.attemptRegister = function(username){
      if (!username)
        return false;
      if (users.indexOf(username) == -1){
        users.push(username)
        return true;
      }
      else return false;
    }
  });
