(function () {
  'use strict';

  describe('Scraper', function () {
    var Scraper, $httpBackend, dummyData;

    dummyData = [{
        url: "https://on.google.com/hub/",
        words: {
          onhub: 45,
          fi: 37,
          wi: 37,
          router: 14,
          smart: 13,
          antenna: 13,
          app: 12,
          devices: 12,
          google: 11,
          connection: 11
        }
      }, {
        url: "http://www.nature.com/news/registered-clinical-trials-make-positive-findings-vanish-1.18181",
        words: {
          nature: 34,
          research: 11,
          comments: 10,
          positive: 9,
          results: 9,
          august: 9,
          science: 9,
          study: 9,
          trial: 8,
          trials: 8
        }
      }];

    beforeEach(module('HackerNewCharts.svc.scraper'));
    beforeEach(inject(function (_$httpBackend_, _ScraperService_) {
      Scraper = _ScraperService_;
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it ('should Scraper not to be undefined', function () {
      Scraper.should.not.equal('undefined');
    });

    it ('should return a colection of topics', function () {
      var succeeded;

      $httpBackend
        .expectGET('/scrape')
        .respond(200, dummyData);

      Scraper
        .getList()
        .then(function (topics) {
          succeeded = topics;
        });

      $httpBackend.flush();
      succeeded.should.not.equal('undefined');
    });
  });
})();
