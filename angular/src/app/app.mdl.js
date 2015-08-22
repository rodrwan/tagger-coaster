(function () {
  'use strict';

  angular.module('HackerNewCharts', [
    'ui.router',
    'angular-storage',
    'angular-cache',
    'ngAnimate',
    'restangular',
    'flash',
    'highcharts-ng',
    'ngMaterial',
    'HackerNewCharts.config',
    'HackerNewCharts.rte.home',
    'HackerNewCharts.rte.topic'
  ])

  .config(function (SCRAPER_API_URL, $stateProvider, $urlRouterProvider, CacheFactoryProvider, RestangularProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('orange');
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
      url: '/',
      controller: 'AppCtrl',
      templateUrl: 'app/routes/home/home.html'
    });
    angular.extend(CacheFactoryProvider.defaults, {
      maxAge: 15 * 60 * 1000
    });

    RestangularProvider.setBaseUrl(SCRAPER_API_URL);
    RestangularProvider.setDefaultHttpFields({
      cache: true
    });

    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
      var extractedData;

      // .. to look for getList operations
      if (operation === 'getList') {
        // .. and handle the data and meta data

        extractedData = data.data;
        extractedData.error = data.error;
        extractedData.paging = data.paging;
      } else {
        extractedData = data.data;
      }
      return extractedData;
    });
  })

  .run(function ($rootScope, $state, store) {

  });

})();
