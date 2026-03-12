/*
 * _DB.JS — Shared MongoDB Connection
 * ====================================
 * This file creates ONE reusable MongoDB connection.
 *
 * WHY a shared connection?
 * Vercel serverless functions are short-lived. Without caching,
 * every API call would open a new database connection (slow).
 * By caching the connection, subsequent calls reuse it (fast).
 *
 * The underscore prefix (_db.js) tells Vercel this is a helper
 * file, NOT an API endpoint — it won't be exposed as a URL.
 */

const { MongoClient } = require('mongodb');

// Read the connection string from environment variables
// (set in .env locally, or in Vercel dashboard for production)
const MONGODB_URI = process.env.MONGODB_URI;

// Database name
const DB_NAME = 'tixxer';

// Cache the connection so we don't reconnect on every request
let cachedClient = null;
let cachedDb = null;

/**
 * Connects to MongoDB and returns the database object.
 *
 * First call: creates a new connection and caches it.
 * Later calls: reuses the cached connection (much faster).
 *
 * @returns {Promise<import('mongodb').Db>} The database object
 */
async function connectToDatabase() {
    // If we already have a connection, reuse it
    if (cachedClient && cachedDb) {
        return cachedDb;
    }

    // Create a new MongoDB client and connect
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    // Cache for future requests
    cachedClient = client;
    cachedDb = client.db(DB_NAME);

    return cachedDb;
}

module.exports = { connectToDatabase };
