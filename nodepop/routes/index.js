var express = require('express');
var router = express.Router();
const Anuncio = require ('../models/Anuncio');

const { query, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tags =  req.query.tags;
    const start = parseInt(req.query.start);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;

    const filter = {};

    if(nombre) {
      filter.nombre = new RegExp('^' + nombre, "i");
  }
  if (tags) {
      filter.tags = {'$all': [tags]};
  }
  if (typeof precio !== 'undefined') {
      if (precio[0] === '-') {
          filter.precio = {'$lte': Math.abs(parseInt(precio))};
      } else if (precio[precio.length - 1] === '-'){
          filter.precio = {'$gte': parseInt(precio)};
      } else if (precio.indexOf('-') > 0 && precio.indexOf('-') < precio.length - 1){
          let precio1 = precio.substring(0, precio.indexOf('-'));
          let precio2 = precio.substring(precio.indexOf('-') + 1 , precio.length);
          filter.precio = {'$gte': parseInt(precio1), '$lte': parseInt(precio2)};
      } else {
          filter.precio = precio;
      }
  }
  if(venta) {
      filter.venta = venta;
  }
  res.locals.anuncios = await Anuncio.list({filter: filter, limit, start, sort});
  res.render('index');
}catch (e) {
  next(e);
}
});

module.exports = router;