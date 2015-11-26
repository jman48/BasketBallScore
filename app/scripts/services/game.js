'use strict';

/**
 * @ngdoc service
 * @name bballApp.game
 * @description
 * # game
 * Service in the bballApp.
 */
angular.module('bballApp')
  .service('game', ['user', '$q', '$http', function (user, $q, $http) {

    var currentPlayers = [],
    winner = undefined,
    rounds, // the amount of rounds in a shootout
    activeShootout = false, // will not let you access shootout screen if false
    playerTurn = 0, // current index of player in shootout
    gameId; // game identifier for db

    var url = config.backend;

    this.addPlayer = function (username) {

      var defer = $q.defer();

      // check if user is already playing
      var isPlaying = false;
      for (var i = 0; i < currentPlayers.length; i++) {
        if (currentPlayers[i].username.toLowerCase() === username.toLowerCase()) {
          isPlaying = true;
        }
      }

      if (!isPlaying) {
        user.getPlayer(username).then(function (player) {
          if (player) { // user exists
            player.score = 0;
            currentPlayers.push(player);
            defer.resolve(currentPlayers);

          } else {
            defer.reject("That username does not exist, my good sir");
          }
        }, function (failure) {
          defer.reject(failure);
        });
      } else {
        defer.reject("Player already entered");
      }

      return defer.promise;
    };

    this.startGame = function (_rounds_) {
      activeShootout = true;
      rounds = _rounds_;

      // tell server that the game has started
      var game = {
        players: currentPlayers,
        hoopsToWin: rounds
      };
      $http.post(url + "games", game).then(function (successRes) {
        var dbGame = successRes.data;
        gameId = dbGame.id;
      }, function (failRes) {
        console.log("failed to tell server that the game started", failRes.statusText);
      });
    };

    this.removePlayerFromShootout = function (player) {

      var index = currentPlayers.indexOf(player);

      // to get around a weird bug where if you delete the first one it only deletes
      // that one, but if you delete any other it will delete the next one as well
      if (index == 0) {
        // is splice being used correctly here?
        currentPlayers.splice(index, index + 1);
      } else {
        currentPlayers.splice(index, index);
      }
    };

    this.resetShootout = function () {
      currentPlayers = [];
      winner = undefined;
      playerTurn = 0;
      activeShootout = false;
    };

    this.getCurrentPlayers = function () {
      return currentPlayers;
    };

    this.setCurrentPlayers = function(players) {
      currentPlayers = players;
    };

    this.getRounds = function () {
      return rounds;
    };

    this.incrementGoals = function () {
      var goalScorer = currentPlayers[playerTurn];
      goalScorer.score++;
      $http.put(url + "players/" + goalScorer.username, {
        score: goalScorer.score
      }).then(function (successRes) {
        // cool
      }, function (failRes) {
        console.log("increment failed to tell server", failRes.statusText);
      });
      // if won game
      if (goalScorer.score === rounds) {
        this.endGame(goalScorer);
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
        return currentPlayers[playerTurn];
      }
    };

    this.activeShootout = function () {
      return activeShootout;
    };

    this.getWinner = function () {
      return winner;
    };

    this.endGame = function (winningPlayer) {
      activeShootout = false;
      winningPlayer.shootoutsWon++;
      winner = winningPlayer.username;
      user.updateShootoutsWon(winningPlayer);
      $http.put(url + "games/" + gameId + "/active", {
        isActive: false
      });
    }

  }]);
