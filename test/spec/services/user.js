'use strict';

describe('Service: user', function () {

  // load the service's module
  beforeEach(module('bballApp'));

  // instantiate services
  var user,
    scope,
    q,
    http,
    testUsers;

  beforeEach(inject(function (_user_, _$rootScope_, $q, $http) {
    user = _user_;
    scope = _$rootScope_.$new();
    q = $q;
    http = $http;

    // reset users
    testUsers = [{
      username: existingUsername,
      totalHoops: 50,
      highestStreak: 3,
      shootoutsWon: 10
    }];

  }));

  var existingUsername = "existing";

  var fakeGetReq = function (shouldResolve) {
    return q(function (resolve, reject) {
      if (shouldResolve){
        resolve({
          data: testUsers
        });
      } else {
        reject({
          statusText: "Could not complete get"
        });
      }
    });
  };

  var fakePostReq = function (shouldResolve) {
    testUsers.push(user);
    return q(function (resolve, reject) {
      if (shouldResolve){
        resolve({
          status: 200 // success
        });
      } else {
        reject({
          statusText: "Could not complete post"
        });
      }
    });
  };

  it('should succeed when registering an unused username', function() {
    var newUser = "john";
    var spy = jasmine.createSpy('add user spy');

    spyOn(http, "get").and.returnValue(fakeGetReq(true));
    spyOn(http, "post").and.returnValue(fakePostReq(true));

    var promise = user.register(newUser);
    promise.then(spy);
    scope.$apply();

    expect(http.get).toHaveBeenCalled();
    expect(http.post).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(newUser);
  });

  it('should fail when registering existing username', function() {
    var failSpy = jasmine.createSpy('duplicate user spy');

    spyOn(http, "get").and.returnValue(fakeGetReq(true));
    spyOn(http, "post").and.returnValue(fakePostReq(true));

    user.register(existingUsername);
    var promise = user.register(existingUsername);
    promise.then(angular.noop, failSpy);
    scope.$apply();

    expect(http.get).toHaveBeenCalled();
    expect(http.post).not.toHaveBeenCalled();
    expect(failSpy).toHaveBeenCalled();
  });

  // LOGGING IN -----
  it('should succeed when logging in as an existing user', function(){
    spyOn(http, "get").and.returnValue(fakeGetReq(true));
    var promise = user.login(existingUsername);
    var spy = jasmine.createSpy('valid user logon');
    // place spy at success path
    promise.then(spy);
    scope.$apply();

    expect(http.get).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should fail when logging in with an invalid username', function(){
    spyOn(http, "get").and.returnValue(fakeGetReq(true));

    var spy = jasmine.createSpy('invalid username logon');

    user.login('').then(angular.noop, spy);
    scope.$apply();
    expect(spy).toHaveBeenCalled();

    user.login(null).then(angular.noop, spy);
    scope.$apply();
    expect(spy).toHaveBeenCalled();
  });

  it('should fail when logging in as an unrecognised user', function(){
    spyOn(http, "get").and.returnValue(fakeGetReq(true));

    var promise = user.login('Jimbo');
    var spy = jasmine.createSpy('unrecognised user');
    promise.then(angular.noop, spy);
    scope.$apply();

    expect(spy).toHaveBeenCalled();
  });
});
