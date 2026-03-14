/*
 * CONFIRMATION.JS
 * ===============
 * Reads transaction data from sessionStorage and populates
 * the confirmation page with the real blockchain details.
 *
 * What this file does:
 * 1. Read txHash and amountPaid from sessionStorage
 *    (saved by checkout.js after successful payment)
 * 2. Generate a unique booking ID
 * 3. Display the tx hash with a clickable Etherscan link
 * 4. Display the amount paid
 */


// =============================================
// CONFIGURATION
// =============================================

/*
 * Sepolia Etherscan is the block explorer for the Sepolia testnet.
 * We use it to build a link where users can view their transaction
 * details — sender, receiver, amount, gas used, block number, etc.
 *
 * URL format: https://sepolia.etherscan.io/tx/<transaction_hash>
 */
const ETHERSCAN_BASE_URL = 'https://sepolia.etherscan.io/tx/';


// =============================================
// READ DATA FROM SESSION STORAGE
// =============================================

/*
 * After a successful payment, checkout.js saves:
 *   - tixxer_txHash:     The transaction hash (e.g., "0x8f3a...c21d")
 *   - tixxer_amountPaid: The ETH amount (e.g., "0.015")
 *
 * We read these values here to display them on the confirmation page.
 */
const txHash = sessionStorage.getItem('tixxer_txHash');
const amountPaid = sessionStorage.getItem('tixxer_amountPaid');


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
 * Example: TXR-20260310-A7B2
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

    // Generate 4 random hex characters (e.g., "A7B2")
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();

    return 'TXR-' + dateStr + '-' + randomHex;
}


// =============================================
// POPULATE THE PAGE
// =============================================

/*
 * DOM references for the elements we need to update.
 */
const bookingIdEl = document.getElementById('bookingId');
const amountPaidEl = document.getElementById('amountPaid');
const txHashLinkEl = document.getElementById('txHashLink');

/*
 * Fill in the booking ID (always generated fresh).
 */
if (bookingIdEl) {
    bookingIdEl.textContent = generateBookingId();
}

/*
 * Fill in the amount paid (from sessionStorage).
 */
if (amountPaidEl && amountPaid) {
    amountPaidEl.textContent = amountPaid + ' ETH';
}

/*
 * Fill in the transaction hash and build the Etherscan link.
 *
 * If we have a real tx hash (from a real MetaMask transaction):
 *   - Show the truncated hash as the link text
 *   - Set the href to the Etherscan URL
 *   - Clicking opens the transaction on Sepolia Etherscan
 *
 * If there's no tx hash (e.g., user navigated here directly):
 *   - Show a placeholder message
 */
if (txHashLinkEl) {
    if (txHash) {
        // Truncate the hash for display: "0x8f3a...c21d"
        const shortHash = txHash.slice(0, 6) + '...' + txHash.slice(-4);
        txHashLinkEl.textContent = shortHash;
        txHashLinkEl.href = ETHERSCAN_BASE_URL + txHash;
        txHashLinkEl.title = 'View transaction on Sepolia Etherscan: ' + txHash;
    } else {
        txHashLinkEl.textContent = 'No transaction data';
        txHashLinkEl.href = '#';
        txHashLinkEl.style.color = 'var(--text-muted)';
    }
}
