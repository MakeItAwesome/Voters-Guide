const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropositionSchema = new Schema({
  name: { type: String },
  summary: { type: String },
  pros: { type: String },
  cons: { type: String },
  arrayOfYesVoters: { type: Array },
  arrayOfNoVoters: { type: Array  },
  readMoreUrl: { type: String }
});

const Proposition = mongoose.model('Proposition', PropositionSchema);
module.exports = Proposition;
