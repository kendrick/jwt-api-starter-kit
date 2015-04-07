(function () {
    'use strict';

    module.exports = function (router) {
        var userController = require('./controllers/user');
        var authMw = require('root/middleware/authentication');

        router.route('/me')
            .get(userController.getMe);

        router.route('/users')
            .post(userController.postUser)
            .get(
                function (req, res, next) { return authMw.verifyToken(req, res, next); },
                userController.getUsers
            )
        ;

        router.use('/users/:userId', authMw.verifyToken);
        router.route('/users/:userId')
            .get(userController.getUser)
            .put(userController.putUser)
            .delete(userController.deleteUser)
        ;
    };
})();