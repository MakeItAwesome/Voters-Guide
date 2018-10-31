const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

const UserSchema = new Schema({
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
  // before saving
  let user = this;

  // encrypt password
  bcrypt.hash(user.password, 12, function(err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  })
});

UserSchema.statics.authenticate = function(email, password, next) {
  User.findOne({
      email: email
    })
    .exec(function(err, user) {
      if (err) {
        return next(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return next(err);
      }
      bcrypt.compare(password, user.password, function(err, result) {
        if (result === true) {
          return next(null, user);
        } else {
          return next();
        }
      });
    });
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
