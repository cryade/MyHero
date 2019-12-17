const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session =require('express-session');
const fileUpload = require('express-fileupload');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const heroRouter = require('./routes/hero');
const categoryRouter = require('./routes/category');
const app = express();


const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://MyHeroAdmin:MyHeroDatabase@myherodatabase-zpl5k.mongodb.net/test?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//TODO change secret
app.use(session({
  secret: 'secret!session',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: db })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({secret: 'ssshhhhh'}));

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(isAuthenticated);
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/hero', heroRouter);
app.use('/api/category', categoryRouter);
     
app.use(cors({origin: [
  "http://localhost:4200"
], credentials: true}));

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

function isAuthenticated(req, res, next) {

  if (req.session.user != null || req.url == ('/') || req.url == ("/api/users/signIn" )){
      console.log("loggedIn");
      return next();
  }else{
  console.log(req.url);
  res.send('not logged');
  }
}

console.log('Server is listening on port 3000!');
module.exports = app;
