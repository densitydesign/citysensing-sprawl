'use strict';

describe('Directive: geomap', function () {

  // load the directive's module
  beforeEach(module('cssprawlApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<geomap></geomap>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the geomap directive');
  }));
});
