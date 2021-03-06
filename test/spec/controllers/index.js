'use strict';

describe('Controller: IndexCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var IndexCtrl,
    user,
    game,
    location,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _user_, _game_, $location) {
    scope = $rootScope.$new();
    game = _game_;
    user = _user_;
    location = $location;
    IndexCtrl = $controller('IndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should return current username if user is logged in', function () {
    spyOn(user, "isLoggedOn").and.returnValue(true);
    spyOn(user, "currentUser").and.returnValue({username: "Alice"});
    expect(scope.username()).toBe("Alice");
  });

  it('should not return current username if user is not logged in', function () {
    spyOn(user, "isLoggedOn").and.returnValue(false);
    spyOn(user, "currentUser").and.returnValue({username: "Alice"});
    expect(scope.username()).not.toBe("Alice");
  });

  it('should call reset shootout and set active shootout to false and move player to' +
    ' set up shootout page when reset shootout is called', function () {
    spyOn(location, "path");
    spyOn(game, "resetShootout");
    scope.resetShootout();
    expect(location.path).toHaveBeenCalledWith('/setup_shootout');
    expect(game.resetShootout).toHaveBeenCalled();
  });
});
