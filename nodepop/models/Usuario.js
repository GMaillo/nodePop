'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// definimos un esquema
const usuarioSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
}, { collection : 'usuarios' });

usuarioSchema.statics.hashPassword = function (plainPassword) {
    return bcrypt.hash(plainPassword, 10);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;