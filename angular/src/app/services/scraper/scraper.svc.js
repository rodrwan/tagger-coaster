(function () {
  'use strict';

  angular.module('HackerNewCharts.svc.scraper')
  .factory('ScraperService', function (Restangular) {
    return Restangular.service('scrape');
  });

})();
