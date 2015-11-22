'use strict';

describe('Controller: SetupShootoutCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var SetupShootoutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SetupShootoutCtrl = $controller('SetupShootoutCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
