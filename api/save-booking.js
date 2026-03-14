/*
 * SAVE-BOOKING.JS — API Route
 * ============================
 * URL: POST /api/save-booking
 *
 * Receives booking data from the frontend after a successful
 * MetaMask payment and saves it to MongoDB.
 *
 * REQUEST BODY (JSON):
 * {
 *   "movieId":       1,
 *   "movieName":     "Interstellar",
 *   "date":          "2026-03-14",
 *   "time":          "6:00 PM",
 *   "seats":         ["A1", "B3", "C5"],
 *   "totalETH":      "0.015",
 *   "walletAddress": "0x1a2Bc3...",
 *   "txHash":        "0x8f3a..."
 * }
 *
 * RESPONSE:
 *   201 — { success: true, bookingId: "..." }
 *   400 — { error: "Missing required fields" }
 *   500 — { error: "Failed to save booking" }
 */

const { connectToDatabase } = require('./_db');

module.exports = async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    try {
        // Parse the request body
        const {
            movieId,
            movieName,
            date,
            time,
            seats,
            totalETH,
            walletAddress,
            txHash,
            userName,
            userEmail
        } = req.body;

        // Validate required fields
        if (!movieName || !date || !time || !seats || !totalETH || !txHash) {
            return res.status(400).json({
                error: 'Missing required fields. Need: movieName, date, time, seats, totalETH, txHash'
            });
        }

        // Connect to MongoDB
        const db = await connectToDatabase();
        const bookings = db.collection('bookings');

        // Build the booking document
        const booking = {
            movieId:       parseInt(movieId) || 0,
            movieName:     movieName,
            date:          date,
            time:          time,
            seats:         Array.isArray(seats) ? seats : seats.split(','),
            seatCount:     Array.isArray(seats) ? seats.length : seats.split(',').length,
            totalETH:      totalETH,
            walletAddress: walletAddress || 'unknown',
            txHash:        txHash,
            userName:      userName || '',
            userEmail:     userEmail || '',
            category:      'movie',
            bookedAt:      new Date()
        };

        // Insert into the "bookings" collection
        const result = await bookings.insertOne(booking);

        // Return success with the MongoDB-generated ID
        return res.status(201).json({
            success: true,
            bookingId: result.insertedId.toString()
        });

    } catch (error) {
        console.error('Save booking error:', error);
        return res.status(500).json({
            error: 'Failed to save booking. Please try again.'
        });
    }
};
