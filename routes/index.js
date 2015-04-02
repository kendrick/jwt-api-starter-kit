(function () {
    'use strict';

    var router = require('express').Router();

    var routes = ['auth', 'users'];

    module.exports = function (config) {
        console.dir(config);

        routes.map(function (routeName) {
            require('./' + routeName)(router, config);
        });

        router.get('/', function (req, res) {
            res.json({ message: 'Routing works, but there\'s nothing useful at this endpoint.' });
        });

        return router;
    };
})();