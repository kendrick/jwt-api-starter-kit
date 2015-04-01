(function () {
    'use strict';

    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var morgan = require('morgan');
    var mongoose = require('mongoose');
    var port = process.env.PORT || 8080;
    var argv = process.argv.slice(2);
    var env  = argv[0] || 'dev';
    var config = require('./config')[env];

    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
        next();
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(morgan('dev'));

    mongoose.connect(config.databaseUri);

    var apiRouter = require('./routes');
    app.use('/api', apiRouter);
    app.listen(port);
    console.log('Listening on port ' + port);
})();