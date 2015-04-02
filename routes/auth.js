(function () {
    'use strict';

    module.exports = function (router, config) {
        var authController = require('./controllers/auth');

        authController.init(config.jwtSecret);

        router.route('/auth')
            .post(authController.postAuth);
    };
})();