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
    expect(scope.getHighScoreName()).toContain("TEST1");
  });

  it("should return correct highest player information for longest streak", function() {
    fakeUpdateUsers();
    scope.order('highestStreak');
    expect(scope.getHighScoreName()).toContain("TEST2");
  });

  it("should return correct highest player information for shootouts won", function() {
    fakeUpdateUsers();
    scope.order('shootoutsWon');
    expect(scope.getHighScoreName()).toContain("TEST3");
  });

  it('should return empty string if user is not logged in', function () {
    spyOn(user, "isLoggedOn").and.returnValue(false);
    expect(scope.matchActiveRow("Bob")).toBe("");
  });

  it('should return empty string if user is logged in but does not match this user', function () {
    spyOn(user, "isLoggedOn").and.returnValue(true);
    spyOn(user, "currentUser").and.returnValue({username: "Alice"});
    expect(scope.matchActiveRow({username: "Bob"})).toBe("");
  });

  it('should return "info" if user is logged in and does match this user', function () {
    spyOn(user, "isLoggedOn").and.returnValue(true);
    spyOn(user, "currentUser").and.returnValue({username: "Bob"});
    expect(scope.matchActiveRow({username: "Bob"})).toBe("info");
  });
});
