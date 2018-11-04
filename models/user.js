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
  },
  codeName: {
    type: String
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
  var user = this;

  // generate code name
  attempt = 1
  let codeName = generateCodeName(user.name, attempt);
  console.log("first attempt at codename is: " + codeName)
  attempt += 1;

  User.findOne({
    // look up user by codeName
      codeName: codeName
    })
    .exec(function(err, userWithCodeName) {
      if (err) {
        return next(err)
      }

      while (userWithCodeName) { // while system finds a user with suggested codeName
        console.log("codename is not unique, regenerating. first attempt was: " + codeName + " going to regenerate");
        let codeName = generateCodeName(user.name, attempt);
        attempt += 1;
        isCodeNameUnique = isUnique(codeName);
      }
    });
    // once we exit the loop above, we know codeName is unique
    bcrypt.hash(user.password, 12, function(err, hash) { // hash password
      if (err) return next(err);
      user.password = hash; // save hashed password to user
      user.codeName = codeName;
      next();
    })
});

function generateCodeName(name, count) {
  let kabobName = name.split(' ').join('-'); // replace spaces with dashes
  if (count == 1) {
    let codeName = kabobName;
    return codeName;
  } else {
    let maxNumber = Math.pow(2, count); // using 2^count to keep it low
    let randomNumber = getRandomInt(2, maxNumber); // start at 2 since one person will have the no number codeName
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
