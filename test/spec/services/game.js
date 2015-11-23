'use strict';

describe('Service: game', function () {

  // load the service's module
  beforeEach(module('bballApp'));

  // instantiate service
  var game,
    q,
    testUsers;


  beforeEach(inject(function (_game_, $q) {
    game = _game_;
    q = $q;
    testUsers = [
      [{username: "test1"}, 0],
      [{username: "test2"}, 0],
      [{username: "test3"}, 0]
    ];
  }));

  it('should do something', function () {
    expect(!!game).toBe(true);
  });

  it('should add player with goals set to zero if player is valid', function () {

  });

  it('should not add player if player is already in game', function () {

  });

  it('should not add player if player field is blank', function () {

  });

  // The splice function in arrays was being difficult, so I am including two remove player tests
  // for the first and second players
  it('should remove only first player when remove first player link is clicked', function() {

  });

  it('should remove only second player when remove second player link is clicked', function() {

  });

  it('should increase number of goals required when increment goals button is pushed', function () {

  });

  it('should decrease number of goals required when decrement goals button is pushed', function () {

  });

  it('should not be able to decrease number of goals required below one', function () {

  });

  it('should not be able to start a shootout with only zero or one players', function () {

  });

  it('should redirect to shootout game page when new game is confirmed and all' +
    'data should persist between pages', function () {

  });

  it('should increment players goal count and move to next player when goal' +
    'button is pushed', function () {

  });

  it('should not increment players goal count, but should move to next player' +
    'when miss button is pushed', function () {

  });

  it('should change winner state and increment players shootouts won count when' +
    'player reaches goal', function () {

  });

});
