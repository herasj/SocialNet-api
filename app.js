const app = require('./middleware/routes');
const express = require('express');
const router = express.Router();
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  
});

router.get('/',function(req, res, next) {
  res.send('respond with a resource');
})

app.listen(3000); //Escuchar en el puerto 3000
module.exports = app;
