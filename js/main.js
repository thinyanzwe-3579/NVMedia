// ═══════════════════════════════════════════════════════════════
//  main.js — Home page: renders the event cards grid
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const grid = document.getElementById('events-grid');
  if (!grid) return;

  // Guard: no events defined
  if (!Array.isArray(EVENTS) || EVENTS.length === 0) {
    grid.innerHTML =
      '<p style="color:var(--text-muted);letter-spacing:.15em;font-size:.85rem;">' +
      'No events yet — add some in js/data.js</p>';
    return;
  }

  var isHome = (window.location.pathname.split('/').pop() || 'index.html') === 'index.html';
  var list   = isHome ? EVENTS.filter(function (e) { return e.featured !== false; }) : EVENTS;

  list.forEach(function (event) {
    // Build the card element
    const card = document.createElement('a');
    card.href      = 'event.html?event=' + encodeURIComponent(event.slug);
    card.className = 'event-card' + (event.cover ? '' : ' no-cover');
    card.setAttribute('aria-label', event.name);

    // Cover image
    const imgHTML = event.cover
      ? '<img src="' + event.cover + '" alt="' + event.name + '" loading="lazy">'
      : '';

    // Optional date meta
    const metaHTML = event.date
      ? '<span class="event-card-meta">' + event.date + '</span>'
      : '';

    card.innerHTML =
      imgHTML +
      '<div class="event-card-overlay">' +
        '<span class="event-card-name">' + event.name + '</span>' +
        metaHTML +
      '</div>';

    grid.appendChild(card);
  });

}());
