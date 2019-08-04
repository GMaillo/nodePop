'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

router.get('/', async (req, res, next) =>{
    try{
        const name = req.query.name;
        const price = req.query.price;
        const tags = req.query.tags;
        const sale = req.query.sale;

        const start = parseInt(req.query.start) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const fields = req.query.fields;
        const sort = req.query.sort;

        const filter = {};

        if (name) {
            filter.name = new RegExp('^' + req.query.name + '.*', 'i');
        }

        if (price) {

            let rank = req.query.price.split('-');

            if (rank.length === 1) {
                filter.price = rank[0];
            }
            else if (rank.length === 2) {
                if (!rank[0]) {
                    filter.price = { $lt: rank[1] };
                }
                else if (!ranl[1]) {
                    filter.price = { $gt: rank[0] };
                }
                else {
                    filter.price = { $gte: rank[0], $lte: rank[1] };
                }
            }
        }


        if (tags) {
            if (tags.includes(tags) === true) {
                filter.tags = tags;
            }
        }

        if (typeof sale !== 'undefined') {

            filter.sale = sale;

        }

        const anuncios = await Anuncio.list({ filter: filter, start, limit, fields, sort });

        res.json({ success: true, anuncios: anuncios });
    } catch (err) {
        next(err);
    }
});

/**
 * GET tags de los anuncios
 */

router.get('/tags', async function (req, res, next) {
    try {
        const tags = req.params.tags;

        const anuncio = await Anuncio.distinct('tags').exec();

        if (!anuncio) {
            res.status(404).json({ success: false });
            return;
        }

        res.json({ success: true, result: anuncio });

    } catch (err) {
        next(err);
    }
});

/**
 * POST creamos un anuncio
 */

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const data = req.body;

        const anuncio = new Anuncio(data); 

        const anuncioSave = await anuncio.save()

        res.json({ success: true, result: anuncioSave });
    } catch (err) {
        next(err);
    }
});

/**
 * PUT / :id de los anuncios
 */
router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const data = req.body;
        const anuncioSave = await Anuncio.findOneAndUpdate({ _id: _id }, data, { new: true }).exec();
        res.json({ success: true, result: anuncioSave });
    } catch (err) {
        next(err);

    }
})

/**
 * DELETE / para eliminar un anuncio
 */

router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;

        await Anuncio.deleteOne({ _id: _id }).exec();
        res.json({ success: true });

    } catch (err) {
        next(err);
    }
})


module.exports = router;