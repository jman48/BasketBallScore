'use strict';

describe('Controller: RegisterCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var RegisterCtrl,
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
    RegisterCtrl = $controller('RegisterCtrl', {
      // place here mocked dependencies
      $scope: scope,
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
    spyOn(user, "register").and.returnValue(generatePromise(true, "John"));
    var promise = scope.attemptRegister("John");
    scope.$apply();
    expect(location.path).toHaveBeenCalledWith('/landing');
    expect(scope.errorMessage).toBe(undefined);
  });

  it("should stay on same page when given invalid username", function() {
    spyOn(location, 'path');
    spyOn(user, "register").and.returnValue(generatePromise(false, "Error"));
    var promise = scope.attemptRegister(null);
    scope.$apply();
    expect(location.path).not.toHaveBeenCalled();
  });

  it("shouldn't use user service if username is not valid", function() {
    spyOn(user, "register").and.returnValue(generatePromise(false, "Error"));
    var promise = scope.attemptRegister(null);
    scope.$apply();
    expect(user.register).not.toHaveBeenCalled();
  });

});
