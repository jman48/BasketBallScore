'use strict';

describe('Controller: SpectateCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var SpectateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpectateCtrl = $controller('SpectateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
