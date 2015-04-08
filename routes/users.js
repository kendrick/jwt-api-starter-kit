(function () {
    'use strict';

    module.exports = function (router) {
        var userController = require('./controllers/user');
        var authenticationMw = require('root/middleware/authentication');
        var authorizationMw = require('root/middleware/authorization');

        router.route('/me')
            .get(userController.getMe);

        router.route('/users')
            .post(userController.postUser)
            .get(
                authenticationMw.verifyToken,
                userController.getUsers
            )
        ;

        router.use('/users/:userId', authenticationMw.verifyToken);
        router.route('/users/:userId')
            .get(userController.getUser)
            .put(
                authorizationMw.mustBeSameUser,
                userController.putUser
            )
            .delete(
                authorizationMw.mustBeSameUser,
                userController.deleteUser
            )
        ;
    };
})();