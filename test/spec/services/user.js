'use strict';

describe('Service: user', function () {

  // load the service's module
  beforeEach(module('bballApp'));

  // instantiate service
  var user, scope;
  beforeEach(inject(function (_user_, _$rootScope_) {
    user = _user_;
    scope = _$rootScope_.$new();
  }));

  it('should do something', function () {
    expect(!!user).toBe(true);
  });

  it('should succeed when registering a valid username', function() {
    var promise = user.attemptRegister('John');
    var spy = jasmine.createSpy('add user spy');
    promise.then(spy);
    scope.$apply();

    expect(spy).toHaveBeenCalledWith('John');
  });

  it('should fail when registering existing username', function() {
    user.attemptRegister('John');
    var promise = user.attemptRegister('John');
    var spy = jasmine.createSpy('duplicate user spy');
    promise.then(angular.noop, spy);
    scope.$apply();

    expect(spy).toHaveBeenCalled();
  });

  it('should succeed when registering two different usernames', function() {
    user.attemptRegister('John');
    var promise = user.attemptRegister('Mary');
    var spy = jasmine.createSpy('different users spy');
    promise.then(spy);
    scope.$apply();

    expect(spy).toHaveBeenCalledWith('Mary');
  });

  it('should fail when registering two different usernames with the first username repeated afterwards', function() {
    user.attemptRegister('John');
    user.attemptRegister('Alice');
    var promise = user.attemptRegister('John');
    var spy = jasmine.createSpy('different users spy');
    promise.then(angular.noop, spy);
    scope.$apply();

    expect(spy).toHaveBeenCalled();
  });

  it('should fail when username field is blank', function() {
    var promise = user.attemptRegister();
    var spy = jasmine.createSpy('blank username');
    promise.then(angular.noop, spy);
    scope.$apply();

    expect(spy).toHaveBeenCalled();
  });

  it('should fail when username field is empty string', function() {
    var promise = user.attemptRegister('');
    var spy = jasmine.createSpy('empty string username');
    promise.then(angular.noop, spy);
    scope.$apply();

    expect(spy).toHaveBeenCalled();
  });

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
