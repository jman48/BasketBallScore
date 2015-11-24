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

  it('will decrement number of goals required if reduce goals button is pushed ' +
    'and goals is greater than one', function () {
    scope.incrementRounds();
    var rounds = scope.setupRounds;
    expect(rounds > 1).toBe(true);
    scope.decrementRounds();
    expect(scope.setupRounds).toBe(rounds - 1);
  });

  it('will not decrement number of goals required if reduce goals button is pushed ' +
    'and goals is not greater than one', function () {
    while (scope.setupRounds > 1) {
      scope.decrementRounds();
    }
    var rounds = scope.setupRounds;
    scope.decrementRounds();
    expect(scope.setupRounds).toBe(rounds);
  });

  it('will increment number of goals required if increase goals button is pushed', function () {
    var rounds = scope.setupRounds;
    scope.incrementRounds();
    expect(scope.setupRounds).toBe(rounds + 1);
  });

});
