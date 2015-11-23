'use strict';

describe('Controller: ScoreTableCtrl', function () {

  // load the controller's module
  beforeEach(module('bballApp'));

  var ScoreTableCtrl,
    scope,
    q,
    user,
    location;


  // Initialize the controller and a mock scope
  beforeEach(inject(function (_user_, $controller, $rootScope, $q, $location) {
    scope = $rootScope.$new();
    q = $q;
    location = $location;
    user = _user_;
    ScoreTableCtrl = $controller('ScoreTableCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  var usersPromise = function(resolve){
    var defer = q.defer();
    if (resolve) {
      defer.resolve(testUsers);
    }
    else {
      defer.reject("Error message");
    }
    return defer.promise;
  };

  var fakeUpdateUsers = function () {
    scope.users = testUsers;
  };

  var testUsers = [{
    username: 'test1',
    totalHoops: 100,
    highestStreak: 0,
    shootoutsWon: 0
  },
    {
      username: 'test2',
      totalHoops: 0,
      highestStreak: 100,
      shootoutsWon: 0
    },
    {
      username: 'test3',
      totalHoops: 0,
      highestStreak: 0,
      shootoutsWon: 100
    }];


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
    fakeUpdateUsers();
    scope.order('totalHoops');
    expect(scope.getHighScoreText()).toContain("TEST1");
  });

  it("should return correct highest player information for longest streak", function() {
    fakeUpdateUsers();
    scope.order('highestStreak');
    expect(scope.getHighScoreText()).toContain("TEST2");
  });

  it("should return correct highest player information for shootouts won", function() {
    fakeUpdateUsers();
    scope.order('shootoutsWon');
    expect(scope.getHighScoreText()).toContain("TEST3");
  });
});
