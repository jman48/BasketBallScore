'use strict';

describe('Controller: SetupShootoutCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var SetupShootoutCtrl,
    q,
    game,
    location,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, _game_, $location) {
    q = $q;
    location = $location;
    game = _game_;
    scope = $rootScope.$new();
    SetupShootoutCtrl = $controller('SetupShootoutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should decrement number of goals required if reduce goals button is pushed ' +
    'and goals is greater than one', function () {
    scope.incrementRounds();
    var rounds = scope.setupRounds;
    expect(rounds > 1).toBe(true);
    scope.decrementRounds();
    expect(scope.setupRounds).toBe(rounds - 1);
  });

  it('should not decrement number of goals required if reduce goals button is pushed ' +
    'and goals is not greater than one', function () {
    while (scope.setupRounds > 1) {
      scope.decrementRounds();
    }
    var rounds = scope.setupRounds;
    scope.decrementRounds();
    expect(scope.setupRounds).toBe(rounds);
  });

  it('should increment number of goals required if increase goals button is pushed', function () {
    var rounds = scope.setupRounds;
    scope.incrementRounds();
    expect(scope.setupRounds).toBe(rounds + 1);
  });

  it('should return blank if player turn is requested and there is no player', function () {
    spyOn(game, "getPlayerTurn").and.returnValue(undefined);
    expect(scope.getPlayerTurn()).toBe("");
  });

  it('should return a name if player turn is requested and there is a player', function () {
    spyOn(game, "getPlayerTurn").and.returnValue({username: "Alice"});
    expect(scope.getPlayerTurn()).toBe("Alice");
  });

  it('should not increment goals but should call the next player when the miss button is pushed', function () {
    spyOn(game, 'incrementGoals');
    spyOn(game, 'nextPlayerTurn');
    scope.playerMiss();
    expect(game.incrementGoals).not.toHaveBeenCalled();
    expect(game.nextPlayerTurn).toHaveBeenCalled();
  });

  it('should increment goals and call next player with goal button is pushed', function () {
    spyOn(game, 'incrementGoals');
    spyOn(game, 'nextPlayerTurn');
    scope.playerGoal();
    expect(game.incrementGoals).toHaveBeenCalled();
    expect(game.nextPlayerTurn).toHaveBeenCalled();
  });

  it('should display an error message if you try to start a shootout with one player', function () {
    spyOn(game, "getCurrentPlayers").and.returnValue([{username: "test1"}]);
    spyOn(location, "path");
    scope.startShootout();
    expect(location.path).not.toHaveBeenCalled();
    expect(game.activeShootout()).toBe(false);
    expect(scope.errorMessage).not.toBe(undefined);
  });

  it('should display an error message if you try to start a shootout with zero players', function () {
    spyOn(game, "getCurrentPlayers").and.returnValue([]);
    spyOn(location, "path");
    scope.startShootout();
    expect(location.path).not.toHaveBeenCalled();
    expect(scope.errorMessage).not.toBe(undefined);
  });

  it('should start a new game if you try to start a shootout with two players', function () {
    spyOn(game, "getCurrentPlayers").and.returnValue([{username: "test1"}, {username: "test2"}]);
    spyOn(location, "path");
    scope.startShootout();
    expect(location.path).toHaveBeenCalledWith('/shootout');
    expect(game.activeShootout()).toBe(true);
    expect(scope.errorMessage).toBe(undefined);
  });
});
