'use strict';

describe('Controller: SinglePlayerCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var SinglePlayerCtrl,
    scope,
    fakeUser = function(totalHoops, highestStreak){
        return {
          name: "Joe",
          totalHoops: totalHoops,
          highestStreak: highestStreak,
          shootOutsWon: 2
        };
    },
    mockUserService = {
      isLoggedOn: function () { return true; },
      currentUser: function () { return fakeUser; },
      incrementHoops: function () {},
      decrementHoops: function () {},
      updateHighestStreak: function () {}
    };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    spyOn(mockUserService, 'currentUser').and.returnValue(fakeUser(10, 3));
    scope = $rootScope.$new();
    SinglePlayerCtrl = $controller('SinglePlayerCtrl', {
      $scope: scope,
      user: mockUserService
    });
  }));

  it('should increment total hoops when incrementHoops is called', function(){
    var beforeHoops = scope.totalHoops;
    spyOn(mockUserService, "incrementHoops");
    scope.incrementHoops();
    expect(scope.totalHoops).toBe(beforeHoops+1);
    expect(mockUserService.incrementHoops).toHaveBeenCalled();
  });

  it('should decrement total hoops when decrementHoops is called', function(){
    var beforeHoops = scope.totalHoops;
    spyOn(mockUserService, "decrementHoops");
    scope.decrementHoops();
    expect(scope.totalHoops).toBe(beforeHoops-1);
    expect(mockUserService.decrementHoops).toHaveBeenCalled();
  });

  it('should increment streak when incrementStreak is called', function(){
    var beforeStreak = scope.currentStreak;
    scope.incrementStreak();
    expect(scope.currentStreak).toBe(beforeStreak+1);
  });

  it('should update highest streak when currentStreak higher than highest', function(){
    scope.currentStreak = mockUserService.currentUser().highestStreak;
    var beforeStreak = scope.currentStreak;
    spyOn(mockUserService, 'updateHighestStreak');
    scope.incrementStreak();
    expect(mockUserService.updateHighestStreak).toHaveBeenCalledWith(beforeStreak+1);
  });

  it('should reset streak when resetStreak is called', function(){
    scope.currentStreak = 5; // some non-zero number
    scope.cancelStreak();
    expect(scope.currentStreak).toBe(0);
  });
});
