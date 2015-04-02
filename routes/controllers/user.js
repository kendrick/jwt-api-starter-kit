(function () {
    'use strict';

    var User = require('app/models/user');

    exports.postUser = function (req, res) {
        var user = new User();
        var DUPLICATE_KEY_ERROR = 11000;

        user.name     = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function (err) {
           if (err) {
               if (err.code == DUPLICATE_KEY_ERROR) {
                   return res.json({
                           success: false,
                           message: 'A user with that username already exists.'
                       });
               }
               else
               {
                   return res.json(err);
               }
           }
           else {
               res.json({ message: 'User created.' });
           }
        });
    };

    exports.getUsers = function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }

            res.json(users);
        });
    };

    exports.getUser = function (req, res) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                res.send(err);
            }

            res.json(user);
        });
    };

    exports.putUser = function (req, res) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                res.send(err);
            }

            // TODO: Replace prop-by-prop updates with something like this: http://stackoverflow.com/a/21269522
            if (req.body.name) {
                user.name = req.body.name;
            }

            if (req.body.name) {
                user.username = req.body.username;
            }

            if (req.body.password) {
                user.password = req.body.password;
            }

            user.save(function (err) {
                if (err) {
                   res.send(err);
                }

                res.json({ message: 'User updated.' });
            });
        });
    };

    exports.deleteUser = function (req, res) {
        User.remove(
            {
                _id: req.params.userId
            },
            function (err, user) {
                if (err) {
                    return res.send(err);
                }

                res.json({ message: 'User ' + req.params.userId + ' deleted.' });
            }
        );
    };
})();