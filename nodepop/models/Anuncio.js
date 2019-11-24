'use strict';

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: { type: String, index: true },
    venta: { type: Boolean, index: true },
    precio: { type: Number, index: true },
    foto: String,
    tags: { type: [String], index: true }
}, { collection : 'anuncios' });


anuncioSchema.statics.list = function({filter, start, limit, fields, sort}) {
    const query = Anuncio.find(filter);
    query.skip(start);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec(); 

}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;