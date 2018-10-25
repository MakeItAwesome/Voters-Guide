var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/admin', function(req, res, next) {
  res.render('admin');
});

module.exports = router;
