'use strict';

describe('Controller: DeleteUserCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var DeleteUserCtrl,
    scope,
    q,
    user,
    location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_user_, $controller, $rootScope, $q, $location) {
    scope = $rootScope.$new();
    q = $q;
    location = $location;
    user = _user_;
    DeleteUserCtrl = $controller('DeleteUserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  var generatePromise = function(resolve, data){
    var defer = q.defer();
    if (resolve) {
      defer.resolve(data);
    }
    else {
      defer.reject(data);
    }
    return defer.promise;
  };

  it("should redirect when valid username is deleted", function(){
    spyOn(location, 'path');
    spyOn(user, "delete").and.returnValue(generatePromise(true, "RegisteredUser"));
    scope.confirmDelete("RegisteredUser");
    scope.$apply();
    expect(location.path).toHaveBeenCalledWith('/login');
  });

  it("should stay on same page and return an error message if invalid username is deleted", function() {
    spyOn(location, 'path');
    spyOn(user, "delete").and.returnValue(generatePromise(false, "Error"));
    scope.confirmDelete("");
    scope.$apply();
    expect(location.path).not.toHaveBeenCalled();
    expect(scope.errorMessage).toBe("Error");
  })
});
