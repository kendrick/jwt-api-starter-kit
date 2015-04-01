(function () {
    'use strict';

    module.exports = function (router) {
        var userController = require('./controllers/user');

        router.route('/users')
            .post(userController.postUser)
        ;

        router.route('/users/:userId')
            .get(userController.getUser)
        ;
    };
})();