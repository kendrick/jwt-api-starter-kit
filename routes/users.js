(function () {
    'use strict';

    module.exports = function (router) {
        var userController = require('./controllers/user');

        router.route('/users')
            .post(userController.postUser)
            .get(userController.getUsers)
        ;

        router.route('/users/:userId')
            .get(userController.getUser)
            .put(userController.putUser)
            .delete(userController.deleteUser)
        ;
    };
})();