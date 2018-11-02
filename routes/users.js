const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('./helpers/auth');

// GET signup
router.get('/signup', (req, res, next) => {
  res.render('users/signup');
});

// GET login
router.get('/login', (req, res, next) => {
  res.render('users/login');
});

// POST signup
router.post('/signup', (req, res) => {
  const user = new User(req.body);

  user.save().then((user) => {
    req.session.user = user;
    res.redirect('/');
  }).catch((err) => {
    return res.status(400).send({
      err
    });
  });
});

// POST login
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.email, req.body.password, (err, user) => {
      if (err || !user) {
        const next_error = new Error("Email or password incorrect");
        next_error.status = 401;
        return next(next_error);
      } else {
        // user authenticated correctly
        // console.log(req.session);
        req.session.user = user;
        return res.redirect('/');
      }
    });
  });

// logout
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);
    });
  }
  return res.redirect('/');
});

// POST/CREATE NEW prop
router.post('/save-vote', auth.requireLogin, function(req, res, next) {


  if (req.body.yesVote !== undefined) {
    console.log('clicked yes');
    User.findByIdAndUpdate(
      res.locals.user._id, {
        $addToSet: {
          arrayOfYesVotes: req.body.yesVote
        }
      },
      function(err, event) {
        if (err) {
          console.error(err)
        };
        res.locals.user.arrayOfYesVotes.push(req.body.yesVote); // so it updates on client side
        res.redirect('/');
      });
  } else if (req.body.noVote !== undefined) {
    console.log('clicked no');
    User.findByIdAndUpdate(
      res.locals.user._id, {
        $addToSet: {
          arrayOfNoVotes: req.body.noVote
        }
      },
      function(err, event) {
        if (err) {
          console.error(err)
        };
        res.locals.user.arrayOfNoVotes.push(req.body.noVote); // so it updates on client side
        res.redirect('/');
      });
  }
  else if (req.body.undoNoVote !== undefined) {
    console.log('clicked undo no');
    User.findByIdAndUpdate(
      res.locals.user._id, {
        $pull: {
          arrayOfNoVotes: req.body.undoNoVote
        }
      },
      function(err, event) {
        if (err) {
          console.error(err)
        };
        res.locals.user.arrayOfNoVotes.pop(req.body.undoNoVote); // so it updates on client side
        res.redirect('/');
      });
  }
  else if (req.body.undoYesVote !== undefined) {
    console.log('clicked undo yes');
    User.findByIdAndUpdate(
      res.locals.user._id, {
        $pull: {
          arrayOfNoVotes: req.body.undoYesVote
        }
      },
      function(err, event) {
        if (err) {
          console.error(err)
        };
        res.locals.user.arrayOfYesVotes.pop(req.body.undoYesVote); // so it updates on client side
        res.redirect('/');
      });
  }



});

module.exports = router;
