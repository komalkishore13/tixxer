const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');

const router = express.Router();

// POST /bookings
router.post('/', async (req, res) => {
  try {
    const { userId, type, from, to, date, price, walletAddress, transactionHash } = req.body;

    if (!userId || !type || !from || !to || !date || price == null) {
      return res.status(400).json({ error: 'All booking fields are required.' });
    }

    // Create booking with wallet data
    const booking = await Booking.create({
      userId, type, from, to, date, price,
      walletAddress: walletAddress || '',
      transactionHash: transactionHash || ''
    });

    // Update user's totalSpent and walletAddress
    const updateFields = { $inc: { totalSpent: price } };
    if (walletAddress) updateFields.$set = { walletAddress };
    await User.findByIdAndUpdate(userId, updateFields);

    res.status(201).json({ booking });
  } catch (err) {
    console.error('Create booking error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// GET /bookings/:userId
router.get('/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
