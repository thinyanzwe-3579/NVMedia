// ═══════════════════════════════════════════════════════════════
//  event.js — Event gallery page: renders photos + lightbox
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── 1. Read the event slug from the URL ──────────────────────
  var params   = new URLSearchParams(window.location.search);
  var slug     = params.get('event');
  var event    = (Array.isArray(EVENTS) ? EVENTS : []).find(function (e) {
    return e.slug === slug;
  });

  // ── 2. Grab DOM references ───────────────────────────────────
  var titleEl    = document.getElementById('event-title');
  var dateEl     = document.getElementById('event-date');
  var navTitleEl = document.getElementById('event-nav-title');
  var headerEl   = document.getElementById('event-header');
  var gridEl     = document.getElementById('gallery-grid');
  var lightbox   = document.getElementById('lightbox');
  var lbImg      = document.getElementById('lightbox-img');
  var lbCounter  = document.getElementById('lightbox-counter');
  var lbClose    = document.getElementById('lightbox-close');
  var lbPrev     = document.getElementById('lightbox-prev');
  var lbNext     = document.getElementById('lightbox-next');

  // ── 3. Handle "not found" ────────────────────────────────────
  if (!event) {
    document.title      = 'Event not found';
    titleEl.textContent = 'Event not found';
    dateEl.textContent  = 'Check that the URL slug matches an entry in data.js';
    return;
  }

  // ── 4. Populate page text ────────────────────────────────────
  document.title      = event.name + ' | Automotive Photography';
  titleEl.textContent = event.name;

  if (event.date) {
    dateEl.textContent = event.date;
  }

  // ── 5. Event header background ───────────────────────────────
  if (event.cover) {
    var bgImg    = document.createElement('img');
    bgImg.src    = event.cover;
    bgImg.alt    = '';
    bgImg.className = 'event-header-bg';
    bgImg.fetchPriority = 'high';   // hero banner is the LCP element — load it first
    headerEl.insertBefore(bgImg, headerEl.firstChild);
  }

  // ── 6. Build the photo grid ──────────────────────────────────
  var currentIndex = 0;
  var photos       = Array.isArray(event.photos) ? event.photos : [];

  // Map a full-size path "photos/<slug>/<file>" to its lightweight
  // grid thumbnail "photos/<slug>/thumb/<file>" (~1000px, generated offline).
  // The grid shows thumbnails (fast); the lightbox loads the full original.
  function thumb(path) {
    return path.replace(/\/([^\/]+)$/, '/thumb/$1');
  }

  if (photos.length === 0) {
    gridEl.innerHTML =
      '<p style="color:var(--text-muted);letter-spacing:.15em;font-size:.85rem;padding:2rem 0;">' +
      'No photos in this event yet.</p>';
  }

  var wideSet = new Set(Array.isArray(event.widePhotos) ? event.widePhotos : []);

  photos.forEach(function (src, i) {
    var isWide  = wideSet.has(src);
    var item    = document.createElement('div');
    item.className = isWide ? 'gallery-item gallery-item--wide' : 'gallery-item';
    item.tabIndex  = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'Open photo ' + (i + 1));

    var img   = document.createElement('img');
    img.src   = isWide ? src : thumb(src);
    img.alt   = event.name + ' — photo ' + (i + 1);
    img.loading  = 'lazy';
    img.decoding = 'async';

    item.appendChild(img);

    // Open lightbox on click or Enter/Space
    item.addEventListener('click', function () { openLightbox(i); });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });

    gridEl.appendChild(item);
  });

  // ── 7. Lightbox helpers ──────────────────────────────────────

  function openLightbox(index) {
    currentIndex = index;
    refreshLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function refreshLightbox() {
    lbImg.src = photos[currentIndex];
    lbImg.alt = event.name + ' — photo ' + (currentIndex + 1);
    lbCounter.textContent = (currentIndex + 1) + ' / ' + photos.length;

    // Warm the browser cache for the neighbours so Prev/Next feel instant.
    if (photos.length > 1) {
      new Image().src = photos[(currentIndex + 1) % photos.length];
      new Image().src = photos[(currentIndex - 1 + photos.length) % photos.length];
    }
  }

  function prevPhoto() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    refreshLightbox();
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    refreshLightbox();
  }

  // ── 8. Lightbox event listeners ──────────────────────────────

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  prevPhoto);
  lbNext.addEventListener('click',  nextPhoto);

  // Click outside the image to close
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard: Escape / Arrow keys
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   prevPhoto();
    if (e.key === 'ArrowRight')  nextPhoto();
  });

  // Touch / swipe support
  var touchStartX = null;

  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 50) {
      delta < 0 ? nextPhoto() : prevPhoto();
    }
    touchStartX = null;
  }, { passive: true });

}());
