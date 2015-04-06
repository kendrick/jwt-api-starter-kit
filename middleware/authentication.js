(function () {
    'use strict';

    var authenticationHelper = require('root/common/authenticationHelper.js');

    function verifyToken(req, res, next) {
        var token = req.body.token || req.params.token || req.headers['x-access-token'];

        if (token) {
            authenticationHelper.verifyToken(token, function (err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                }
                else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }

    module.exports = {
       verifyToken: verifyToken
    }
})();