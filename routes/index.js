var express = require('express');
var router = express.Router();
const auth = require('./helpers/auth');

const Proposition = require('../models/proposition');

// set layout variables
router.use(function(req, res, next) {
  // set website title
  res.locals.title = "Voter's Guide";
  // so we can check if user is logged in
  res.locals.user = req.session.user;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  Proposition.find({}, function(err, props) {
    if (err) {
      console.error(err);
    } else {
      res.render('index', {
        props: props
      });
    }
  })
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  Proposition.find({}, function(err, props) {
    if (err) {
      console.error(err);
    } else {
      res.render('admin', {
        props: props
      });
    }
  })

});

/* GET NEW prop form. */
router.get('/admin/props/new', function(req, res, next) {
  res.render('props/new');
});

// POST/CREATE NEW prop
router.post('/admin/props', function(req, res, next) {
  let prop = new Proposition(req.body);
  prop.save(function(err, Prop) {
    if (err) {
      console.error(err)
    };
    return res.redirect('/admin');
  });
});

/* GET EDIT prop form. */
router.get('/admin/props/:id/edit', function(req, res, next) {
  Proposition.findById(req.params.id, function(err, prop) {
    if (err) {
      console.error(err)
    };
    res.render('props/edit', {
      prop: prop
    });
  });
});

// PUT/EDIT prop
router.post('/admin/props/:id', function(req, res, next) {
  //findByIdAndUpdate
  //update with request object.body
  let updatedProp = new Proposition(req.body);

  Proposition.findByIdAndUpdate(
    req.params.id, {
      $set: {
        name: updatedProp.name,
        summary: updatedProp.summary,
        pros: updatedProp.pros,
        cons: updatedProp.cons,
        readMoreUrl: updatedProp.readMoreUrl,
        area: updatedProp.area
      }
    },
    function(err, prop) {
      if (err) {
        console.error(err)
      };
      res.redirect('/admin');
    });
});
module.exports = router;
