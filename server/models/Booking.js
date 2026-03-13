const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:   { type: String, required: true },
  from:   { type: String, required: true },
  to:     { type: String, required: true },
  date:   { type: String, required: true },
  price:  { type: Number, required: true },
  walletAddress:   { type: String, default: '' },
  transactionHash: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
