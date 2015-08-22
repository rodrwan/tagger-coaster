(function () {
  'use strict';

  angular.module('HackerNewCharts.rte.home', [
    'HackerNewCharts.drv.topicList',
    'HackerNewCharts.drv.topicGraph'
  ])

  .config(function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      controller: 'AppCtrl',
      templateUrl: 'app/routes/home/home.html'
    });
  });

})();
