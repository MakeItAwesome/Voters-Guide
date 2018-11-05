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
    default: true
  },
  arrayOfYesVotes: {
    type: Array
  },
  arrayOfNoVotes: {
    type: Array
  },
  codeName: {
    type: String,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

UserSchema.plugin(uniqueValidator);

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

UserSchema.pre('save', function(next) {
  // before saving
  let user = this;
  // generate code name
  attempt = 1
  codeName = generateCodeName(user.name, attempt);
  console.log("first attempt at codename is: " + codeName)

  User.findOne({ codeName: codeName }).exec(function(err, userWithCodeName) {
    if (err) {
      return next(err)
    } else if (userWithCodeName) {
      console.log('user found, you should try another!');
      attempt += 1;
      codeName = generateCodeName(user.name, attempt);
    }
    bcrypt.hash(user.password, 12, function(err, hash) {
      if (err) return next(err);
      user.codeName = codeName;
      user.password = hash;
      next();
    })
  });

});

function generateCodeName(name, count) {
  let kabobName = name.split(' ').join('-').toLowerCase(); // replace spaces with dashes
  if (count == 1) { // if this is the first time we're trying, let's give you the vanity URL
    let codeName = kabobName;
    return codeName;
  } else {
    let maxNumber = Math.pow(100, count);
    let randomNumber = getRandomInt(1, maxNumber);
    let codeName = kabobName + "-" + randomNumber;
    console.log('generated code name: ' + codeName);
    return codeName;
  }
}

function getRandomInt(min, max) {
  // Returns a random integer between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
