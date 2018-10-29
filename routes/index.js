var express = require('express');
var router = express.Router();

const Proposition = require('../models/proposition');

/* GET home page. */
router.get('/', function(req, res, next) {
  Proposition.find({}, function(err, props) {
    if (err) {
      console.error(err);
    } else {
      res.render('index', { title: 'Voters Guide', props: props });
    }
  })
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  res.render('admin');
});

/* GET NEW prop form. */
router.get('/admin/props/new', function(req, res, next) {
  res.render('props/new');
});

// POST/CREATE NEW prop
router.post('/admin/props', function(req, res, next) {


  let prop = new Proposition(req.body);

  prop.save(function(err, event) {
    if (err) {
      console.error(err)
    };
    return res.redirect('/admin');
  });
});

module.exports = router;
