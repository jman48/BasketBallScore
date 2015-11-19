'use strict';

describe('Service: user', function () {

  // load the service's module
  beforeEach(module('bballApp'));

  // instantiate services
  var user,
    scope,
    q,
    http;

  beforeEach(inject(function (_user_, _$rootScope_, $q, $http) {
    user = _user_;
    scope = _$rootScope_.$new();
    q = $q;
    http = $http;
  }));

  var testUsers = [{
    username: "testUser",
    totalHoops: 50,
    highestStreak: 3,
    shootoutsWon: 10
  }];

  var fakeGetPromise = function (shouldResolve) {
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

  var fakePostPromise = function (shouldResolve) {
    return q(function (resolve, reject) {
      if (shouldResolve){
        resolve({
          status: 300
        });
      } else {
        reject({
          statusText: "Could not complete post"
        });
      }
    });
  };

  it('should do something', function () {
    expect(!!user).toBe(true);
  });

  it('should succeed when registering an unused username', function() {
    var newUser = "john";
    spyOn(http, "get").and.returnValue(fakeGetPromise(true));
    spyOn(http, "post").and.returnValue(fakePostPromise(true));
    var promise = user.register(newUser);
    var spy = jasmine.createSpy('add user spy');
    promise.then(spy);
    scope.$apply();

    expect(http.get).toHaveBeenCalled();
    expect(http.post).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(newUser);
  });

  it('should fail when registering existing username', function() {
    var existingUser = "testUser";
    spyOn(http, "get").and.returnValue(fakeGetPromise(true));
    spyOn(http, "post").and.returnValue(fakePostPromise(true));
    user.register(existingUser);
    var promise = user.register(existingUser);
    var failSpy = jasmine.createSpy('duplicate user spy');
    promise.then(angular.noop, failSpy);
    scope.$apply();

    expect(http.get).toHaveBeenCalled();
    expect(http.post).not.toHaveBeenCalled();
    expect(failSpy).toHaveBeenCalled();
  });

  it('should succeed when registering two different usernames', function() {
    var name1 = "will";
    var name2 = "monkey";
    spyOn(http, "get").and.returnValue(fakeGetPromise(true));
    spyOn(http, "post").and.returnValue(fakePostPromise(true));
    var successSpy = jasmine.createSpy('succeed spy');
    var failSpy = jasmine.createSpy('fail spy');

    user.register(name1).then(successSpy, failSpy);
    user.register(name2).then(successSpy, failSpy);
    scope.$apply();

    expect(successSpy).toHaveBeenCalledWith(name1);
    expect(successSpy).toHaveBeenCalledWith(name2);
  });

  // todo: uncomment when post is implemented
/*  it('should fail when registering two different usernames with the first username repeated afterwards', function() {
    var name1 = 'john';
    var name2 = 'alice';
    spyOn(http, "get").and.returnValue(fakeHttpGetPromise(true));
    var successSpy = jasmine.createSpy('success spy');
    user.register(name1);
    var successPromise = user.register(name2);
    successPromise.then(successSpy);
    scope.$apply();
    expect(successSpy).toHaveBeenCalled();

    var failPromise = user.register(name1);
    var failSpy = jasmine.createSpy('fail spy');
    failPromise.then(angular.noop, failSpy);
    scope.$apply();

    expect(failSpy).toHaveBeenCalled();
  });*/

  // LOGGING IN -----
  it('should succeed when logging in as a valid user', function(){
    var promise = user.attemptLogin('reserved');
    var spy = jasmine.createSpy('valid user logon');
    promise.then(spy);
    scope.$apply();

    expect(spy).toHaveBeenCalled();
  });

  it('should fail when logging in with an invalid username', function(){
    var attempt1 = user.attemptLogin('');
    var attempt2 = user.attemptLogin(null);

    var spy = jasmine.createSpy('invalid username logon');

    attempt1.then(angular.noop, spy);
    scope.$apply();
    expect(spy).toHaveBeenCalled();

    attempt2.then(angular.noop, spy);
    scope.$apply();
    expect(spy).toHaveBeenCalled();
  });

  it('should fail when logging in as an unrecognised user', function(){
    var promise = user.attemptLogin('Jimbo');
    var spy = jasmine.createSpy('unrecognised user');
    promise.then(angular.noop, spy);
    scope.$apply();

    expect(spy).toHaveBeenCalled();
  });
  // implement log out before more tests..
});
