'use strict';

var Yakuza;

Yakuza = require('yakuza');

// require agents
require('./web/web.agent');

Yakuza.scraper('WebScraper').routine('FirstRun', ['GetWeb']);
