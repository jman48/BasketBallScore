'use strict';

describe('Service: user', function () {

  // load the service's module
  beforeEach(module('bballApp'));

  // instantiate service
  var user, scope;
  beforeEach(inject(function (_user_, _$rootScope_) {
    user = _user_;
    scope = _$rootScope_;
  }));

  it('should do something', function () {
    expect(!!user).toBe(true);
  });

  it('should resolve promise when adding a username', function() {
    var promise = user.attemptRegister('John');
    var spy = jasmine.createSpy('add user spy');
    promise.then(spy);
    scope.$apply();

    expect(spy).toHaveBeenCalledWith('John');
  });

  it('should reject promise when adding username twice', function() {
    user.attemptRegister('John');
    var promise = user.attemptRegister('John');
    var spy = jasmine.createSpy('duplicate user spy');
    promise.then(angular.noop, spy);
    scope.$apply();

    expect(spy).toHaveBeenCalled();
  });

  it('should resolve promise when adding two different usernames', function() {
    user.attemptRegister('John');
    var promise = user.attemptRegister('Mary');
    var spy = jasmine.createSpy('different users spy');
    promise.then(spy);
    scope.$apply();

    expect(spy).toHaveBeenCalledWith('Mary');
  });

  it('should reject promise when adding two different usernames with the first username repeated afterwards', function() {
    user.attemptRegister('John');
    user.attemptRegister('Alice');
    var promise = user.attemptRegister('John');
    var spy = jasmine.createSpy('different users spy');
    promise.then(angular.noop, spy);
    scope.$apply();

    expect(spy).toHaveBeenCalled();
  });

  it('should reject promise when username field is blank', function() {
    var promise = user.attemptRegister();
    var spy = jasmine.createSpy('blank username');
    promise.then(angular.noop, spy);
    scope.$apply();

    expect(spy).toHaveBeenCalled();
  });

  it('should reject promise when username field is empty string', function() {
    var promise = user.attemptRegister('');
    var spy = jasmine.createSpy('empty string username');
    promise.then(angular.noop, spy);
    scope.$apply();

    expect(spy).toHaveBeenCalled();
  });
});
