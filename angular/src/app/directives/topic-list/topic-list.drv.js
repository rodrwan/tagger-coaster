(function () {
  'use strict';

  angular.module('HackerNewCharts.drv.topicList')

  .directive('topicList', function (ScraperService) {
    return {
      restrict: 'E',
      controller: function ($rootScope, $scope) {
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
      },
      templateUrl: 'app/directives/topic-list/topic-list.html'
    };
  });

})();
