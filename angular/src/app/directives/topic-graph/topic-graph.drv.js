(function () {
  'use strict';

  angular.module('HackerNewCharts.drv.topicGraph')

  .directive('topicGraph', function ($compile, $timeout, ScraperService) {
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
  });
})();
