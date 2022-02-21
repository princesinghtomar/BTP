const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    helmet = require('helmet'),
    cors = require('cors');

const indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users');
const app = express();

app.use(helmet());
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api/user', usersRouter);

module.exports = app;
