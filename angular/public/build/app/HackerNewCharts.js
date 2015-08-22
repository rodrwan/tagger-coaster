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

  .config(['SCRAPER_API_URL', '$stateProvider', '$urlRouterProvider', 'CacheFactoryProvider', 'RestangularProvider', '$mdThemingProvider', function (SCRAPER_API_URL, $stateProvider, $urlRouterProvider, CacheFactoryProvider, RestangularProvider, $mdThemingProvider) {
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
  }])

  .run(['$rootScope', '$state', 'store', function ($rootScope, $state, store) {

  }]);

})();

(function () {
  'use strict';

  angular.module('HackerNewCharts')

  .controller('AppCtrl', ['$scope', 'store', 'ScraperService', function ($scope, store, ScraperService) {
    ScraperService.getList().then(function (topics) {
      $scope.topics = topics;
    });
  }]);
})();

(function () {
'use strict'

 angular.module('HackerNewCharts.config', [])

.constant('SCRAPER_API_URL', 'http://localhost:8000/api')

; })();
(function () {
  'use strict';

  angular.module('HackerNewCharts.rte.home', [
    'HackerNewCharts.drv.topicList',
    'HackerNewCharts.drv.topicGraph'
  ])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/',
      controller: 'AppCtrl',
      templateUrl: 'app/routes/home/home.html'
    });
  }]);

})();

(function () {
  'use strict';

  angular.module('HackerNewCharts.rte.topic', [
    'ui.router',
    'HackerNewCharts.svc.scraper'
  ])

  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('topic', {
      url: '/topic/:id',
      controller: 'TopiCtrl'
    });
  }]);
})();

(function () {
  'use strict';

  angular.module('HackerNewCharts.rte.home')

  .controller('HomeController', function () {

  });

})();

(function () {
  'use strict';

  angular.module('HackerNewCharts.rte.topic')

  .controller('TopiCtrl', ['$stateParams', 'ScraperService', function ($stateParams, ScraperService) {
    console.log($stateParams.id);
  }]);
})();

(function () {
  'use strict';

  angular.module('HackerNewCharts.drv.topicGraph', [
    'HackerNewCharts.svc.scraper'
  ]);

})();

(function () {
  'use strict';

  angular.module('HackerNewCharts.drv.topicList', [
    'HackerNewCharts.svc.scraper'
  ]);

})();

(function () {
  'use strict';

  angular.module('HackerNewCharts.drv.topicGraph')

  .directive('topicGraph', ['$compile', '$timeout', 'ScraperService', function ($compile, $timeout, ScraperService) {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/topic-graph/topic-graph.html',
      scope: {
        topic: '='
      },
      compile: function compile (tElement) {
        var directiveHtml, element, url, word, categories, words;

        directiveHtml = '<highchart config="chartConfig"></highchart>';
        element = tElement.children().html(directiveHtml);

        return {
          pre: function preLink ($scope) {
            $scope.chartConfig = {};
            ScraperService.getList().get($scope.topic).then(function (newTopic) {
              words = [];
              categories = [];
              url = newTopic.url;

              $scope.chartConfig = {
                chart: {
                    type: 'column'
                },
                title: {
                   text: '10 most frequent words in:'
                },
                subtitle: {
                  useHTML: true,
                  text: '<a href="' + url + '" target="_blank">' + url + '</a>',
                  style: {
                    color: '#555555',
                    fontWeight: 'bold',
                    textDecoration: 'none'
                  }
                },
                xAxis: {
                  categories: categories,
                  gridLineWidth: 1,
                  type: 'category'
                },
                yAxis: {
                  min: 0,
                  max: 100,
                  title: {
                    text: 'Word count in current topic'
                  }
                },
                legend: {
                  enabled: false
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span> appear: <b>{point.y}</b><br/>'
                },
                series: [{
                  name: 'Words',
                  borderWidth: 0,
                  colorByPoint: true,
                  data: words,
                  dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                  }
                }]
              };

              for (word in newTopic.words) {
                categories.push(word);
                words.push({
                  name: word,
                  y: newTopic.words[word]
                });
              }

              $scope.chartConfig.series[0].data = words;
              $scope.chartConfig.xAxis.categories = categories;
            });

            $scope.$on('newTopic', function (e, newTopic) {
              $scope.topic = newTopic;
              words = [];
              categories = [];
              url = newTopic.url;

              $scope.chartConfig = {
                chart: {
                    type: 'column'
                },
                title: {
                   text: '10 most frequent words in:'
                },
                subtitle: {
                  useHTML: true,
                  text: '<a href="' + url + '" target="_blank">' + url + '</a>',
                  style: {
                    color: '#555555',
                    fontWeight: 'bold',
                    textDecoration: 'none'
                  }
                },
                xAxis: {
                  categories: categories,
                  gridLineWidth: 1,
                  type: 'category'
                },
                yAxis: {
                  min: 0,
                  max: 100,
                  title: {
                    text: 'Word count in current topic'
                  }
                },
                legend: {
                  enabled: false
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span> appear: <b>{point.y}</b><br/>'
                },
                series: [{
                  name: 'Words',
                  borderWidth: 0,
                  colorByPoint: true,
                  data: words,
                  dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                  }
                }]
              };

              for (word in newTopic.words) {
                categories.push(word);
                words.push({
                  name: word,
                  y: newTopic.words[word]
                });
              }

              $scope.chartConfig.series.data = words;
              $scope.chartConfig.xAxis.categories = categories;
            });
          },
          post: function postLink ($scope) {
            $compile(element)($scope);
          }
        };
      }
    };
  }]);
})();

(function () {
  'use strict';

  angular.module('HackerNewCharts.drv.topicList')

  .directive('topicList', ['ScraperService', function (ScraperService) {
    return {
      restrict: 'E',
      controller: ['$rootScope', '$scope', function ($rootScope, $scope) {
        var Topics = ScraperService.getList();

        Topics.then(function (topics) {
          $scope.topics = topics;
          $rootScope.$broadcast('newTopic', $scope.topics[0]);
        });

        $scope.getTopic = function (id) {
          ScraperService.getList().get(id).then(function (result) {
            $rootScope.$broadcast('newTopic', result);
          });
        };
      }],
      templateUrl: 'app/directives/topic-list/topic-list.html'
    };
  }]);

})();

(function () {
  'use strict';

  angular.module('HackerNewCharts.svc.scraper', [
    'restangular'
  ]);

})();

(function () {
  'use strict';

  angular.module('HackerNewCharts.svc.scraper')
  .factory('ScraperService', ['Restangular', function (Restangular) {
    return Restangular.service('scrape');
  }]);

})();
