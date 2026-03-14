/* ================================================
   TIXXER — Frontend API Helper
   Connects frontend to Express backend via fetch()
   ================================================ */

const API_BASE = 'https://server-iota-ruby-88.vercel.app';

/**
 * Signup a new user.
 * Returns { user } on success, { error } on failure.
 */
async function apiSignup(name, email, password) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}

/**
 * Login an existing user.
 * Returns { user } on success, { error } on failure.
 */
async function apiLogin(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

/**
 * Get user by ID (fresh data from DB).
 * Returns { user } on success.
 */
async function apiGetUser(userId) {
  const res = await fetch(`${API_BASE}/users/${userId}`);
  return res.json();
}

/**
 * Create a booking.
 * Returns { booking } on success.
 */
async function apiCreateBooking({ userId, type, from, to, date, price, walletAddress, transactionHash }) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, type, from, to, date, price, walletAddress, transactionHash })
  });
  return res.json();
}

/**
 * Get all bookings for a user.
 * Returns { bookings: [...] }.
 */
async function apiGetBookings(userId) {
  const res = await fetch(`${API_BASE}/bookings/${userId}`);
  return res.json();
}
