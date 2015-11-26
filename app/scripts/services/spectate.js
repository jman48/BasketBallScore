'use strict';

/**
 * @ngdoc service
 * @name bballApp.spectate
 * @description
 * # spectate
 * Service in the bballApp.
 */
angular.module('bballApp')
  .service('spectate', ['$q', '$http', function ($q, $http) {

    var url = config.backend;

    var gameId,
      spectateMode = false;

    this.isActiveGame = function () {
      return $q(function (resolve, reject) {
        $http.get(url + "games/active").then(function (successRes) {
          var activeGame = successRes.data;
          if (activeGame) {
            gameId = activeGame.id;
            resolve(activeGame);
          } else {
            reject();
          }
        }, function (failRes) {
          reject(failRes.statusText);
        });
      });
    };

    this.updateScores = function () {
      return $q(function (resolve, reject) {
        $http.get(url + "players/game/" + gameId).then (function (playersRes) {
          resolve(playersRes.data);
        }, function (failRes) {
          reject(failRes.statusText);
        });
      });
    };

    this.updateGameInfo = function () {
      return $q(function (resolve, reject) {
        $http.get(url + "games/" + gameId).then(function (successRes){
          resolve(successRes.data);
        }, function (failRes) {
          reject(failRes.statusText);
        });
      });
    };

    this.spectatorMode = function (on) {
      spectateMode = on;
    };

    this.getSpectateMode = function () {
      return spectateMode;
    };

  }]);
