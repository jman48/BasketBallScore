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
    var users = ['reserved'];
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.attemptLogin = function(username){
      if (users.indexOf(username) == -1){
        users.push(username)
        return true;
      }
      else return false;
    }
  });
