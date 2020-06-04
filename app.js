require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
var passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
const Twig = require('twig')
// const hotMiddleware = require('./lib/hot');

const app = express();
app.set('port', process.env.PORT || 3000);

Twig.cache(false);

global.APP = {};
global.APP.server = http.createServer(app);

require('./app/init')(global.APP, app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// if (process.env.NODE_ENV === 'development') app.use(hotMiddleware);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.on('ready', function() {
  app.use(session({
    store: new RedisStore({ client: global.APP.redis }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
  
  require('./app/auth/passport')(app);
  app.use(passport.initialize());
  app.use(passport.session());
  var authRouter = require('./app/routes/auth');
  var indexRouter = require('./app/routes/index');
  var usersRouter = require('./app/routes/users');
  var appRouter = require('./app/routes/app');

  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/users', usersRouter);
  app.use('/app', appRouter);

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
});

module.exports = app;
