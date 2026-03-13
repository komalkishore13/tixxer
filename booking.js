/* ================================================
   TIXXER — Booking Pages (Shared Logic)
   Mock data, search, results rendering, select ticket
   ================================================ */

/* ---------- MOCK DATA ---------- */
const MOCK_DATA = {

  movies: {
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'],
    theatres: {
      'Mumbai':    ['PVR Phoenix', 'INOX Nariman Point', 'Cinepolis Andheri'],
      'Delhi':     ['PVR Select City', 'INOX Nehru Place', 'Cinepolis DLF'],
      'Bangalore': ['PVR Orion', 'INOX Garuda', 'Cinepolis Royal Meenakshi'],
      'Chennai':   ['PVR Grand Mall', 'INOX The Marina', 'SPI Palazzo'],
      'Hyderabad': ['PVR Next Galleria', 'INOX GVK One', 'AMB Cinemas'],
    },
    results: [
      { name: 'Interstellar',     time: '10:30 AM', duration: '2h 49m', price: 280, genre: 'Sci-Fi' },
      { name: 'Dune: Part Three', time: '01:15 PM', duration: '2h 35m', price: 350, genre: 'Action' },
      { name: 'The Dark Knight',  time: '04:00 PM', duration: '2h 32m', price: 250, genre: 'Thriller' },
      { name: 'Oppenheimer',      time: '07:30 PM', duration: '3h 00m', price: 320, genre: 'Drama' },
      { name: 'Spider-Man: Beyond', time: '09:45 PM', duration: '2h 20m', price: 300, genre: 'Action' },
      { name: 'Pushpa 3',         time: '11:00 AM', duration: '2h 50m', price: 200, genre: 'Action' },
    ]
  },

  bus: {
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Goa', 'Jaipur', 'Kolkata', 'Ahmedabad'],
    results: [
      { name: 'Volvo Multi-Axle AC Sleeper',  operator: 'RedBus Premium', time: '06:00 PM', duration: '8h 30m', price: 1200 },
      { name: 'AC Seater / Sleeper',           operator: 'VRL Travels',    time: '07:30 PM', duration: '9h 00m', price: 850  },
      { name: 'Non-AC Sleeper',                operator: 'Neeta Travels',  time: '08:00 PM', duration: '10h 15m', price: 550 },
      { name: 'Volvo AC Seater',               operator: 'SRS Travels',    time: '09:15 PM', duration: '7h 45m', price: 950  },
      { name: 'Mercedes Multi-Axle Semi-Sleeper', operator: 'Orange Travels', time: '10:00 PM', duration: '8h 00m', price: 1100 },
      { name: 'AC Sleeper (2+1)',              operator: 'Paulo Travels',  time: '11:00 PM', duration: '9h 30m', price: 1050 },
    ]
  },

  flights: {
    cities: ['Mumbai (BOM)', 'Delhi (DEL)', 'Bangalore (BLR)', 'Chennai (MAA)', 'Hyderabad (HYD)', 'Kolkata (CCU)', 'Goa (GOI)', 'Jaipur (JAI)', 'Pune (PNQ)', 'Kochi (COK)'],
    results: [
      { name: 'IndiGo 6E-2145',    airline: 'IndiGo',     time: '06:15 AM', duration: '2h 10m', price: 4500, class: 'Economy' },
      { name: 'Air India AI-806',   airline: 'Air India',  time: '08:30 AM', duration: '2h 25m', price: 5200, class: 'Economy' },
      { name: 'Vistara UK-945',     airline: 'Vistara',    time: '11:00 AM', duration: '2h 05m', price: 6100, class: 'Premium' },
      { name: 'SpiceJet SG-412',    airline: 'SpiceJet',   time: '02:45 PM', duration: '2h 30m', price: 3800, class: 'Economy' },
      { name: 'Akasa Air QP-1320',  airline: 'Akasa Air',  time: '05:30 PM', duration: '2h 15m', price: 4200, class: 'Economy' },
      { name: 'Air India AI-510',   airline: 'Air India',  time: '09:00 PM', duration: '2h 20m', price: 7500, class: 'Business' },
    ]
  },

  railways: {
    cities: ['Mumbai CST', 'New Delhi', 'Bangalore City', 'Chennai Central', 'Secunderabad', 'Howrah', 'Pune Jn', 'Ahmedabad Jn', 'Jaipur Jn', 'Lucknow NR'],
    results: [
      { name: 'Rajdhani Express',     train: '12951', time: '04:25 PM', duration: '15h 35m', price: 2800, class: '3A' },
      { name: 'Shatabdi Express',     train: '12009', time: '06:00 AM', duration: '5h 30m',  price: 1200, class: 'CC' },
      { name: 'Duronto Express',      train: '12261', time: '11:15 PM', duration: '17h 05m', price: 2400, class: '2A' },
      { name: 'Garib Rath Express',   train: '12216', time: '03:50 PM', duration: '12h 45m', price: 900,  class: '3A' },
      { name: 'Vande Bharat Express', train: '22439', time: '06:00 AM', duration: '8h 00m',  price: 1800, class: 'CC' },
      { name: 'Superfast Express',    train: '12618', time: '07:40 PM', duration: '20h 30m', price: 1500, class: 'SL' },
    ]
  }
};


/* ---------- INITIALIZE PAGE ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const user = checkAuth({ requireAuth: true });
  if (!user) return;

  // Populate navbar user name
  const navName = document.getElementById('navUserName');
  if (navName) navName.textContent = user.name;

  // Detect page type from body data attribute
  const pageType = document.body.dataset.bookingType;
  if (!pageType || !MOCK_DATA[pageType]) return;

  const data = MOCK_DATA[pageType];

  // Populate city dropdowns
  populateDropdowns(pageType, data);

  // Search form handler
  const form = document.getElementById('searchForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      renderResults(pageType, data);
    });
  }

  // Mobile menu
  setupMobileMenu();
});


/* ---------- POPULATE DROPDOWNS ---------- */
function populateDropdowns(type, data) {
  if (type === 'movies') {
    const citySelect = document.getElementById('city');
    const theatreSelect = document.getElementById('theatre');

    if (citySelect && data.cities) {
      data.cities.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        citySelect.appendChild(opt);
      });

      // Update theatres when city changes
      citySelect.addEventListener('change', () => {
        theatreSelect.innerHTML = '<option value="">Select Theatre</option>';
        const theatres = data.theatres[citySelect.value] || [];
        theatres.forEach(t => {
          const opt = document.createElement('option');
          opt.value = t;
          opt.textContent = t;
          theatreSelect.appendChild(opt);
        });
      });
    }
  } else {
    // Bus, flights, railways — from/to dropdowns
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');

    if (fromSelect && data.cities) {
      data.cities.forEach(c => {
        const opt1 = document.createElement('option');
        opt1.value = c; opt1.textContent = c;
        fromSelect.appendChild(opt1);

        const opt2 = document.createElement('option');
        opt2.value = c; opt2.textContent = c;
        toSelect.appendChild(opt2);
      });
    }
  }
}


/* ---------- RENDER RESULTS ---------- */
function renderResults(type, data) {
  const section = document.getElementById('resultsSection');
  const grid = document.getElementById('resultsGrid');
  const countEl = document.getElementById('resultsCount');

  if (!section || !grid) return;

  grid.innerHTML = '';
  section.classList.add('visible');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const results = data.results;
  countEl.textContent = results.length + ' result' + (results.length !== 1 ? 's' : '') + ' found';

  results.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'result-card';

    // Build detail chips based on type
    let detailsHTML = '';
    let tagHTML = '';

    if (type === 'movies') {
      tagHTML = `<span class="result-card-tag">${item.genre}</span>`;
      detailsHTML = `
        <div class="result-detail"><span class="result-detail-label">Showtime</span><span class="result-detail-value">${item.time}</span></div>
        <div class="result-detail"><span class="result-detail-label">Duration</span><span class="result-detail-value">${item.duration}</span></div>
      `;
    } else if (type === 'bus') {
      tagHTML = `<span class="result-card-tag">${item.operator}</span>`;
      detailsHTML = `
        <div class="result-detail"><span class="result-detail-label">Departure</span><span class="result-detail-value">${item.time}</span></div>
        <div class="result-detail"><span class="result-detail-label">Duration</span><span class="result-detail-value">${item.duration}</span></div>
      `;
    } else if (type === 'flights') {
      tagHTML = `<span class="result-card-tag">${item.airline} &middot; ${item.class}</span>`;
      detailsHTML = `
        <div class="result-detail"><span class="result-detail-label">Departure</span><span class="result-detail-value">${item.time}</span></div>
        <div class="result-detail"><span class="result-detail-label">Duration</span><span class="result-detail-value">${item.duration}</span></div>
      `;
    } else if (type === 'railways') {
      tagHTML = `<span class="result-card-tag">Train #${item.train} &middot; ${item.class}</span>`;
      detailsHTML = `
        <div class="result-detail"><span class="result-detail-label">Departure</span><span class="result-detail-value">${item.time}</span></div>
        <div class="result-detail"><span class="result-detail-label">Duration</span><span class="result-detail-value">${item.duration}</span></div>
      `;
    }

    card.innerHTML = `
      <div class="result-card-top">
        <span class="result-card-name">${item.name}</span>
        <span class="result-card-price">₹${item.price.toLocaleString('en-IN')}</span>
      </div>
      ${tagHTML}
      <div class="result-card-details">${detailsHTML}</div>
      <button class="result-card-btn" data-index="${i}">
        Select Ticket
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
      </button>
    `;

    // Stagger animation
    setTimeout(() => card.classList.add('visible'), i * 80);

    grid.appendChild(card);
  });

  // Attach select handlers
  grid.querySelectorAll('.result-card-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      selectTicket(type, results[idx]);
    });
  });
}


/* ---------- SELECT TICKET ---------- */
function selectTicket(type, item) {
  // Gather search context
  const context = { type };

  if (type === 'movies') {
    context.city = document.getElementById('city')?.value || '';
    context.theatre = document.getElementById('theatre')?.value || '';
  } else {
    context.from = document.getElementById('from')?.value || '';
    context.to = document.getElementById('to')?.value || '';
    context.date = document.getElementById('date')?.value || '';
  }

  const booking = { ...context, ...item };
  localStorage.setItem('tixxer_selected_ticket', JSON.stringify(booking));
  window.location.href = 'review-booking.html';
}


/* ---------- MOBILE MENU ---------- */
function setupMobileMenu() {
  const hamburger = document.getElementById('bookHamburger');
  const mobileMenu = document.getElementById('bookMobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}
