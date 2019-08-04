'use strict';

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    img: String,
    tags: [String]
});

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