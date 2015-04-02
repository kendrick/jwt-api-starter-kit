(function () {
    'use strict';

    var User = require('app/models/user');
    var jwt  = require('jsonwebtoken');
    var jwtSecret = '';

    exports.init = function (jwts) {
        jwtSecret = jwts;
    };

    exports.postAuth = function (req, res) {
        var EXPIRES_IN_MINUTES = 60 * 24 * 180;

        User.findOne({
                username: req.body.username
            })
            .select('name username password')
            .exec(function (err, user) {
                if (err) {
                    throw err;
                }

                if (!user) {
                    res.json({
                        success: false,
                        message: 'Authentication failed: No such user.'
                    })
                }
                else if (user) {
                    var validPassword = user.comparePassword(req.body.password);

                    if (!validPassword) {
                        res.json({
                            success: false,
                            message: 'Authentication failed: Wrong password.'
                        });
                    }
                    else {
                        var token = jwt.sign(
                            {
                                name: user.name,
                                username: user.username
                            },
                            jwtSecret,
                            {
                                expiresInMinutes: EXPIRES_IN_MINUTES
                            }
                        );

                        res.json(
                            {
                                success: true,
                                message: 'Authentication successful.',
                                token:   token
                            }
                        );
                    }
                }
            });
    };
})();