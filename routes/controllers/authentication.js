(function () {
    'use strict';

    var User = require('app/models/user');
    var authenticationHelper = require('root/common/authenticationHelper');

    exports.postAuth = function (req, res) {
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
                        // TODO: Abstract payload creation into an authorization helper
                        var payload = {
                            name: user.name,
                            username: user.username
                        };

                        var token = authenticationHelper.getToken(payload);

                        res.json(
                            {
                                success: true,
                                message: 'Authentication successful.',
                                token:   token
                            }
                        );
                    }
                }
            })
        ;
    };
})();