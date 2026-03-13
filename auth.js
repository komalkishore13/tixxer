/* ================================================
   TIXXER — Authentication Logic
   Form validation + backend API calls
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- CROSS-SITE REDIRECT: Check if user came from a sub-site ----------
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get('redirect');

  /**
   * After successful login/signup, redirect back to the sub-site
   * with auth data encoded in URL, or go to index.html.
   */
  function redirectAfterAuth(user) {
    if (redirectUrl) {
      // Encode user data and send back to the sub-site
      const authData = btoa(JSON.stringify({
        _id: user._id,
        name: user.name,
        email: user.email
      }));
      const separator = redirectUrl.includes('?') ? '&' : '?';
      window.location.href = redirectUrl + separator + 'tixxer_auth=' + authData;
    } else {
      window.location.href = 'index.html';
    }
  }


  // ---------- UTILITY: Show toast notification ----------
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = 'toast';
    toast.classList.add(`toast-${type}`, 'show');

    setTimeout(() => toast.classList.remove('show'), 3000);
  }


  // ---------- UTILITY: Set / clear field error ----------
  function setError(groupId, errorId, message) {
    const group = document.getElementById(groupId);
    const error = document.getElementById(errorId);
    if (group) group.classList.add('error');
    if (error) {
      error.textContent = message;
      error.style.display = 'block';
    }
  }

  function clearAllErrors() {
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(e => {
      e.textContent = '';
      e.style.display = 'none';
    });
  }


  // ---------- UTILITY: Email validation ----------
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


  // ---------- UTILITY: Save session to localStorage ----------
  function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify({
      _id: user._id,
      name: user.name,
      email: user.email,
      totalSpent: user.totalSpent
    }));
  }


  // ---------- REDIRECT IF ALREADY LOGGED IN ----------
  const existingUser = getCurrentUser();
  if (existingUser) {
    // If came from a sub-site, send them back with auth data
    if (redirectUrl) {
      redirectAfterAuth(existingUser);
    } else {
      window.location.href = 'index.html';
    }
    return;
  }


  // ---------- PASSWORD TOGGLE ----------
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.password-wrapper');
      const input = wrapper.querySelector('input');
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      btn.innerHTML = isPassword
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
             <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
             <line x1="1" y1="1" x2="23" y2="23"/>
           </svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
             <circle cx="12" cy="12" r="3"/>
           </svg>`;
    });
  });


  // ---------- CLEAR ERRORS ON INPUT ----------
  document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group) {
        group.classList.remove('error');
        const errMsg = group.querySelector('.error-message');
        if (errMsg) {
          errMsg.textContent = '';
          errMsg.style.display = 'none';
        }
      }
    });
  });


  // =============================================
  //  SIGNUP FORM — calls POST /auth/signup
  // =============================================
  const signupForm = document.getElementById('signupForm');

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAllErrors();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirm = document.getElementById('confirmPassword').value;

      let valid = true;

      if (!name) { setError('nameGroup', 'nameError', 'Name is required.'); valid = false; }
      else if (name.length < 2) { setError('nameGroup', 'nameError', 'Name must be at least 2 characters.'); valid = false; }

      if (!email) { setError('emailGroup', 'emailError', 'Email is required.'); valid = false; }
      else if (!isValidEmail(email)) { setError('emailGroup', 'emailError', 'Enter a valid email address.'); valid = false; }

      if (!password) { setError('passwordGroup', 'passwordError', 'Password is required.'); valid = false; }
      else if (password.length < 6) { setError('passwordGroup', 'passwordError', 'Password must be at least 6 characters.'); valid = false; }

      if (!confirm) { setError('confirmGroup', 'confirmError', 'Please confirm your password.'); valid = false; }
      else if (password !== confirm) { setError('confirmGroup', 'confirmError', 'Passwords do not match.'); valid = false; }

      if (!valid) return;

      const btn = document.getElementById('signupBtn');
      btn.classList.add('loading');

      try {
        const data = await apiSignup(name, email, password);

        if (data.error) {
          btn.classList.remove('loading');
          // Map backend errors to the right field
          if (data.error.toLowerCase().includes('email')) {
            setError('emailGroup', 'emailError', data.error);
          } else {
            showToast(data.error, 'error');
          }
          return;
        }

        setCurrentUser(data.user);
        showToast('Account created! Redirecting...', 'success');

        setTimeout(() => {
          redirectAfterAuth(data.user);
        }, 1000);
      } catch (err) {
        btn.classList.remove('loading');
        showToast('Could not connect to server.', 'error');
      }
    });
  }


  // =============================================
  //  LOGIN FORM — calls POST /auth/login
  // =============================================
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAllErrors();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      let valid = true;

      if (!email) { setError('emailGroup', 'emailError', 'Email is required.'); valid = false; }
      else if (!isValidEmail(email)) { setError('emailGroup', 'emailError', 'Enter a valid email address.'); valid = false; }

      if (!password) { setError('passwordGroup', 'passwordError', 'Password is required.'); valid = false; }

      if (!valid) return;

      const btn = document.getElementById('loginBtn');
      btn.classList.add('loading');

      try {
        const data = await apiLogin(email, password);

        if (data.error) {
          btn.classList.remove('loading');
          if (data.error.toLowerCase().includes('email') || data.error.toLowerCase().includes('account')) {
            setError('emailGroup', 'emailError', data.error);
          } else if (data.error.toLowerCase().includes('password')) {
            setError('passwordGroup', 'passwordError', data.error);
          } else {
            showToast(data.error, 'error');
          }
          return;
        }

        setCurrentUser(data.user);
        showToast('Login successful! Redirecting...', 'success');

        setTimeout(() => {
          redirectAfterAuth(data.user);
        }, 1000);
      } catch (err) {
        btn.classList.remove('loading');
        showToast('Could not connect to server.', 'error');
      }
    });
  }

});
