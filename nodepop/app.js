var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var upload = multer({dest: 'public/images'});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images/anuncios/', express.static(path.join(__dirname, 'public/images')));


/**
 * Setup de i18n
 */
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

i18n.setLocale('en');


/**
 * Conexión con base de datos
 */
require('./lib/connectMongoose');
require('./models/Anuncio');


/**
 * Rutas de mi aplicación
 */
const loginController = require('./routes/LoginController');
app.use('/apiv1/anuncios', upload.single('foto'), require('./routes/apiv1/anuncios'));
app.post('/apiv1/login', loginController.loginJWT);


/**
 * Rutas app Web
 */
app.use('/',       require('./routes/index') );
app.use('/changeLocale', require('./routes/changeLocale'));

app.locals.title='NodePop';

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // comprobar error de validación
  if (err.array) { // error de validación
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPI(req) ?
    {message: 'Not valid', error: err.mapped()}:
    `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  if (isAPI(req)){
    res.json({success: false, error: err.message});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
