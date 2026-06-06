/* ============================================
   PORTFOLIO — Main JavaScript
   Premium animations & interactions
   ============================================ */

(function () {
  'use strict';

  // ========== PRELOADER ==========
  var preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      preloader.classList.add('hidden');
      document.body.classList.remove('no-scroll');
    }, 1600);
  });

  // ========== THEME SWITCHER ==========
  var themeToggle = document.getElementById('themeToggle');
  var themePanel = document.getElementById('themePanel');
  var themeOptions = document.querySelectorAll('.theme-switcher__option');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    themeOptions.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
    // Reinitialize particles with new color
    if (typeof initParticles === 'function') initParticles();
  }

  var savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    themePanel.classList.toggle('open');
  });

  themeOptions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(this.getAttribute('data-theme'));
      themePanel.classList.remove('open');
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.theme-switcher')) {
      themePanel.classList.remove('open');
    }
  });

  // ========== CUSTOM CURSOR ==========
  var cursor = document.getElementById('cursor');
  var follower = document.getElementById('cursorFollower');
  var cx = 0, cy = 0, fx = 0, fy = 0;

  if (window.innerWidth > 900) {
    document.addEventListener('mousemove', function (e) {
      cx = e.clientX;
      cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
    });

    (function animateFollower() {
      fx += (cx - fx) * 0.12;
      fy += (cy - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top = fy + 'px';
      requestAnimationFrame(animateFollower);
    })();

    // Hover effects on interactive elements
    var hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-chip, .filter-btn, [data-magnetic]');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () { follower.classList.add('hover'); });
      el.addEventListener('mouseleave', function () { follower.classList.remove('hover'); });
    });
  }

  // ========== SCROLL PROGRESS BAR ==========
  var scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = percent + '%';
  }

  // ========== HEADER SCROLL EFFECT ==========
  var header = document.getElementById('header');
  var lastScroll = 0;

  function onScroll() {
    var scrollY = window.scrollY;
    header.classList.toggle('header--scrolled', scrollY > 20);

    // Hide header on scroll down, show on scroll up
    if (scrollY > 400) {
      if (scrollY > lastScroll + 5) {
        header.classList.add('header--hidden');
      } else if (scrollY < lastScroll - 5) {
        header.classList.remove('header--hidden');
      }
    } else {
      header.classList.remove('header--hidden');
    }
    lastScroll = scrollY;

    updateScrollProgress();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ========== BACK TO TOP ==========
  var backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== MOBILE MENU ==========
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function toggleMenu() {
    var isOpen = nav.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    overlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    nav.classList.remove('open');
    burger.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  nav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // ========== ACTIVE NAV LINK ON SCROLL ==========
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    var scrollPos = window.scrollY + 150;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ========== TYPING ANIMATION ==========
  var typedEl = document.getElementById('typedText');
  var roles = [
    'Full-Time Lecturer at BRAC University',
    'MAMBA Lab Researcher',
    'Sessional Instructor at University of Manitoba',
    'Software Engineer',
    'Educator and Mentor'
  ];
  var roleIndex = 0, charIndex = 0, isDeleting = false;

  function typeRole() {
    var currentRole = roles[roleIndex];
    if (isDeleting) {
      typedEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    var delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 500;
    }

    setTimeout(typeRole, delay);
  }

  setTimeout(typeRole, 1800);

  // ========== SCROLL REVEAL ==========
  var revealElements = document.querySelectorAll(
    '.reveal-slide, .reveal-scale, .split-text'
  );

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ========== ANIMATED COUNTERS ==========
  var counters = document.querySelectorAll('.impact__number[data-target]');

  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  // ========== STAGGERED REVEAL ==========
  var gridContainers = document.querySelectorAll(
    '.projects__grid, .research__grid, .skills__grid, .impact__grid, .achievements__list, .talks__grid'
  );

  gridContainers.forEach(function (grid) {
    var children = grid.children;
    for (var i = 0; i < children.length; i++) {
      children[i].style.transitionDelay = (i * 0.1) + 's';
    }
  });

  // ========== PROJECT FILTER ==========
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      projectCards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeSlideUp .4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ========== PROJECT CARD GLOW EFFECT ==========
  projectCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });

  // ========== PROJECT MODALS ==========
  var modalOverlay = document.getElementById('modalOverlay');
  var modalBody = document.getElementById('modalBody');
  var modalClose = document.getElementById('modalClose');

  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var templateId = this.getAttribute('data-open-modal');
      var template = document.getElementById(templateId);
      if (template) {
        modalBody.innerHTML = template.innerHTML;
        modalOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
      }
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // ========== TESTIMONIAL SLIDER ==========
  var track = document.getElementById('testimonialTrack');
  var slides = track ? track.children : [];
  var prevBtn = document.getElementById('sliderPrev');
  var nextBtn = document.getElementById('sliderNext');
  var dotsContainer = document.getElementById('sliderDots');
  var currentSlide = 0;

  if (slides.length > 0 && dotsContainer) {
    // Create dots
    for (var i = 0; i < slides.length; i++) {
      var dot = document.createElement('div');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('data-index', i);
      dotsContainer.appendChild(dot);
    }

    var dots = dotsContainer.querySelectorAll('.slider-dot');

    function goToSlide(index) {
      currentSlide = index;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function (d, j) {
        d.classList.toggle('active', j === index);
      });
    }

    prevBtn.addEventListener('click', function () {
      goToSlide(currentSlide > 0 ? currentSlide - 1 : slides.length - 1);
    });

    nextBtn.addEventListener('click', function () {
      goToSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
    });

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goToSlide(parseInt(this.getAttribute('data-index')));
      });
    });

    // Auto-advance slider
    setInterval(function () {
      if (!document.hidden) {
        goToSlide(currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
      }
    }, 6000);
  }

  // ========== PARTICLE BACKGROUND ==========
  var canvas = document.getElementById('particlesCanvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var particles = [];

  function initParticles() {
    if (!canvas || !ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];

    var count = Math.min(Math.floor(window.innerWidth / 15), 80);
    var style = getComputedStyle(document.documentElement);
    var accentRgb = style.getPropertyValue('--color-accent-rgb').trim() || '108,140,255';

    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        rgb: accentRgb
      });
    }
  }

  function drawParticles() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.rgb + ',0.3)';
      ctx.fill();

      // Draw connections
      for (var j = i + 1; j < particles.length; j++) {
        var p2 = particles[j];
        var dx = p.x - p2.x;
        var dy = p.y - p2.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(' + p.rgb + ',' + (0.08 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }

  initParticles();
  drawParticles();

  window.addEventListener('resize', function () {
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });

  // ========== TILT EFFECT ON PROJECT CARDS ==========
  if (window.innerWidth > 900) {
    document.querySelectorAll('.tilt-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = ((y - centerY) / centerY) * -4;
        var rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // ========== MAGNETIC BUTTON EFFECT ==========
  if (window.innerWidth > 900) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = 'translate(' + (x * 0.2) + 'px,' + (y * 0.2) + 'px)';
      });

      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
      });
    });
  }

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ========== PARALLAX ON HERO SHAPES ==========
  if (window.innerWidth > 900) {
    var shapes = document.querySelectorAll('.shape');
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      shapes.forEach(function (shape, i) {
        var speed = (i + 1) * 0.05;
        shape.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
      });
    }, { passive: true });
  }

})();
