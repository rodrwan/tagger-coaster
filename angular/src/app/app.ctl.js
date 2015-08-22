(function () {
  'use strict';

  angular.module('HackerNewCharts')

  .controller('AppCtrl', function ($scope, store, ScraperService) {
    ScraperService.getList().then(function (topics) {
      $scope.topics = topics;
    });
  });
})();
