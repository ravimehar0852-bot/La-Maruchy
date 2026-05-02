/* =============================================
   LA MARUCHY — Main JavaScript
   ============================================= */

/* ── SPA Router ── */
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-page]');

function navigateTo(pageId) {
  // Hide all pages
  pages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Highlight active nav link
  document.querySelectorAll('[data-page="' + pageId + '"]').forEach(l => {
    l.classList.add('active');
  });

  // Re-run animations
  animateOnScroll();

  // Close mobile menu if open
  closeMobileMenu();
}

// Attach click events to all nav links
document.addEventListener('click', function(e) {
  const link = e.target.closest('[data-page]');
  if (link) {
    e.preventDefault();
    navigateTo(link.dataset.page);
  }
});

/* ── Navbar scroll effect ── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── Mobile menu ── */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Menu Tabs ── */
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCats = document.querySelectorAll('.menu-category');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    menuCats.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const cat = document.getElementById('cat-' + btn.dataset.tab);
    if (cat) cat.classList.add('active');
  });
});

/* ── Gallery Lightbox ── */
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const emoji = item.querySelector('.gallery-item-inner').textContent;
    const label = item.querySelector('.gallery-overlay span')?.textContent || '';
    lightboxContent.innerHTML = `<div style="font-size:8rem">${emoji}</div><p style="color:#fff;font-family:'Playfair Display',serif;font-size:1.2rem;margin-top:1rem">${label}</p>`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', function(e) {
  if (e.target === this) closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ── Contact Form ── */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate sending
  setTimeout(() => {
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
  }, 1200);
});

/* ── Scroll animations ── */
function animateOnScroll() {
  const els = document.querySelectorAll('.card, .menu-item, .value-card, .testimonial-card, .gallery-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });
}

// Initialize on load
window.addEventListener('load', () => {
  navigateTo('home');
  animateOnScroll();
});
