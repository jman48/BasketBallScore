'use strict';

describe('Service: spectate', function () {

  // load the service's module
  beforeEach(module('bballApp'));

  // instantiate service
  var spectate;
  beforeEach(inject(function (_spectate_) {
    spectate = _spectate_;
  }));

  it('should do something', function () {
    expect(!!spectate).toBe(true);
  });

});
