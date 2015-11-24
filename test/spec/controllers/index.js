'use strict';

describe('Controller: IndexCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var IndexCtrl,
    user,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _user_) {
    scope = $rootScope.$new();
    user = _user_;
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
});
