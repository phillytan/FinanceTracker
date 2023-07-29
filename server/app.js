var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var connectMongoDB = require('./db/dbConn');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var transactionsRouter = require('./routes/transactions');
var currenciesRouter = require("./routes/currencies");

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

connectMongoDB();

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);
app.use("/currencies", currenciesRouter);

module.exports = app;
