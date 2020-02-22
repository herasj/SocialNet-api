var express = require('express');
var router = express.Router();
const controller = require('../controllers/user.controller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User index');
});

router.get('/auth', function(req, res, next) {
  controller.auth(req.body,res);
});

router.post('/register', function (req,res,next) {
  const retorno = controller.create(req.body);
  console.table(req.body);
  res.send(retorno);
})

module.exports = router;
