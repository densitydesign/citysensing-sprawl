'use strict';

describe('Directive: timelinetweets', function () {

  // load the directive's module
  beforeEach(module('cssprawlApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<timelinetweets></timelinetweets>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the timelinetweets directive');
  }));
});
