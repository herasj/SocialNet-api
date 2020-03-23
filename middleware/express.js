const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const cors = require('cors');
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //Body-Parser
app.use(
	express.urlencoded({
		// to support URL-encoded bodies
		extended: true
	})
);
app.use(cors({ origin: '*' }));
module.exports = app;
