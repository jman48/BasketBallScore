'use strict';

describe('Controller: SingleplayerCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var SingleplayerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SingleplayerCtrl = $controller('SingleplayerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SingleplayerCtrl.awesomeThings.length).toBe(3);
  });
});
