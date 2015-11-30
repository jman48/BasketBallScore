'use strict';

describe('protractor test', function() {

  beforeEach(function () {
    browser.get('http://localhost:9010');
  });

  //helper functions to set up and delete a couple of new players
  var addPlayers = function() {
    element(by.id('register')).click();
    element(by.model('entername')).sendKeys('player1');
    element(by.id('submit')).click();
    element(by.id('register')).click();
    element(by.model('entername')).sendKeys('player2');
    element(by.id('submit')).click();
  };

  var deletePlayers = function () {
    element(by.id('login')).click();
    element(by.model('entername')).sendKeys('player1');
    element(by.id('submit')).click();
    element(by.id('dropdown')).click();
    element(by.id('delete')).click();
    element(by.id('confirm')).click();
    element(by.id('login')).click();
    element(by.model('entername')).sendKeys('player2');
    element(by.id('submit')).click();
    element(by.id('dropdown')).click();
    element(by.id('delete')).click();
    element(by.id('confirm')).click();
  };

  it('should go to player registration page when "register"" is pushed', function () {
    element(by.id('register')).click();
    element(by.model('entername')).sendKeys('Dave');
    element(by.id('submit')).click();
    expect(element(by.binding('errorMessage')).getText()).
    toEqual('Username is already taken');
  });

  it('should create two players, start a shootout with them, increment' +
    'the shootout score of the winner and then delete them', function () {

    addPlayers();

    element(by.id('setup')).click();
    element(by.model('entername')).sendKeys('player1');
    element(by.id('submit')).click();
    element(by.model('entername')).sendKeys('player2');
    element(by.id('submit')).click();
    element(by.id('lessRounds')).click();
    element(by.id('lessRounds')).click();
    element(by.id('lessRounds')).click();
    element(by.id('start')).click();

    element(by.id('hit')).click();
    element(by.id('hit')).click();
    expect(element(by.binding('getWinner()')).getText()).
    toEqual('');

    element(by.id('miss')).click();
    element(by.id('miss')).click();
    expect(element(by.binding('getWinner()')).getText()).
    toEqual('');

    element(by.id('hit')).click();
    expect(element(by.binding('getWinner()')).getText()).
    toEqual('PLAYER1');

    deletePlayers();
  });
});
