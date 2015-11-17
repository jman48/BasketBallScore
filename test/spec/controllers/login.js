'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var LoginCtrl,
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
    LoginCtrl = $controller('LoginCtrl', {
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
  }

  it("should redirect when when given valid username", function(){
    spyOn(location, 'path');
    spyOn(user, "attemptLogin").and.returnValue(generatePromise(true, "John"));
    var promise = scope.attemptLogin("John");
    scope.$apply();
    expect(location.path).toHaveBeenCalledWith('/landing');
    expect(scope.errorMessage).toBe(undefined);
  });

  it("should stay on same page when given invalid username", function() {
    spyOn(location, 'path');
    spyOn(user, "attemptLogin").and.returnValue(generatePromise(false, "Error"));
    var promise = scope.attemptLogin(null);
    scope.$apply();
    expect(location.path).not.toHaveBeenCalled();
  });

  it("should change error message if username is invalid", function() {
    spyOn(user, "attemptLogin").and.returnValue(generatePromise(false, "Error"));
    var promise = scope.attemptLogin(null);
    scope.$apply();
    expect(scope.errorMessage).toBe("Error");
  });
});
