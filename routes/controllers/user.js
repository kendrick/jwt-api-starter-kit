(function () {
    'use strict';

    var User = require('app/models/user');

    exports.postUser = function (req, res) {
        console.dir(req.body);
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

    exports.getUser = function (req, res) {
        User.findById(req.params.userId, function (err, user) {
            if (err) {
                res.send(err);
            }

            res.json(user);
        });
    };
})();