(function () {
  'use strict';

  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var W, H;

  // 2D flat ribbon colors: white, red, near-black, silver, deep purple, deep blue
  var COLORS = [
    [255, 255, 255],  // white
    [215,   0,   0],  // red
    [ 28,  28,  33],  // near-black
    [188, 194, 200],  // silver
    [ 78,   0, 168],  // deep purple
    [  0,  22, 182],  // deep blue
  ];

  var STEPS = 220;

  function bandW() { return Math.max(W, H) * 0.028; }

  // Static wave shape (no time parameter — never changes)
  function sharedWave(t) {
    var amp = Math.min(W, H) * 0.28;
    return (
      amp * 0.62 * Math.sin(t * 1.5 * Math.PI) +
      amp * 0.26 * Math.sin(t * 3.6 * Math.PI) +
      amp * 0.12 * Math.sin(t * 7.8 * Math.PI)
    );
  }

  function drawBand(colorIdx, perpCenter, bw) {
    var col  = COLORS[colorIdx];
    var D    = Math.sqrt(W * W + H * H);
    var ux   = W / D,  uy = H / D;
    var px   = -uy,    py = ux;
    var half = bw * 0.5;

    ctx.beginPath();

    for (var s = 0; s <= STEPS; s++) {
      var t    = s / STEPS;
      var tExt = t * 1.14 - 0.07;
      var d    = tExt * D;
      var w    = sharedWave(t);
      var x    = ux * d + px * (perpCenter - half + w);
      var y    = uy * d + py * (perpCenter - half + w);
      s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    for (var s2 = STEPS; s2 >= 0; s2--) {
      var t2    = s2 / STEPS;
      var tExt2 = t2 * 1.14 - 0.07;
      var d2    = tExt2 * D;
      var w2    = sharedWave(t2);
      var x2    = ux * d2 + px * (perpCenter + half + w2);
      var y2    = uy * d2 + py * (perpCenter + half + w2);
      ctx.lineTo(x2, y2);
    }

    ctx.closePath();
    ctx.fillStyle = 'rgb(' + col[0] + ',' + col[1] + ',' + col[2] + ')';
    ctx.fill();
  }

  function render() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0d';
    ctx.fillRect(0, 0, W, H);

    var n   = COLORS.length;
    var mid = (n - 1) / 2;
    var bw  = bandW();

    for (var i = 0; i < n; i++) {
      drawBand(i, (i - mid) * bw, bw);
    }

    // Soft vignette for title readability
    var vig = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.72);
    vig.addColorStop(0,    'rgba(13,13,13,0.58)');
    vig.addColorStop(0.55, 'rgba(13,13,13,0.18)');
    vig.addColorStop(1,    'rgba(13,13,13,0.70)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);
  }

  // Redraw on resize so it always fits the screen
  window.addEventListener('resize', render);
  render();

}());
