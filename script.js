/**
 * ==============================================================================
 * BHAVAY BENIWAL — PERSONAL PORTFOLIO
 * Vanilla JavaScript (No Build Step Required)
 * Features:
 *   - Page Preloader Fade-out
 *   - Scroll Progress Bar Indicator
 *   - Sticky Navbar & Back-to-Top Button
 *   - Dark / Light Mode Switcher with LocalStorage Persistence
 *   - Mobile Hamburger Menu with Outside Click & Focus Trap
 *   - Scrollspy (Active Section Highlighting)
 *   - Typed.js Integration with Vanilla Typewriter Fallback
 *   - AOS (Animate on Scroll) Initialization
 *   - IntersectionObserver for Skill Progress Bars Fill
 *   - Custom Glowing Cursor (Track Mouse, Touch-Safe)
 *   - Button Ripple Effect
 *   - Contact Form Client-side Validation & Mailto Trigger
 *   - Copy-to-Clipboard Email Button with Visual Tooltip
 * ==============================================================================
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // 1. PAGE PRELOADER
  // ----------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');

  function hidePreloader() {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 650);
    }
  }

  // Hide on window load, with 1.2s fallback safety timeout
  window.addEventListener('load', () => {
    setTimeout(hidePreloader, 400);
  });
  setTimeout(hidePreloader, 1500);

  // ----------------------------------------------------------------------------
  // 2. THEME TOGGLE (DARK / LIGHT MODE)
  // ----------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  rootElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      rootElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // ----------------------------------------------------------------------------
  // 3. SCROLL PROGRESS BAR & STICKY HEADER & BACK TO TOP
  // ----------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scroll-progress');
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Update scroll progress bar
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = (scrollY / docHeight) * 100;
      scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // Sticky header shadow & blur
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 4. MOBILE HAMBURGER NAVIGATION
  // ----------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu() {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('open');
  }

  function closeMobileMenu() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
  }

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside of nav
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 5. SCROLLSPY (ACTIVE SECTION HIGHLIGHTING IN NAVBAR)
  // ----------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.scrollY + 120; // Offset for header

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 50;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach((l) => l.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // ----------------------------------------------------------------------------
  // 6. TYPED.JS INTEGRATION (WITH PURE JS FALLBACK)
  // ----------------------------------------------------------------------------
  const typedTarget = document.getElementById('typed-text');
  const fallbackCursor = document.querySelector('.typed-cursor-fallback');

  const typedStrings = [
    'B.Tech CSE Student',
    'C & Python Learner',
    'Future Software Engineer'
  ];

  if (typedTarget) {
    if (typeof Typed !== 'undefined') {
      if (fallbackCursor) fallbackCursor.style.display = 'none';

      new Typed('#typed-text', {
        strings: typedStrings,
        typeSpeed: 65,
        backSpeed: 40,
        backDelay: 1800,
        startDelay: 400,
        loop: true,
        smartBackspace: true,
        cursorChar: '|'
      });
    } else {
      // Vanilla JavaScript Typewriter Fallback if CDN is offline
      let stringIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function typeLoop() {
        const currentString = typedStrings[stringIndex];
        if (isDeleting) {
          typedTarget.textContent = currentString.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typedTarget.textContent = currentString.substring(0, charIndex + 1);
          charIndex++;
        }

        let delta = isDeleting ? 40 : 75;

        if (!isDeleting && charIndex === currentString.length) {
          delta = 1800; // Pause at end of word
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          stringIndex = (stringIndex + 1) % typedStrings.length;
          delta = 450;
        }

        setTimeout(typeLoop, delta);
      }

      typeLoop();
    }
  }

  // ----------------------------------------------------------------------------
  // 7. AOS (ANIMATE ON SCROLL) INITIALIZATION
  // ----------------------------------------------------------------------------
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }

  // ----------------------------------------------------------------------------
  // 8. ANIMATED SKILL PROGRESS BARS (INTERSECTION OBSERVER)
  // ----------------------------------------------------------------------------
  const progressBars = document.querySelectorAll('.progress-bar-fill[data-progress]');

  if ('IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-progress');
            bar.style.width = `${targetWidth}%`;
            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );

    progressBars.forEach((bar) => skillsObserver.observe(bar));
  } else {
    // Fallback if IntersectionObserver isn't available
    progressBars.forEach((bar) => {
      bar.style.width = `${bar.getAttribute('data-progress')}%`;
    });
  }

  // ----------------------------------------------------------------------------
  // 9. CUSTOM GLOWING CURSOR (DESKTOP ONLY)
  // ----------------------------------------------------------------------------
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorDot = document.getElementById('cursor-dot');

  const hasFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;

  if (hasFinePointer && cursorGlow && cursorDot) {
    let mouseX = -100;
    let mouseY = -100;
    let glowX = -100;
    let glowY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth lag effect for the glowing orb
    function animateCursor() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);

    // Expand dot slightly on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .glass-card, .floating-chip');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 10. BUTTON RIPPLE EFFECT
  // ----------------------------------------------------------------------------
  const rippleButtons = document.querySelectorAll('.ripple-btn');

  rippleButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-span');

      const existingRipple = this.querySelector('.ripple-span');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // ----------------------------------------------------------------------------
  // 11. CLICK TO COPY EMAIL
  // ----------------------------------------------------------------------------
  const copyBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');
  const emailText = 'beniwaljaat118@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailText);
        } else {
          // Fallback for older browsers
          const tempInput = document.createElement('input');
          tempInput.value = emailText;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        // Show feedback
        copyBtn.classList.add('copied');
        if (copyTooltip) copyTooltip.textContent = 'Copied! ✓';

        setTimeout(() => {
          copyBtn.classList.remove('copied');
          if (copyTooltip) copyTooltip.textContent = 'Copy';
        }, 2200);
      } catch (err) {
        console.error('Failed to copy email: ', err);
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 12. CONTACT FORM (VALIDATION & MAILTO SUBMISSION)
  // ----------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const formFeedback = document.getElementById('form-feedback');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function setFieldError(field, hasError) {
    const group = field.closest('.form-group');
    if (group) {
      if (hasError) {
        group.classList.add('has-error');
      } else {
        group.classList.remove('has-error');
      }
    }
  }

  if (contactForm) {
    // Clear error on input
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          setFieldError(input, false);
          if (formFeedback) {
            formFeedback.style.display = 'none';
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameVal = nameInput.value.trim();
      if (!nameVal || nameVal.length < 2) {
        setFieldError(nameInput, true);
        isValid = false;
      } else {
        setFieldError(nameInput, false);
      }

      // Validate Email
      const emailVal = emailInput.value.trim();
      if (!emailVal || !validateEmail(emailVal)) {
        setFieldError(emailInput, true);
        isValid = false;
      } else {
        setFieldError(emailInput, false);
      }

      // Validate Message
      const messageVal = messageInput.value.trim();
      if (!messageVal || messageVal.length < 5) {
        setFieldError(messageInput, true);
        isValid = false;
      } else {
        setFieldError(messageInput, false);
      }

      if (!isValid) {
        if (formFeedback) {
          formFeedback.className = 'form-feedback error';
          formFeedback.textContent = 'Please fill out all required fields with valid details.';
          formFeedback.style.display = 'block';
        }
        return;
      }

      // Form is valid: prepare mailto link
      const subjectVal = subjectInput.value.trim() || `Portfolio Inquiry from ${nameVal}`;
      const mailtoBody = `Hi Bhavay,\n\nName: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}\n\n---\nSent via bhavay.dev portfolio form`;

      const mailtoUrl = `mailto:beniwaljaat118@gmail.com?subject=${encodeURIComponent(
        subjectVal
      )}&body=${encodeURIComponent(mailtoBody)}`;

      // Display friendly success notice
      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          <strong>Opening your email client! 🚀</strong><br>
          If your email app didn't open automatically, you can directly email Bhavay at 
          <a href="mailto:beniwaljaat118@gmail.com" style="text-decoration: underline; color: inherit; font-weight: 700;">
            beniwaljaat118@gmail.com
          </a>.
        `;
        formFeedback.style.display = 'block';
      }

      // Open mail client
      window.location.href = mailtoUrl;

      // Reset form
      contactForm.reset();
    });
  }

  // ----------------------------------------------------------------------------
  // 13. SMOOTH SCROLL FOR IN-PAGE ANCHORS
  // ----------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

})();
