/* ================================================
   TIXXER — Session Management
   Reusable auth helpers: checkAuth, logout, getCurrentUser
   ================================================ */

const SESSION_KEY = 'currentUser';

/**
 * Get the currently logged-in user object, or null.
 */
function getCurrentUser() {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Check if a user is authenticated.
 * @param {Object} opts
 * @param {boolean} opts.requireAuth  - If true, redirects to login.html when not logged in.
 * @param {boolean} opts.redirectIfAuth - If true, redirects to index.html when already logged in.
 */
function checkAuth({ requireAuth = false, redirectIfAuth = false } = {}) {
  const user = getCurrentUser();

  if (requireAuth && !user) {
    window.location.href = 'login.html';
    return null;
  }

  if (redirectIfAuth && user) {
    window.location.href = 'index.html';
    return user;
  }

  return user;
}

/**
 * Log out: clear session and redirect to landing page.
 */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'index.html';
}

/* --------------------------------------------------
   Auto-update navbar based on login state.
   Works on any page that includes this script.
   -------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const user = getCurrentUser();
  if (!user) return;

  // ---- Desktop navbar (.nav-login button) ----
  const navLogin = document.querySelector('.nav-login');
  if (navLogin) {
    // Replace the Login link with user greeting + logout
    const wrapper = document.createElement('div');
    wrapper.className = 'nav-user';
    wrapper.innerHTML = `
      <span class="nav-user-name">${user.name}</span>
      <button class="nav-logout-btn" onclick="logout()">Logout</button>
    `;
    navLogin.replaceWith(wrapper);
  }

  // ---- Mobile menu (last link is Login) ----
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    const loginLink = mobileMenu.querySelector('a[href="login.html"]');
    if (loginLink) {
      loginLink.textContent = 'Logout';
      loginLink.href = '#';
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    }
  }

  // ---- Auth page navbar (.nav-back area) ----
  const authNav = document.querySelector('.auth-navbar .nav-back');
  if (authNav) {
    // Auth pages handle their own redirect logic via checkAuth,
    // so no extra nav swap needed here.
  }
});
