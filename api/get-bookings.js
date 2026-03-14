/*
 * GET-BOOKINGS.JS — API Route
 * ============================
 * URL: GET /api/get-bookings
 *
 * Retrieves bookings from MongoDB.
 *
 * QUERY PARAMS (all optional):
 *   ?wallet=0x1a2B...  — Filter by wallet address
 *   ?movieId=5         — Filter by movie ID
 *   ?limit=20          — Max results (default 50)
 *
 * RESPONSE:
 *   200 — { success: true, bookings: [...], count: 5 }
 *   500 — { error: "Failed to fetch bookings" }
 *
 * EXAMPLES:
 *   GET /api/get-bookings                          — All bookings (max 50)
 *   GET /api/get-bookings?wallet=0x1a2B...         — Bookings for one wallet
 *   GET /api/get-bookings?movieId=5&limit=10       — Last 10 bookings for movie 5
 */

const { connectToDatabase } = require('./_db');

module.exports = async function handler(req, res) {

    // Only allow GET requests
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed. Use GET.' });
    }

    try {
        // Read optional filters from query params
        const { wallet, movieId, email, limit } = req.query;

        // Build the MongoDB query filter
        const filter = {};

        if (email) {
            // Filter by user email (case-insensitive)
            filter.userEmail = new RegExp('^' + email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i');
        }

        if (wallet) {
            // Case-insensitive match for wallet addresses
            filter.walletAddress = new RegExp('^' + wallet + '$', 'i');
        }

        if (movieId) {
            filter.movieId = parseInt(movieId);
        }

        // Max results (default 50, max 100)
        const maxResults = Math.min(parseInt(limit) || 50, 100);

        // Connect to MongoDB
        const db = await connectToDatabase();
        const bookings = db.collection('bookings');

        // Fetch bookings, newest first
        const results = await bookings
            .find(filter)
            .sort({ bookedAt: -1 })
            .limit(maxResults)
            .toArray();

        return res.status(200).json({
            success: true,
            bookings: results,
            count: results.length
        });

    } catch (error) {
        console.error('Get bookings error:', error);
        return res.status(500).json({
            error: 'Failed to fetch bookings. Please try again.'
        });
    }
};
