const app = require('./middleware/routes');
const express = require('express');
const router = express.Router();

  // Render .jade files found in the ./views folder
  // I believe you are already doing this
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  // Client-side assets will be served from a separate ./public folder
  //     i.e. http://yourhost.com/js/main.js will link to ./public/js/main.js
  app.use(express.static(__dirname + '/public'));


app.listen(process.env.LISTEN_PORT, () => {
  console.log("Escuchando en el puerto: "+process.env.LISTEN_PORT)
}

); //Escuchar en el puerto 3000
module.exports = app;
