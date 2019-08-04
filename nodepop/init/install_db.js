'use strict';

const conn = require('../lib/connectMongoose');

const Anuncio = require('../models/Anuncio');


conn.once('open', async () => {
    try {
        const data = require('../init/anuncios.json');
        
        // Borramos todos los documentos
        await Anuncio.deleteMany({}).catch(err => {
            throw new Error(err);
        });
        console.info('Removed all the data from database.');

        // Insertamos documentos del json
        await Anuncio.insertMany(data).catch(err => {
            throw new Error(err);
        });
        console.info('Inserted all the data into database.');

        conn.close();
        console.info('Connection with database closed.');
    } catch(err) {
        console.error('There was an error executing the script', err);
        
        conn.close();
        console.info('Connection with database closed.');
    }
});