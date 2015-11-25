'use strict';

describe('Service: game', function () {

  // load the service's module
  beforeEach(module('bballApp'));

  // instantiate service
  var scope,
    game,
    user,
    q;


  beforeEach(inject(function (_game_, _$rootScope_, _user_, $q) {
    scope = _$rootScope_.$new();
    user = _user_;
    game = _game_;
    q = $q;
    game.setCurrentPlayers([
      [{username: "test1"}, 0],
      [{username: "test2"}, 0],
      [{username: "test3"}, 0]
    ]);
  }));

  it('should do something', function () {
    expect(!!game).toBe(true);
  });

  it('should add player with goals set to zero if player is valid', function () {
    var defer = q.defer();
    defer.resolve({username: "test4"});
    spyOn(user, "getPlayer").and.returnValue(defer.promise);
    game.addPlayer("test4");
    scope.$apply();
    var players = game.getCurrentPlayers();
    expect(players.length).toBe(4);
    expect(players[3][1]).toBe(0);
    expect(players[3][0].username).toBe("test4");
  });

  it('should not add player if player is already in game', function () {
    var defer = q.defer();
    defer.resolve({username: "test3"});
    spyOn(user, "getPlayer").and.returnValue(defer.promise);
    game.addPlayer("test3");
    scope.$apply();
    var players = game.getCurrentPlayers();
    expect(players.length).toBe(3);
  });

  // The splice function in arrays was being difficult, so I am including two remove player tests
  // for the first and second players
  it('should remove only first player when remove first player link is clicked', function() {
    game.removePlayerFromShootout(game.getCurrentPlayers()[0]);
    var players = game.getCurrentPlayers();
    expect(players[0][0].username).toBe("test2");
    expect(players[1][0].username).toBe("test3");
  });

  it('should remove only second player when remove second player link is clicked', function() {
    game.removePlayerFromShootout(game.getCurrentPlayers()[1]);
    var players = game.getCurrentPlayers();
    expect(players[0][0].username).toBe("test1");
    expect(players[1][0].username).toBe("test3");
  });

  it('should increment players goal count when goal button is pushed', function () {
    var goalCount = game.getCurrentPlayers()[0][1];
    game.incrementGoals();
    expect(game.getCurrentPlayers()[0][1]).toBe(goalCount + 1);
  });

  it('should move to next player when miss button is pushed and eventually' +
    ' cycle back to first player', function () {
    expect(game.getPlayerTurn().username).toBe("test1");
    game.nextPlayerTurn();
    expect(game.getPlayerTurn().username).toBe("test2");
    game.nextPlayerTurn();
    expect(game.getPlayerTurn().username).toBe("test3");
    game.nextPlayerTurn();
    expect(game.getPlayerTurn().username).toBe("test1");
  });

  it('should change winner state and increment players shootouts won count when ' +
    'player reaches goal', function () {
    expect(game.getWinner()).toBe(undefined);
    game.setRounds(1);
    game.incrementGoals();
    expect(game.getWinner()).toBe("test1");
  });

  it('should reset game when reset game button is pushed', function () {
    game.resetShootout();
    expect(game.getWinner()).toBe(undefined);
    expect(game.getCurrentPlayers().length).toBe(0);
    expect(game.getPlayerTurn()).toBe(undefined);
  });
});
