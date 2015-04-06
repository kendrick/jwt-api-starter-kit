(function () {
    'use strict';

    module.exports = function (router) {
        var authController = require('./controllers/auth');

        router.route('/auth')
            .post(authController.postAuth);
    };
})();