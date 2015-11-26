'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var LoginCtrl,
    scope,
    q,
    user,
    location,
    http;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_user_, $controller, $rootScope, $q, $location, $http) {
    scope = $rootScope.$new();
    q = $q;
    location = $location;
    user = _user_;
    http = $http;
    LoginCtrl = $controller('LoginCtrl', {
      // place here mocked dependencies
      $scope: scope
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

  it("should redirect when when given valid username", function(){
    spyOn(location, 'path');
    spyOn(user, "login").and.returnValue(generatePromise(true, "RegisteredUser"));
    scope.attemptLogin("RegisteredUser");
    scope.$apply();
    expect(location.path).toHaveBeenCalledWith('/landing');
    expect(scope.errorMessage).toBe(undefined);
  });

  it("should stay on same page when given invalid username", function() {
    spyOn(location, 'path');
    spyOn(user, "login").and.returnValue(generatePromise(false, "Error"));
    scope.attemptLogin(null);
    scope.$apply();
    expect(location.path).not.toHaveBeenCalled();
    scope.attemptLogin('');
    scope.$apply();
    expect(location.path).not.toHaveBeenCalled();
  });

  it("should change error message if username is invalid", function() {
    spyOn(user, "login").and.returnValue(generatePromise(false, "Error"));
    scope.attemptLogin('');
    scope.$apply();
    expect(scope.errorMessage).not.toBe(undefined);
    scope.errorMessage = undefined;

    scope.attemptLogin(null);
    scope.$apply();
    expect(scope.errorMessage).not.toBe(undefined);
  });

  it("should change error message if username is invalid", function() {
    spyOn(user, "login").and.returnValue(generatePromise(false, "Error"));
    scope.attemptLogin(null);
    scope.$apply();
    expect(scope.errorMessage).toBe("Error");
  });

});
