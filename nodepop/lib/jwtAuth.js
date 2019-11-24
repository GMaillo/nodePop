  'use strict';

const jwt = require('jsonwebtoken');

module.exports = function () {
    return function (req, res, next) {
        const token = req.body.token  || req.query.token ||  req.get('Authorization');

        if(!token) {
            const e = new Error('No token provided');
            e.status = 401;
            next(e);
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET, (e, payload) => {
            if(e) {
                e.status = 401;
                next(e);
                return;
            }
            req.apiUserId = payload._id;
            next();
        });
    }
};