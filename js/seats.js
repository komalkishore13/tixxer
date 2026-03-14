/*
 * SEATS.JS
 * ========
 * Handles the cinema seat grid on seats.html.
 *
 * What this file does:
 * 1. Defines the seat layout (rows A–F, 10 seats per row = 60 total)
 * 2. Randomly picks 25 seats as "booked" (different each time)
 * 3. Builds the seat grid HTML and injects it into the page
 * 4. Listens for click events on each seat
 * 5. Toggles seats between "available" and "selected"
 * 6. Updates the booking summary bar (seat names, count, total ETH)
 * 7. Enables/disables the "Proceed to Checkout" button
 */


// =============================================
// CONFIGURATION
// =============================================

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];  // 6 rows
const SEATS_PER_ROW = 10;                        // 10 seats per row (60 total)
const PRICE_PER_SEAT = window.TICKET_PRICE || 0.005; // Price from movie data (set by seats.html)
const AISLE_AFTER = [3, 7];                       // Aisle gaps after seat 3 and seat 7
const BOOKED_COUNT = 25;                          // Number of randomly booked seats


// =============================================
// RANDOM SEAT BOOKING
// =============================================

/**
 * Generates a list of randomly booked seats.
 *
 * HOW IT WORKS:
 * 1. Build an array of ALL possible seat IDs (A1, A2, ... F10 = 60 seats)
 * 2. Shuffle the array randomly using Fisher-Yates algorithm
 * 3. Pick the first 25 seats from the shuffled array
 *
 * PERSISTENCE:
 * The booked seats are saved to sessionStorage so that when the user
 * navigates back from checkout, the same seats stay booked (not re-randomized).
 * The key is based on movie ID so each movie has its own booked layout.
 */
function generateBookedSeats() {
    // Step 1: Build array of all 60 seat IDs
    const allSeats = [];
    ROWS.forEach(function(row) {
        for (let num = 1; num <= SEATS_PER_ROW; num++) {
            allSeats.push(row + num);  // e.g. "A1", "A2", ... "F10"
        }
    });

    // Step 2: Shuffle using Fisher-Yates algorithm
    // This goes through the array backwards, swapping each element
    // with a random element before it — gives a perfectly random order
    for (let i = allSeats.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap positions i and j
        const temp = allSeats[i];
        allSeats[i] = allSeats[j];
        allSeats[j] = temp;
    }

    // Step 3: Take the first 25 seats as "booked"
    return allSeats.slice(0, BOOKED_COUNT);
}

/**
 * Gets booked seats for the current movie, using sessionStorage
 * to keep them consistent across back/forward navigation.
 *
 * If we already generated booked seats for this movie, reuse them.
 * Otherwise generate new ones and save them.
 */
function getBookedSeats() {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id') || '1';
    const storageKey = 'tixxer_bookedSeats_' + movieId;

    // Check if we already have booked seats saved for this movie
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
        return JSON.parse(saved);
    }

    // Generate new random booked seats and save them
    const booked = generateBookedSeats();
    sessionStorage.setItem(storageKey, JSON.stringify(booked));
    return booked;
}

// Get consistent booked seats (same layout when navigating back)
const BOOKED_SEATS = getBookedSeats();


// =============================================
// STATE
// =============================================

// Array to track which seats the user has selected
let selectedSeats = [];


// =============================================
// DOM REFERENCES
// =============================================

const seatGrid = document.getElementById('seatGrid');
const selectedSeatsDisplay = document.getElementById('selectedSeats');
const seatCountDisplay = document.getElementById('seatCount');
const totalPriceDisplay = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');


// =============================================
// BUILD THE SEAT GRID
// =============================================

/**
 * Creates the entire seat grid and inserts it into the DOM.
 *
 * For each row (A–F):
 *   - Creates a row container
 *   - Adds a row label (the letter)
 *   - Adds 10 seat buttons, with aisle gaps after seats 3 and 7
 *   - Marks seats as "booked" if they're in the randomly generated list
 */
function buildSeatGrid() {
    // Clear any existing content
    seatGrid.innerHTML = '';

    // Loop through each row
    ROWS.forEach(function(row) {

        // Create a row container div
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('seat-row');

        // Add row label (A, B, C, etc.) on the left side
        const rowLabel = document.createElement('span');
        rowLabel.classList.add('row-label');
        rowLabel.textContent = row;
        rowDiv.appendChild(rowLabel);

        // Create a container for the seats in this row
        const seatsContainer = document.createElement('div');
        seatsContainer.classList.add('seats-container');

        // Loop through each seat in the row (1 to 10)
        for (let seatNum = 1; seatNum <= SEATS_PER_ROW; seatNum++) {

            // Check if we need an aisle gap BEFORE this seat
            if (AISLE_AFTER.includes(seatNum - 1) && seatNum > 1) {
                const aisle = document.createElement('div');
                aisle.classList.add('aisle-gap');
                seatsContainer.appendChild(aisle);
            }

            // Create the seat button
            const seatBtn = document.createElement('button');
            seatBtn.classList.add('seat');

            // Build the seat ID string, e.g., "A1", "B5"
            const seatId = row + seatNum;
            seatBtn.dataset.seatId = seatId;

            // Display the seat number inside the button
            seatBtn.textContent = seatNum;

            // Check if this seat is booked
            if (BOOKED_SEATS.includes(seatId)) {
                seatBtn.classList.add('booked');
                seatBtn.disabled = true;  // Can't click booked seats
                seatBtn.title = 'This seat is already booked';
            } else {
                seatBtn.classList.add('available');
                seatBtn.title = 'Seat ' + seatId + ' — Click to select';

                // Add click handler for available seats
                seatBtn.addEventListener('click', function() {
                    toggleSeat(seatId, seatBtn);
                });
            }

            seatsContainer.appendChild(seatBtn);
        }

        // Add row label on the right side too (for easier reading)
        const rowLabelRight = document.createElement('span');
        rowLabelRight.classList.add('row-label');
        rowLabelRight.textContent = row;

        rowDiv.appendChild(seatsContainer);
        rowDiv.appendChild(rowLabelRight);
        seatGrid.appendChild(rowDiv);
    });
}


// =============================================
// SEAT SELECTION LOGIC
// =============================================

/**
 * Toggles a seat between "selected" and "available".
 *
 * If the seat is currently available → select it (add to array, change style).
 * If the seat is currently selected → deselect it (remove from array, revert style).
 * After toggling, update the booking summary.
 *
 * @param {string} seatId  - The seat identifier, e.g., "A1"
 * @param {HTMLElement} seatBtn - The seat button DOM element
 */
function toggleSeat(seatId, seatBtn) {

    // Check if this seat is already selected
    const index = selectedSeats.indexOf(seatId);

    if (index === -1) {
        // Seat is NOT selected → select it
        selectedSeats.push(seatId);
        seatBtn.classList.remove('available');
        seatBtn.classList.add('selected');
    } else {
        // Seat IS selected → deselect it
        selectedSeats.splice(index, 1);
        seatBtn.classList.remove('selected');
        seatBtn.classList.add('available');
    }

    // Update the summary bar
    updateSummary();
}


// =============================================
// UPDATE BOOKING SUMMARY
// =============================================

/**
 * Updates the booking summary bar at the bottom of the page.
 *
 * Shows:
 * - List of selected seat names (e.g., "A1, B5, C3")
 * - Total seat count
 * - Total price in ETH
 * - Enables/disables the checkout button
 */
function updateSummary() {

    // Sort the selected seats for clean display (A1 before B2, etc.)
    selectedSeats.sort();

    // Update selected seats text
    if (selectedSeats.length === 0) {
        selectedSeatsDisplay.textContent = 'None';
    } else {
        selectedSeatsDisplay.textContent = selectedSeats.join(', ');
    }

    // Update seat count
    seatCountDisplay.textContent = selectedSeats.length;

    // Calculate and update total price
    const total = selectedSeats.length * PRICE_PER_SEAT;
    totalPriceDisplay.textContent = total.toFixed(3) + ' ETH';

    // Enable or disable the checkout button
    if (selectedSeats.length > 0) {
        checkoutBtn.style.pointerEvents = 'auto';
        checkoutBtn.style.opacity = '1';
    } else {
        checkoutBtn.style.pointerEvents = 'none';
        checkoutBtn.style.opacity = '0.5';
    }
}


// =============================================
// CHECKOUT NAVIGATION
// =============================================

/**
 * When the user clicks "Proceed to Checkout", build the URL
 * with all booking data (movie ID, date, time, seats, total).
 * This passes everything to the checkout page via URL params.
 */
checkoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (selectedSeats.length === 0) return;

    // Read booking params from the current page URL
    const params = new URLSearchParams(window.location.search);
    const total = (selectedSeats.length * PRICE_PER_SEAT).toFixed(3);

    const url = 'checkout.html?id=' + (params.get('id') || '1') +
        '&date=' + encodeURIComponent(params.get('date') || '') +
        '&time=' + encodeURIComponent(params.get('time') || '') +
        '&seats=' + encodeURIComponent(selectedSeats.join(',')) +
        '&total=' + total;

    window.location.href = url;
});


// =============================================
// RESTORE PREVIOUSLY SELECTED SEATS
// =============================================

/**
 * If the user is coming back from the checkout page,
 * the URL will contain a "seats" param (e.g., "A1,B3,C5").
 * We read these and pre-select them so the user sees their
 * previous selection restored.
 */
function restoreSelectedSeats() {
    const params = new URLSearchParams(window.location.search);
    const seatsParam = params.get('seats');
    if (!seatsParam) return;

    // Split the comma-separated seat list
    const seatsToRestore = seatsParam.split(',').map(function(s) {
        return s.trim();
    }).filter(Boolean);

    // Find each seat button and select it
    seatsToRestore.forEach(function(seatId) {
        // Skip if this seat is booked (shouldn't happen, but be safe)
        if (BOOKED_SEATS.includes(seatId)) return;

        const seatBtn = seatGrid.querySelector('[data-seat-id="' + seatId + '"]');
        if (seatBtn && !seatBtn.classList.contains('booked')) {
            selectedSeats.push(seatId);
            seatBtn.classList.remove('available');
            seatBtn.classList.add('selected');
        }
    });
}


// =============================================
// INITIALIZE
// =============================================

// Build the grid when the page loads
buildSeatGrid();

// Restore any previously selected seats (from URL params)
restoreSelectedSeats();

// Update the summary bar (shows restored seats or "None")
updateSummary();
