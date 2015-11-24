'use strict';

/**
 * @ngdoc service
 * @name bballApp.game
 * @description
 * # game
 * Service in the bballApp.
 */
angular.module('bballApp')
  .service('game', ['user', '$q', function (user, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var currentPlayers = [];
    var winner = undefined;
    var rounds; // the amount of rounds in a shootout
    var activeShootout = false; // will not let you access shootout screen if false
    var playerTurn = 0; // current index of player in shootout

    this.addPlayer = function (username) {

      var defer = $q.defer();

      user.getPlayer(username).then(function (name) {

          if (name) { // user exists

            var isPlaying = false;

            for (var i = 0; i < currentPlayers.length; i++) {
              if (currentPlayers[i][0].username.toLowerCase() === username.toLowerCase()) {
                isPlaying = true;
              }
            }

            if (!isPlaying) {
              currentPlayers.push([name, 0]);
              defer.resolve(currentPlayers);
            } else {
              defer.reject("Player already entered");
            }

          } else {
            defer.reject("That username does not exist, my good sir");
          }
        }, function (failure) {

        defer.reject(failure);
        }
      )

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

    this.resetShootout = function () {
      currentPlayers = [];
      winner = undefined;
      playerTurn = 0;
    };

    this.getCurrentPlayers = function () {
      return currentPlayers;
    };

    this.setRounds = function (setupRounds) {
      rounds = setupRounds;
    };

    this.setCurrentPlayers = function(players) {
      currentPlayers = players;
    };

    this.getRounds = function () {
      return rounds;
    };


    this.incrementGoals = function () {
      var goalScorer = currentPlayers[playerTurn];
      goalScorer[1]++;
      if (goalScorer[1] === rounds) {
        winner = goalScorer[0].username;
        goalScorer[0].shootoutsWon++;
        user.updateShootoutsWon(goalScorer[0]);
      }
    };

    this.nextPlayerTurn = function () {
      playerTurn++;
      playerTurn %= currentPlayers.length;
    };

    this.getPlayerTurn = function () {
      if (currentPlayers.length === 0) {
        return undefined;
      } else {
        return currentPlayers[playerTurn][0];
      }
    };

    this.setActiveShootout = function (bool) {
      activeShootout = bool;
    };

    this.activeShootout = function () {
      return activeShootout;
    };

    this.getWinner = function () {
      return winner;
    };

  }]);
