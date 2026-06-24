(function () {
  'use strict';

  var nav       = document.getElementById('site-nav');
  var lastY     = 0;
  var threshold = 8;

  window.addEventListener('scroll', function () {
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
  }, { passive: true });

}());
