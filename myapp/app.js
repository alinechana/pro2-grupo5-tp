var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session")

var indexRouter = require('./routes/index'); //los prefijos de las rutas van aca
var usersRouter = require('./routes/users');
let productRouter = require("./routes/product")


var app = express(); //funcion de alto nivel

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//middleware de config de session --> accion que se ejecuta entre el req y el res
app.use(session({
  secret: "FindsYCreate_base", 
  resave: false, 
  saveUninitialized: true}));

//middleware de poner session en locals --> lo que me va a permitir utilizar en las vistas
app.use(function (req, res, next) {
  if (req.session.user != undefined) {
    res.locals.user = req.session.user;
  }
  return next()
  });

//middleware de poner cookie en locals y en session
app.use(function (req, res, next) {
  if (req.cookies.user != undefined && req.session.user == undefined) {
    res.locals.user = req.cookies.user;
    req.session.user = req.cookies.user;
  }
  return next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/products", productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
