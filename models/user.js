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
    type: String,
    required: true
  },
  profilePublic: {
    type: Boolean,
    default: false
  },
  arrayOfYesVotes: {
    type: Array
  },
  arrayOfNoVotes: {
    type: Array
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function(next) {
  // before saving
  let user = this;

  // generate code name
  attempt = 1

  if (typeof codeName == 'undefined') {
    let codeName = generateCodeName(user.name,attempt);
    attempt += 1;
  } else {
    while (isUnique(codeName) == false) {
      let codeName = generateCodeName(user.name,attempt);
      attempt += 1;
    }
  }

  if (isUnique(codeName) == true) {
    console.log("unique codename generated: " + codeName)
    // encrypt password
    bcrypt.hash(user.password, 12, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    })
  }
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

function generateCodeName(name, count) {
  let kabobName = name.split(' ').join('-'); // replace spaces with dashes
  if (count == 1) {
    let codeName = kabobName;
    return codeName;
  } else {
    let maxNumber = Math.pow(2,count); // using 2^count to keep it low
    let randomNumber = getRandomInt(2,maxNumber);
    let codeName = kabobName + randomNumber;
    console.log('generated code name');
    return codeName;
  }
}


function getRandomInt(min, max) {
  // Returns a random integer between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isUnique(codeName) {
  if 
  console.log('codename is unique' + codeName);
  // look up user by codeName
    // if unique, return true
    // else return false
  return true;
}


const User = mongoose.model('User', UserSchema);
module.exports = User;
