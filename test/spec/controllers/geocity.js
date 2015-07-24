'use strict';

describe('Controller: GeocityCtrl', function () {

  // load the controller's module
  beforeEach(module('cssprawlApp'));

  var GeocityCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GeocityCtrl = $controller('GeocityCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
