'use strict';

describe('Controller: NetworkexpoCtrl', function () {

  // load the controller's module
  beforeEach(module('cssprawlApp'));

  var NetworkexpoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NetworkexpoCtrl = $controller('NetworkexpoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
