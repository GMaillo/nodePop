var express = require('express');
var router = express.Router();
const Anuncio = require ('../models/Anuncio');

const { query, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const name = req.query.name;
    const sale = req.query.sale;
    const price = req.query.price;
    const tags =  req.query.tags;
    const start = parseInt(req.query.start);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};

    if (name) {
      filter.name = name;
    }

    if (typeof price !== 'undefined') {
      filter.price = price;
    }

    if (tags) {
      filter.tags = tags;
    }
  
    const anuncios = await Anuncio.list({ filter: filter, start, limit, fields, sort });
    res.locals.results = anuncios;
    res.render('index');

  } catch (err) {
    next(err);
  }
});

router.get('/apiv1/anuncios?/tag/:tag/sale/:sale', (req, res, next) => {
  console.log('req.apiv1', req.apiv1);
  res.send('Ok');
  next();
});

module.exports = router;