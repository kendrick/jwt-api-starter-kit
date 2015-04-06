(function () {
    'use strict';

    var jwt  = require('jsonwebtoken');
    var config = require('root/config')();

    exports.getToken = function (contents) {
        return jwt.sign(
            contents,
            config.jwtSecret,
            {
                expiresInMinutes: config.tokenExpirationInMinutes
            }
        );
    };

    exports.verifyToken = function (token, callback) {
        jwt.verify(token, config.jwtSecret, callback);
    };
})();