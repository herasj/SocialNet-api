const app = require('./middleware/routes');
const express = require('express');
const router = express.Router();
require('dotenv').config() //.ENV
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  
});

app.listen(process.env.LISTEN_PORT, () => {
  console.log("Escuchando en el puerto: "+process.env.LISTEN_PORT)
}

); //Escuchar en el puerto 3000
module.exports = app;