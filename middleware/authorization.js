(function () {
    'use strict';

    function mustBeSameUser(req, res, next) {
        // Make sure _id in token is same as req.params.userId

        next();
    }

    module.exports = {
        mustBeSameUser: mustBeSameUser
    }
})();