const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropositionSchema = new Schema({
  name: { type: String },
  summary: { type: String },
  pros: { type: Array },
  cons: { type: Array },
  arrayOfYesVoters: { type: Array },
  arrayOfNoVoters: { type: Array  },
  readMoreUrl: { type: String },
  area: { type: String }
});

const Proposition = mongoose.model('Proposition', PropositionSchema);
module.exports = Proposition;
