'use strict';
require('dotenv').config(); //.ENV
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const controller = require('../controllers/user.controller');
const authjwt = require('../middleware/jwt');
/* GET users listing. */
router.get(
	'/verify',
	(req, res, next) => {
		//Middleware
		authjwt.verify(req, res, next); //Verify token
	},
	function(req, res) {
		res.send('User index');
	}
);
router.post('/token', (req, res) => {
	const rToken = req.body.token;
	if (rToken == null) return res.sendStatus(401); //Verify refresh token
	controller
		.token({ email: req.body.email, token: rToken })
		.then(() => {
			authjwt.verifytoken(rToken, res);
		})
		.catch((err) => {
			res.json({error: err});
		});
});
router.post('/auth', function(req, res) {
	const access_token = authjwt.accesstokenexp({email: req.body.email}); //Generate a token with exp
	const refresh_token = authjwt.refreshtoken({email: req.body.email}); //Generate a refresh token
	const user = { email: req.body.email, pass: req.body.pass, token: refresh_token }; //Get info from body
	controller
		.auth(user)
		.then(() => {
			res.json({ access_token: access_token, refresh_token: refresh_token }); //After the user is verified the token is sent
		})
		.catch((err) => {
			console.error(err); //If there's not user then
			res.json({error: err});
		});
});

router.post('/register', function(req, res, next) {

	const access_token = authjwt.accesstokenexp({email: req.body.email}); //Generate a token with exp
	const refresh_token = authjwt.refreshtoken({email: req.body.email}); //Generate a refresh token

	const veruser = {
		name: req.body.name,
		last: req.body.last,
		phone: req.body.phone,
		birth: req.body.birth,
		email: req.body.email,
		token: refresh_token,
		pass: req.body.pass
	};
	controller
		.create(veruser)
		.then(() => {
			res.json({ access_token: access_token, refresh_token: refresh_token }); //After the user is verified the token is sent
		})
		.catch((err) => {
			console.error(err); //If there's not user then
			res.json({error: err});
		});

	console.table(req.body);
});

module.exports = router;
