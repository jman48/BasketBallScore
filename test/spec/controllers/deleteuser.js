'use strict';

describe('Controller: DeleteuserCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var DeleteuserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeleteuserCtrl = $controller('DeleteuserCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
