/* ============================================
   TweeFiets — Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Lucide Icons --- */
  lucide.createIcons();

  /* --- Navbar scroll --- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* --- Mobile nav --- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => links.classList.toggle('active'));
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('active'));
  });

  /* --- GSAP Animations --- */
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-animate]').forEach(el => {
    const type = el.dataset.animate;
    const delay = parseFloat(el.dataset.delay) || 0;
    let from = { opacity: 0, duration: 0.8, delay };

    switch (type) {
      case 'fade-up':    from.y = 40; break;
      case 'fade-down':  from.y = -40; break;
      case 'fade-left':  from.x = 60; break;
      case 'fade-right': from.x = -60; break;
      default:           from.y = 30;
    }

    gsap.from(el, {
      ...from,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  /* --- Before / After Slider --- */
  const container = document.getElementById('baContainer');
  const clip = document.getElementById('baClip');
  const slider = document.getElementById('baSlider');

  if (container && clip && slider) {
    let isDragging = false;

    function setPosition(x) {
      const rect = container.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      clip.style.width = pct + '%';
      slider.style.left = pct + '%';
    }

    container.addEventListener('mousedown', e => {
      isDragging = true;
      setPosition(e.clientX);
    });
    window.addEventListener('mousemove', e => {
      if (isDragging) setPosition(e.clientX);
    });
    window.addEventListener('mouseup', () => { isDragging = false; });

    container.addEventListener('touchstart', e => {
      isDragging = true;
      setPosition(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (isDragging) setPosition(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });
  }

  /* --- Smooth scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});