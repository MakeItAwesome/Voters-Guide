const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Proposition = require('../models/proposition');
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

// POST/SAVE NEW prop
router.post('/save-vote', auth.requireLogin, function(req, res, next) {
  console.log(req.body);
  // console.log(res.locals.user);
  // console.log(req.body);
  if (req.body.yesVote) {
    console.log('undo YES vote');
    if (res.locals.user.arrayOfYesVotes.includes(req.body.yesVote)) {
      User.findByIdAndUpdate(
        res.locals.user._id, {
          $pull: {
            arrayOfYesVotes: req.body.yesVote
          }
        },
        function(err) {
          if (err) {
            console.error(err)
          };
          res.locals.user.arrayOfYesVotes.pop(req.body.yesVote); // so it updates on client side
        });
    } else {
      console.log('save YES vote');
      User.findByIdAndUpdate(
        res.locals.user._id, {
          $addToSet: {
            arrayOfYesVotes: req.body.yesVote
          },
          $pull: {
            arrayOfNoVotes: req.body.yesVote
          }
        },
        function(err) {
          if (err) {
            console.error(err)
          };
          res.locals.user.arrayOfYesVotes.push(req.body.yesVote); // so it updates on client side
          res.locals.user.arrayOfNoVotes.pop(req.body.yesVote);
        });
    }
  } else if (req.body.noVote) {
    console.log("clicked on button below NO");
    if (res.locals.user.arrayOfNoVotes.includes(req.body.noVote)) {
      console.log('undo NO vote');
      User.findByIdAndUpdate(
        res.locals.user._id, {
          $pull: {
            arrayOfNoVotes: req.body.noVote
          }
        },
        function(err) {
          if (err) {
            console.error(err)
          };
          res.locals.user.arrayOfNoVotes.pop(req.body.noVote); // so it updates on client side
        });
    } else {
      console.log('save NO vote');

      User.findByIdAndUpdate(
        res.locals.user._id, {
          $addToSet: {
            arrayOfNoVotes: req.body.noVote
          },
          $pull: {
            arrayOfYesVotes: req.body.noVote
          }
        },
        function(err) {
          if (err) {
            console.error(err)
          };
          res.locals.user.arrayOfNoVotes.push(req.body.noVote); // so it updates on client side
          res.locals.user.arrayOfYesVotes.pop(req.body.noVote);
        });
    }
  }
  Proposition.find({}, function(err, props) {
    if (err) {
      console.error(err);
    } else {
      User.findById(res.locals.user._id, function (err, updatedUser) {
        res.render('index', {
          props: props,
          user: updatedUser
        });
      });
    }
  })
});

/* SHOW Users votes. */
router.get('/friend/:codeName', function(req, res, next) {
  console.log(req.params);
  User.findOne({
      codeName: req.params.codeName
    })
    .exec(function(err, userWithCodeName) {
      if (err) {
        return next(err)
      } else if (userWithCodeName) {
        console.log(userWithCodeName);
        Proposition.find({}, function(err, props) {
          if (err) {
            console.error(err);
          } else {
            res.render('profile', {
              props: props,
              user: userWithCodeName
            });
          }
        })
      } else if (!userWithCodeName) {
        Proposition.find({}, function(err, props) {
          if (err) {
            console.error(err);
          } else {
            res.send('No user goes by: ' + req.params.codeName);
          }
        })
      }
    });
});

router.post('/toggle-privacy', function(req, res, next) {
  console.log(req.body);
  User.findByIdAndUpdate(
    res.locals.user._id, {
      $set: {
        profilePublic: req.body.profilePublic
      }
    },
    function(err) {
      if (err) {
        console.error(err)
      };
      res.locals.user.profilePublic = req.body.profilePublic; // to update user side
    });
});

module.exports = router;
