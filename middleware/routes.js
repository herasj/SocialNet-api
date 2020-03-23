const app = require('./express');
const routesfolder = './routes/';
const fs = require('fs');

//Cargar todas las rutas que estén en /routes
fs.readdirSync(routesfolder).forEach((file) => {
	let filedir = file.toString();
	filedir = filedir.substring(0, filedir.length - 3);
	let path = `../routes/${filedir}`;
	let mainrouter = require(path);
	app.use(`/${filedir}`, mainrouter);
});

module.exports = app;
