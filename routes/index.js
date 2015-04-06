(function () {
    'use strict';

    var router = require('express').Router();

    var routes = ['auth', 'users'];

    module.exports = function () {
        routes.map(function (routeName) {
            require('./' + routeName)(router);
        });

        router.get('/', function (req, res) {
            res.json({ message: 'Routing works, but there\'s nothing useful at this endpoint.' });
        });

        return router;
    };
})();