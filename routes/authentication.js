(function () {
    'use strict';

    module.exports = function (router) {
        var authController = require('./controllers/authentication');

        router.route('/auth')
            .post(authController.postAuth);
    };
})();