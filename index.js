'use strict';

var Yakuza, _, colors, Hapi, dotenv, fs, params, job, _topics, server;

// here, require the scrapers
require('./scraper/web.scraper');

dotenv = require('dotenv');
fs = require('fs');
Yakuza = require('yakuza');
_ = require('lodash');
colors = require('colors');
Hapi = require('hapi');

if (fs.existsSync('.env')) {
  dotenv.load();
}

// tools for debug
colors.setTheme({
  'silly': 'rainbow',
  'input': 'grey',
  'verbose': 'cyan',
  'prompt': 'grey',
  'info': 'green',
  'data': 'grey',
  'help': 'cyan',
  'warn': 'yellow',
  'debug': 'blue',
  'error': 'red'
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// section can be: bikes or mx
params = {
  'url': 'https://news.ycombinator.com/'
};

// Scraper, Agent, Options
job = Yakuza.job('WebScraper', 'GeneralWeb', params);

job.routine('FirstRun');

job.on('job:fail', function (res) {
  console.log('Something failed'.error);
  console.log('Error is: '.error);
  console.log('Cannot load web site.');
  console.log(res.task._params);
  console.log(res);
});

_topics = [];

job.on('task:GetWeb:success', function (task) {
  _topics.push(task.data);
});

job.on('job:finish', function () {
  console.log('job finish');
});
console.log('getting topics...');
job.run();

server = new Hapi.Server();
server.connection({
    'host': '0.0.0.0',
    'port': process.env.PORT,
    'routes': {
      'cors': true
    }
});

server.route({
  'method': 'GET',
  'path': '/api/get-topics',
  'handler': function (request, reply) {
    reply({
          'data': _topics
    }).header('Content-Type', 'application/json');
  }
});
server.route({
  'method': 'GET',
  'path': '/api/get-topics/{id}',
  'handler': function (request, reply) {
    if (request.params.id) {
      reply({
            'data': _topics[parseInt(request.params.id, 10) - 1]
      }).header('Content-Type', 'application/json');
    }
  }
});

console.log('Listening on port: ' + process.env.PORT);
// Start the server
server.start();
