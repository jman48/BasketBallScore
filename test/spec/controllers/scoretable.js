'use strict';

describe('Controller: ScoretableCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var ScoretableCtrl,
    scope,
    q,
    user,
    location;

  var testUsers = [{
      name: 'test1',
      totalShots: 100,
      highestStreak: 0,
      shootOutsWon: 0
    },
    {
      name: 'test2',
      totalShots: 0,
      highestStreak: 100,
      shootOutsWon: 0
    },
    {
      name: 'test3',
      totalShots: 0,
      highestStreak: 0,
      shootOutsWon: 100
    }];

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_user_, $controller, $rootScope, $q, $location) {
    scope = $rootScope.$new();
    q = $q;
    location = $location;
    user = _user_;
    ScoretableCtrl = $controller('ScoretableCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  var generatePromise = function(resolve, data){
    var defer = q.defer();
    if (resolve) {
      defer.resolve(data);
    }
    else {
      defer.reject(data);
    }
    return defer.promise;
  };

  it("should refresh user array when sort function is called", function() {
    spyOn(user, "getUsers");
    scope.order('highestStreak');
    expect(user.getUsers).toHaveBeenCalled();
  });

  it("should print longest streak in reverse when activated once", function() {
    scope.order('highestStreak');
    expect(scope.reverse).toBe(true);
  });

  it("should print longest streak in order when activated twice", function() {
    scope.order('highestStreak');
    scope.order('highestStreak');
    expect(scope.reverse).toBe(false);
  });

  it("should change sort order to 'highestStreak' when highest streak sort activated", function() {
    scope.order('highestStreak');
    expect(scope.sortBy).toBe('highestStreak');
  });

  it("should change high score readout to 'highestStreak' when highest streak sort activated", function() {
    scope.order('highestStreak');
    expect(scope.highScore).toBe('highestStreak');
  });

  it("should keep high score readout as 'highestStreak' if name sort is activated after highest streak", function(){
    scope.order('highestStreak');
    scope.order('name');
    expect(scope.highScore).toBe('highestStreak');
  });

  it("should return no arrow for 'name' column if 'highest streak' is activated", function() {
    scope.order('highestStreak');
    expect(scope.getGlyph()).toBe("");
  });

  it("should return a down arrow if 'highest streak' is activated once", function() {
    scope.order('highestStreak');
    expect(scope.getGlyph('highestStreak')).toBe("glyphicon glyphicon-triangle-bottom");
  });

  it("should return an up arrow if 'highest streak' is activated twice", function() {
    scope.order('highestStreak');
    scope.order('highestStreak');
    expect(scope.getGlyph('highestStreak')).toBe("glyphicon glyphicon-triangle-top");
  });

  it("should return correct highest player information for hoops", function() {
    spyOn(user, "getUsers").and.returnValue(testUsers);
    scope.order('totalShots');
    expect(scope.printHighScore()).toBe("Highest score in 'hoops' is TEST1");
  });

  it("should return correct highest player information for longest streak", function() {
    spyOn(user, "getUsers").and.returnValue(testUsers);
    scope.order('highestStreak');
    expect(scope.printHighScore()).toBe("Highest score in 'longest streak' is TEST2");
  });

  it("should return correct highest player information for shootouts won", function() {
    spyOn(user, "getUsers").and.returnValue(testUsers);
    scope.order('shootOutsWon');
    expect(scope.printHighScore()).toBe("Highest score in 'shootouts won' is TEST3");
  });
});
