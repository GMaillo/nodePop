'use strict';
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {
    // GET /login
    index(req, res, next) {
        res.locals.email = '';
        res.locals.error = '';
        res.render('login');
    }

    // POST /login
    async post(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const usuario = await Usuario.findOne({ email: email });
            
            if (!usuario ||!await bcrypt.compare(password, usuario.password)) {
                res.locals.email = email;
                res.locals.error = res.__('Invalid credentials');
                res.render('login');
                return;
            }

            res.redirect('/anuncios');
        }catch (err) {
            next(err);
        }
    }

    async loginJWT(req, res, next) {
        try {
        const email = req.body.email;
        const password = req.body.password;

        const usuario = await Usuario.findOne({ email: email });

            if (!usuario ||!await bcrypt.compare(password, usuario.password)) {
                await res.json({success: false, error: res.__('Invalid credentials')});
                return;
            }

            const token = jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, {
                expiresIn: '2d'
            });

            res.json({success: true, token: token});

        } catch (e) {
            next(e);
        }
    }
}

module.exports = new LoginController();