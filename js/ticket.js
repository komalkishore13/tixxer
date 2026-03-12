/*
 * TICKET.JS
 * =========
 * Reads booking data from sessionStorage and populates
 * the digital ticket page with real transaction details.
 *
 * What this file does:
 * 1. Read all booking data from sessionStorage
 *    (saved by checkout.js after successful payment)
 * 2. Generate a unique booking ID
 * 3. Display movie name, seats, wallet address
 * 4. Display the tx hash with a clickable Etherscan link
 * 5. Display the amount paid
 *
 * DATA FLOW:
 * ──────────
 * checkout.js saves these keys to sessionStorage after payment:
 *   - tixxer_txHash:        The blockchain transaction hash
 *   - tixxer_amountPaid:    The ETH amount paid
 *   - tixxer_walletAddress: The connected wallet address
 *   - tixxer_movieName:     The movie title
 *   - tixxer_seats:         Comma-separated seat list (e.g., "A1, A2, B5")
 *   - tixxer_showDate:      Showtime date (e.g., "Mon, 10 Mar 2026")
 *   - tixxer_showTime:      Showtime time (e.g., "1:45 PM")
 *
 * ticket.js reads these values and fills in the ticket card.
 */


// =============================================
// CONFIGURATION
// =============================================

/*
 * Sepolia Etherscan is the block explorer for the Sepolia testnet.
 * We use it to build a clickable link for the transaction hash
 * so users can view full transaction details on the blockchain.
 *
 * URL format: https://sepolia.etherscan.io/tx/<transaction_hash>
 */
const ETHERSCAN_BASE_URL = 'https://sepolia.etherscan.io/tx/';


// =============================================
// READ DATA FROM SESSION STORAGE
// =============================================

/*
 * Read all booking data that checkout.js saved after payment.
 * Each value may be null if the user navigated here directly
 * (without going through the checkout flow).
 */
const txHash = sessionStorage.getItem('tixxer_txHash');
const amountPaid = sessionStorage.getItem('tixxer_amountPaid');
const walletAddress = sessionStorage.getItem('tixxer_walletAddress');
const movieName = sessionStorage.getItem('tixxer_movieName');
const seats = sessionStorage.getItem('tixxer_seats');
const showDate = sessionStorage.getItem('tixxer_showDate');
const showTime = sessionStorage.getItem('tixxer_showTime');


// =============================================
// GENERATE BOOKING ID
// =============================================

/**
 * Creates a unique booking ID for the ticket.
 *
 * Format: TXR-YYYYMMDD-XXXX
 *   - TXR:      Tixxer prefix
 *   - YYYYMMDD: Today's date
 *   - XXXX:     4 random hex characters
 *
 * Example: TXR-20260311-C3F9
 *
 * In a real app, the booking ID would come from a backend
 * database. Here we generate it locally for the demo.
 */
function generateBookingId() {
    // Get today's date as YYYYMMDD
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateStr = year + month + day;

    // Generate 4 random hex characters (e.g., "C3F9")
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();

    return 'TXR-' + dateStr + '-' + randomHex;
}


// =============================================
// HELPER: TRUNCATE WALLET ADDRESS
// =============================================

/**
 * Shortens a wallet address for display on the ticket.
 * Example: "0x1a2Bc3Def456789Abcdef0123456789AbcD9fE3"
 *       →  "0x1a2B...9fE3"
 *
 * @param {string} address - The full wallet address
 * @returns {string} - Truncated address
 */
function truncateAddress(address) {
    if (!address || address.length < 10) return address || 'N/A';
    return address.slice(0, 6) + '...' + address.slice(-4);
}


// =============================================
// POPULATE THE TICKET
// =============================================

/*
 * DOM references for all the elements we need to update.
 * Each element has an id that matches the HTML template.
 */
const ticketMovieTitleEl = document.getElementById('ticketMovieTitle');
const ticketSeatsTopEl = document.getElementById('ticketSeatsTop');
const ticketShowtimeEl = document.getElementById('ticketShowtime');
const bookingIdEl = document.getElementById('bookingId');
const ticketDateTimeEl = document.getElementById('ticketDateTime');
const ticketSeatsEl = document.getElementById('ticketSeats');
const ticketWalletEl = document.getElementById('ticketWallet');
const amountPaidEl = document.getElementById('amountPaid');
const txHashLinkEl = document.getElementById('txHashLink');


// --- Booking ID (always generated fresh) ---
if (bookingIdEl) {
    bookingIdEl.textContent = generateBookingId();
}


// --- Movie Name ---
/*
 * If we have a movie name from sessionStorage, display it.
 * Otherwise, keep the default placeholder from the HTML.
 */
if (ticketMovieTitleEl && movieName) {
    ticketMovieTitleEl.textContent = movieName;
}


// --- Seats (shown in two places: top card + details) ---
if (seats) {
    if (ticketSeatsTopEl) {
        ticketSeatsTopEl.textContent = 'Seats: ' + seats;
    }
    if (ticketSeatsEl) {
        ticketSeatsEl.textContent = seats;
    }
}


// --- Showtime (date + time) ---
/*
 * The date comes as "2026-03-14" from sessionStorage.
 * We format it to "Sat, 14 Mar 2026" for display.
 * Then combine with time: "Sat, 14 Mar 2026 · 6:00 PM"
 */
if (showDate || showTime) {
    let formattedDate = showDate;

    // Format "2026-03-14" → "Sat, 14 Mar 2026"
    if (showDate && showDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const d = new Date(showDate + 'T00:00:00');
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const months = ['Jan','Feb','Mar','Apr','May','Jun',
                        'Jul','Aug','Sep','Oct','Nov','Dec'];
        formattedDate = days[d.getDay()] + ', ' + d.getDate() + ' ' +
            months[d.getMonth()] + ' ' + d.getFullYear();
    }

    const dateTimeStr = [formattedDate, showTime].filter(Boolean).join(' \u00B7 ');

    if (ticketShowtimeEl) {
        ticketShowtimeEl.textContent = dateTimeStr;
    }
    if (ticketDateTimeEl) {
        ticketDateTimeEl.textContent = dateTimeStr;
    }
}


// --- Wallet Address ---
/*
 * Display the truncated wallet address so the user can verify
 * which wallet was used for payment.
 */
if (ticketWalletEl) {
    if (walletAddress) {
        ticketWalletEl.textContent = truncateAddress(walletAddress);
        ticketWalletEl.title = walletAddress;  // Full address on hover
    } else {
        ticketWalletEl.textContent = 'Not available';
    }
}


// --- Amount Paid ---
if (amountPaidEl && amountPaid) {
    amountPaidEl.textContent = amountPaid + ' ETH';
}


// --- Transaction Hash ---
/*
 * If we have a real tx hash (from a MetaMask transaction):
 *   - Show the truncated hash as clickable text
 *   - Link to the full transaction on Sepolia Etherscan
 *
 * If no tx hash exists (user navigated here directly):
 *   - Show a placeholder message
 */
if (txHashLinkEl) {
    if (txHash) {
        // Truncate: "0x8f3a...c21d"
        const shortHash = txHash.slice(0, 6) + '...' + txHash.slice(-4);
        txHashLinkEl.textContent = shortHash;
        txHashLinkEl.href = ETHERSCAN_BASE_URL + txHash;
        txHashLinkEl.title = 'View on Sepolia Etherscan: ' + txHash;
    } else {
        txHashLinkEl.textContent = 'No transaction data';
        txHashLinkEl.href = '#';
        txHashLinkEl.style.color = 'var(--text-muted)';
    }
}
