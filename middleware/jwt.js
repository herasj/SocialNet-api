const jwt = require('jsonwebtoken');
require('dotenv').config(); //.ENV

// function authToken (req,res, next){

// }
module.exports = {
	verify: (req, res, next) => {
        console.log("Verificando token 😎"); 
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1]; //If there's authHeader  //Bearer(0) TOKEN(1)
		if (token == null) return res.sendStatus(401); // If there's no token then return ERROR 401
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) return res.sendStatus(403); // Invalid Token
			req.user = user;
			next(); // Success, move to next middleware
		});
    },
    accesstoken: (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    },
    accesstokenexp: (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '45s'});
    },
    refreshtoken: (user) => {
        return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    }
    
    
    
};
