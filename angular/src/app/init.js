(function () {
'use strict'

 angular.module('HackerNewCharts', ['ui.router', 'angular-storage', 'angular-cache', 'ngAnimate', 'restangular', 'flash', 'HackerNewCharts.rte.home'])

.constant('SCRAPER_API_URL', 'http://localhost:8000/api')

; })();