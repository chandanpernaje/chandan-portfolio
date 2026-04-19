import './style.css'

// ── STAR CANVAS ──────────────────────────────
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  for (let i = 0; i < 160; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.004 + 0.001,
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.a += s.speed;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.3 + 0.4 * Math.abs(Math.sin(s.a))})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

resizeCanvas(); initStars(); drawStars();
window.addEventListener('resize', () => { resizeCanvas(); initStars(); });

// ── NAVBAR ───────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  // active nav link highlight
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(sec => {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top && window.scrollY < top + sec.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id);
      });
    }
  });
});

// ── MOBILE MENU ──────────────────────────────
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l =>
  l.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

// ── SCROLL REVEAL ────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('active');
      // Animate skill bars when skills section visible
      if (e.target.id === 'skills' || e.target.closest('#skills')) {
        animateBars();
      }
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── SKILL BARS ───────────────────────────────
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  barsAnimated = true;
  document.querySelectorAll('.bar-fill').forEach(bar => {
    const w = bar.getAttribute('data-w');
    setTimeout(() => { bar.style.width = w + '%'; }, 100);
  });
}

// Also trigger bars when skills section intersects
const skillsSec = document.getElementById('skills');
if (skillsSec) {
  const skillsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) animateBars();
  }, { threshold: 0.15 });
  skillsObs.observe(skillsSec);
}

// ── PROJECT FILTER ───────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projCards  = document.querySelectorAll('.proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projCards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      card.classList.toggle('hidden', filter !== 'all' && cat !== filter);
    });
  });
});

// ── CONTACT FORM ─────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn   = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  setTimeout(() => {
    contactForm.reset();
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    formSuccess.classList.add('show');
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1200);
});

// ── SCROLL TO TOP ────────────────────────────
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── INIT ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();
});
