'use strict';

describe('Controller: ScoretableCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var ScoretableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScoretableCtrl = $controller('ScoretableCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
