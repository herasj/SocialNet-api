var express = require('express');
var router = express.Router();
const controller = require('../controllers/test.controller');
/* GET users listing. */
router.get('/', function(req, res, next) {
  controller.create()
  res.send('respond with a resource');
});

module.exports = router;
