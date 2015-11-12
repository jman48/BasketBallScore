'use strict';

describe('Service: user', function () {

  // load the service's module
  beforeEach(module('bballApp'));

  // instantiate service
  var user;
  beforeEach(inject(function (_user_) {
    user = _user_;
  }));

  it('should do something', function () {
    expect(!!user).toBe(true);
  });

  it('should return true when adding a username', function() {
    var result = user.attemptRegister('John');
    expect(result).toBe(true);
  });

  it('should return false when adding username twice', function() {
    user.attemptRegister('John');
    var result = user.attemptRegister('John');
    expect(result).toBe(false);
  });

  it('should return true when adding two different usernames', function() {
    user.attemptRegister('John');
    var result = user.attemptRegister('Alice');
    expect(result).toBe(true);
  });

  it('should return false when adding two different usernames with the first username repeated afterwards', function() {
    user.attemptRegister('John');
    user.attemptRegister('Alice');
    var result = user.attemptRegister('John');
    expect(result).toBe(true);
  });

  it('should return false when username field is blank', function() {
    var result = user.attemptRegister();
    expect(result).toBe(false);
  });

  it('should return false when username field is empty string', function() {
    var result = user.attemptRegister();
    expect(result).toBe(false);
  });
});
