'use strict';

// CONST, classes, task-name
var Yakuza, cheerio, _, getLinks;

Yakuza = require('yakuza');
cheerio = require('cheerio');
_ = require('lodash');

/**
 * Task GetShopLink of Bikes Agent.
 */
getLinks = Yakuza.task('WebScraper', 'GeneralWeb', 'GetLinks');

/**
 * Builder of Bikes task, this builder pass data from Job.
 */
getLinks.builder(function (job) {
  // pass the section to retrieve the corresponding url.
  return job.params.url;
});

/**
 * Hook to make retries, modify data.
 */
getLinks.hooks({
  // if something fail, make 3 retries.
  'onFail': function (task) {
    // 3 retries, then stop.
    if (task.runs === 3) {
      return;
    }
    task.rerun();
  }
});
/**
 * Main function, here we write the code to extract, in this case,
 * shop link.
 */
getLinks.main(function (task, http, params) {
  var template, requestOpts, baseUrl;

  template = http.optionsTemplate();
  baseUrl = params;
  requestOpts = template.build({
    'url': baseUrl
  });

  http.get(requestOpts).then(function (result) {
    var $, $trs, $table, links;

    links = [];
    $ = cheerio.load(result.body, {
      'normalizeWhitespace': true
    });

    $table = $('table#hnmain');
    $table = $($table).find('tr:nth-child(3) > td');
    $ = cheerio.load($($table).html());
    $trs = $('tr');

    _.each($trs, function (tr) {
      var lenTd, href;

      lenTd = $(tr).find('td').length;
      if (lenTd === 3) {
        href = $(tr).find('td:nth-child(3) a').attr('href');
        if (_.contains(href, 'item?id')) {
          href = baseUrl + href;
        }

        links.push(href);
      }
    });

    task.share('links', links);
    task.success(links);
  }).fail(function (err) {
    // Public final error to Yakuza.
    task.fail(err);
  }).done();
});
