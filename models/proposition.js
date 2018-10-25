const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Proposition = new Schema({
  Summary: { type: String },
  ProsAndCons: { type: String },
  ArrayOfYesVoters: { type: Array },
  ArrayOfNoVoters: { type: Array  },
  ReadMoreUrl: { type: String }

});

const Proposition = mongoose.model('Proposition', PropositionSchema);
module.exports = Event;
