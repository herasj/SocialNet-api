'use strict';
require('dotenv').config(); //.ENV
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validator = require("email-validator"); 
const controller = require('../controllers/auth.controller');
const authjwt = require('../middleware/jwt');
/* GET users listing. */
router.get(
	'/verify',
	(req, res, next) => {
		//Middleware
		authjwt.verify(req, res, next); //Verify token
	},
	function(req, res) {
		res.send('Correctamente Autenticado');
	}
);
router.post('/token', (req, res) => {
	const rToken = req.body.token;
	if (rToken == null) return res.sendStatus(401); //Verify refresh token
	controller
		.token({ token: rToken })
		.then(() => {
			authjwt.verifytoken(rToken, res);
		})
		.catch((err) => {
			res.json({ error: err });
		});
});
router.post('/login', function(req, res) {
	const access_token = authjwt.accesstokenexp({ email: req.body.email }); //Generate a token with exp
	const refresh_token = authjwt.refreshtoken({ email: req.body.email }); //Generate a refresh token
	const user = { email: req.body.email, pass: req.body.pass, token: refresh_token }; //Get info from body
	controller
		.auth(user)
		.then(() => {
			res.json({ access_token: access_token, refresh_token: refresh_token }); //After the user is verified the token is sent
		})
		.catch((err) => {
			console.error(err); //If there's not user then
			res.json({ error: err });
		});
});

router.post('/register', function(req, res, next) {
		if (validator.validate(req.body.email)==false){
			console.error("Invalid Email"); //Invalid Email
			res.sendStatus(400);
		}
		else{
			const access_token = authjwt.accesstokenexp({ email: req.body.email }); //Generate a token with exp
			const refresh_token = authjwt.refreshtoken({ email: req.body.email }); //Generate a refresh token

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
					res.json({ error: err });
				});

			console.table(req.body);
		}
	
});

router.delete('/logout', (req, res) => {
	controller
		.logout(req.body.token)
		.then(() => {
			res.sendStatus(204);
		})
		.catch((err) => {
			console.error(err);
			res.sendStatus(400); //Bad Request
		});
});
module.exports = router;
