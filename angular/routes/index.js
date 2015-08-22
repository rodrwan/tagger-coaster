'use strict';

var express, router, base;

express = require('express');
router = express.Router();
base = process.env.PWD;

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile(base + '/public/index.html');
});

module.exports = router;
