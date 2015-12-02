'use strict';

describe('Controller: SpectateCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var SpectateCtrl,
    scope,
    spectate,
    location,
    q;

  var testUsers,
    testGameInfo;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _spectate_, $location, $q) {
    scope = $rootScope.$new();
    scope.players = [];
    spectate = _spectate_;
    location = $location;
    q = $q;

    SpectateCtrl = $controller('SpectateCtrl', {
      $scope: scope
      // mock dependencies
    });

    testUsers = [
      {
        username: "test1",
        totalHoops: 40,
        score: 66
      },
      {
        username: "test2",
        totalHoops: 100,
        score: 55
      }
    ];

    testGameInfo = {
      hoopsToWin: 22,
      is_active: true
    };
  }));

  var usersPromise = function () {
    return q(function (resolve, reject) {
      resolve(testUsers);
    });
  };

  var gameInfoPromise = function () {
    return q(function (resolve, reject) {
      resolve(testGameInfo);
    });
  };

  it('shouldn\'t update the game if spectate mode isn\'t on', function () {
    spyOn(SpectateCtrl, "updateScores");
    spyOn(SpectateCtrl, "updateGameInfo");
    SpectateCtrl.update();
    expect(SpectateCtrl.updateScores).not.toHaveBeenCalled();
    expect(SpectateCtrl.updateGameInfo).not.toHaveBeenCalled();
  });

  it('should redirect page it updating isn\'t happening', function () {
    spyOn(location, "path");
    spyOn(spectate, "getSpectateMode").and.returnValue(false);
    SpectateCtrl.update();

    expect(location.path).toHaveBeenCalled();

  });



  it('should update players when updating', function () {
    spyOn(spectate, "getSpectateMode").and.returnValue(true);
    spyOn(spectate, "updatePlayers").and.returnValue(usersPromise());
    spyOn(spectate, "updateGameInfo").and.returnValue(gameInfoPromise());
    SpectateCtrl.update();
    scope.$apply();

    expect(scope.players).toBe(testUsers);
  });

  it('should update game info when updating', function () {
    spyOn(spectate, "getSpectateMode").and.returnValue(true);
    spyOn(spectate, "updatePlayers").and.returnValue(usersPromise());
    spyOn(spectate, "updateGameInfo").and.returnValue(gameInfoPromise());
    SpectateCtrl.update();
    scope.$apply();

    expect(scope.gameActive).toBe(testGameInfo.is_active);
    expect(scope.rounds).toBe(testGameInfo.hoopsToWin);
  });

  it('should properly determine the winner of the game (so far)', function () {
    scope.players = testUsers;

    expect(scope.getWinner()).toBe(testUsers[0]);
  });
  // won't bother with asynchronous testing of waiting correct amounts of time

});
