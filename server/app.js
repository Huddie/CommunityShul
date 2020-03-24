var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var cookieSession = require('cookie-session')
var index = require('./routes/index');
var shiurim = require('./routes/shiurim');
var add = require('./routes/add');
var cors = require('cors')
var mysql = require('mysql');
var expressSanitizer = require('express-sanitizer');
var app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(cors())
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var logger1 = function(req, res, next) {
  console.log("GOT REQUEST !");
  next(); // Passing the request to the next handler in the stack.
}

app.use(logger1);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSanitizer());
app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'ehud',
    database : 'communityshiur',
    password : process.env.DB_PASSWORD
  });
  res.locals.connection.connect();
  next();
});
app.use('/', index);
app.use('/shiurim', shiurim);
app.use('/add', add);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var server = http.createServer(app).listen(4000, function() {
  console.log('And were off...');
});
