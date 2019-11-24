'use strict';

const jimp = require('jimp');
const cote = require('cote');
const responder = new cote.Responder({ name: 'Thumbnail Service'});

responder.on('transform', (req, done) => {
    jimp.read(req.path, (err, img) =>{
        if(err){
            throw err;
        }
        img.resize(100, 100)
        .quality(100)
        .write(req.destination + `/${req.filename}_thumbnail.jpg`);
    });
});