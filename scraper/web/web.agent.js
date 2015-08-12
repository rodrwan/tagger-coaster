'use strict';

var Yakuza;

Yakuza = require('yakuza');

// require tasks
require('./get-web/get-web.task');
require('./get-links/get-links.task');

Yakuza.agent('WebScraper', 'GeneralWeb')
  .plan(['GetLinks', 'GetWeb'])
  .routine('FirstRun', ['GetLinks', 'GetWeb']);
