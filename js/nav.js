(function () {
  'use strict';

  var nav       = document.getElementById('site-nav');
  var lastY     = 0;
  var threshold = 8;
  var ticking   = false;

  function updateNav() {
    ticking = false;
    var currentY = window.pageYOffset;

    // Always show at very top of page
    if (currentY <= 0) {
      nav.classList.remove('nav-hidden');
      lastY = 0;
      return;
    }

    if (Math.abs(currentY - lastY) < threshold) return;

    if (currentY > lastY) {
      nav.classList.add('nav-hidden');     // scrolling down — hide
    } else {
      nav.classList.remove('nav-hidden'); // scrolling up — show
    }

    lastY = currentY;
  }

  // Batch scroll work into one read per animation frame to avoid jank
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Highlight active nav link based on current page
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.nav-links a');
  links.forEach(function (link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('nav-active');
    }
  });

}());
