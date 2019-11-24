'use strict';

const conn = require('./lib/connectMongoose');
const Anuncio = require('./models/Anuncio');
const Usuario = require('./models/Usuario');

const dataAnuncios = require('./data/anuncios.json');

conn.once('open', async () => {
    try {
        
        await Anuncio.deleteMany();
        await Anuncio.insertMany(dataAnuncios.anuncios);
        await initUsuarios();
        await conn.close();
    } catch (err) {
        console.log('Error!:', err);
    }

});

async function initUsuarios() {
    await Usuario.deleteMany();
    await Usuario.insertMany([
        {
            email: 'user@example.com',
            password: await Usuario.hashPassword('1234')
        }
    ]);
}