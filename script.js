/* ================================================
   TIXXER — Landing Page Scripts
   Scroll reveals, navbar, mobile menu, parallax
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- NAVBAR SCROLL EFFECT ----------
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add background on scroll
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });


  // ---------- HERO IMAGE ZOOM ----------
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    // Trigger the slow zoom-out after load
    if (heroImg.complete) {
      heroImg.classList.add('loaded');
    } else {
      heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
    }
  }


  // ---------- MOBILE MENU ----------
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }


  // ---------- SCROLL REVEAL (Intersection Observer) ----------
  const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-fade');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger animation for sibling elements in the same container
        const parent = entry.target.closest('.feature-container, .cta-content');
        if (parent) {
          const siblings = parent.querySelectorAll('.reveal-left, .reveal-right, .reveal-fade');
          siblings.forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 150);
          });
        } else {
          entry.target.classList.add('revealed');
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ---------- SMOOTH SCROLL for nav links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 20;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  // ---------- PARALLAX on hero (subtle) ----------
  const hero = document.getElementById('hero');
  const heroBg = document.querySelector('.hero-bg');

  if (hero && heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        // Parallax — background moves slower
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }


  // ---------- ACTIVE NAV LINK HIGHLIGHTING ----------
  const sections = document.querySelectorAll('.feature-section, .cta-section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--text-white)'
            : '';
        });
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(section => sectionObserver.observe(section));


  // ---------- SMOOTH PAGE TRANSITION for external links ----------
  document.querySelectorAll('a.feature-btn').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.add('page-leaving');
      setTimeout(() => {
        window.location.href = href;
      }, 450);
    });
  });

  // Fade-in on page load / back-navigation
  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-leaving');
  });

});
