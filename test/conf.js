// Tests for the calculator.
exports.config = {
  directConnect: true,

  framework: 'jasmine2',

  //baseUrl: 'http://localhost:9010',

  specs: [
    'spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  }
};
