(function () {
  'use strict';

  angular.module('HackerNewCharts.rte.topic', [
    'ui.router',
    'HackerNewCharts.svc.scraper'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('topic', {
      url: '/topic/:id',
      controller: 'TopiCtrl'
    });
  });
})();
