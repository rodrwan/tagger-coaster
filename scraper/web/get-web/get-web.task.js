'use strict';

// CONST, classes, task-name
var Yakuza, cheerio, natural, stopwords, _, getWeb;

Yakuza = require('yakuza');
cheerio = require('cheerio');
natural = require('natural');
stopwords = require('stopwords').english;
_ = require('lodash');
/**
 * Task GetShopLink of Bikes Agent.
 */
getWeb = Yakuza.task('WebScraper', 'GeneralWeb', 'GetWeb');

/**
 * Builder of Bikes task, this builder pass data from Job.
 */
getWeb.builder(function (job) {
  // pass the section to retrieve the corresponding url.
  return job.shared('GetLinks.links');
});

/**
 * Hook to make retries, modify data.
 */
getWeb.hooks({
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
getWeb.main(function (task, http, params) {
  var template, requestOpts, webUrl;

  template = http.optionsTemplate();
  webUrl = params;

  requestOpts = template.build({
    'url': webUrl
  });

  http.get(requestOpts).then(function (result) {
    var $, htmlToText, tokenizer, tokens, tokenCount, keysSorted, response, words, _min, _max,
      data;

    words = 10;
    data = {
      'url': webUrl,
      'words': {}
    };

    if (typeof result.body !== 'string') {
      task.success(data);
      return;
    }

    $ = cheerio.load(result.body, {
      'normalizeWhitespace': true
    });

    htmlToText = $('body').text().toLowerCase().replace(/[\W\s\d]/g, ' ').replace(/\s+/g, ' ');
    tokenizer = new natural.WordTokenizer();
    tokens = tokenizer.tokenize(htmlToText);

    tokens = _.filter(tokens, function (token) {
      return stopwords.indexOf(token) < 0;
    });

    tokenCount = _.countBy(tokens, function (n) {
      return n;
    });

    keysSorted = Object.keys(tokenCount).sort(function (a, b) {
      return tokenCount[a] - tokenCount[b];
    }).reverse();

    _max = keysSorted[0];
    _max = tokenCount[_max];
    _min = keysSorted[keysSorted.length - 1];
    _min = tokenCount[_min];

    response = {};
    _.times(words, function (n) {
      response[keysSorted[n].toString()] = tokenCount[keysSorted[n]];
      //parseFloat(((tokenCount[keysSorted[n]] - _min) / (_max - _min)).toFixed(2));
    });

    data.words = response;
    task.success(data);
  }).fail(function (err) {
    // Public final error to Yakuza.
    task.fail(err);
  }).done();
});
