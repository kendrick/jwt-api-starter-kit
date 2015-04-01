(function () {
    'use strict';

    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var morgan = require('morgan');
    var mongoose = require('mongoose');
    var port = process.env.PORT || 8080;

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
        next();
    });

    app.use(morgan('dev'));

    app.get('/', function (req, res) {
        res.send('Got /.');
    });

    var apiRouter = express.Router();
    apiRouter.get('/', function (req, res) {
        res.json({message: 'Got /api.'});
    });

    app.use('/api', apiRouter);

    app.listen(port);
    console.log('Listening on port ' + port);
})();