'use strict';
require('dotenv').config(); //.ENV
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const controller = require('../controllers/user.controller');
const authjwt = require('../middleware/jwt');
/* GET users listing. */
router.get(
	'/',
	(req, res, next) => {
		//Middleware
		authjwt.verify(req, res, next); //Verify token
	},
	function(req, res) {
		res.send('User index');
	}
);

router.post('/auth', function(req, res) {
	const user = { email: req.body.email, pass: req.body.pass }; //Get info from body
  const access_token = authjwt.accesstokenexp(user); //Generate a token with exp
  const refresh_token = authjwt.refreshtoken(user); //Generate a refresh token
	controller
		.auth(user)
		.then(() => {
			res.json({ access_token: access_token, refresh_token: refresh_token }); //After the user is verified the token is sent
		})
		.catch((err) => {
			console.error(err); //If there's not user then
			res.sendStatus(404);
		});
});

router.post('/register', function(req, res, next) {
	const user = req.body;
	const retorno = controller.create(user);
	console.table(req.body);
	res.send(retorno);
});

module.exports = router;
