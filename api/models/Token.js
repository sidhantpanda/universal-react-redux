var mongoose = require('mongoose');

var tokenSchema = mongoose.Schema({
  userId: String,
  key: String,
  expiry: { type: Date, default: +new Date() + 7*24*60*60*1000 } // Expiry 7 days from now
}, {
  timestamps: true
});

module.exports = mongoose.model('Token', tokenSchema);
