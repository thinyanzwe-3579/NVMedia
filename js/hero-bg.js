(function () {
  'use strict';

  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var bands = [];
  var W, H;

  // Automotive pixel-stretch palette
  // Warm tones (taillights, brake glow) + cool tones (headlights, neon)
  var PALETTE = [
    [220,  15,  15],  // deep red
    [255,  40,   0],  // orange-red
    [255,  90,   0],  // orange
    [255, 170,   0],  // amber
    [255,  20,  70],  // hot pink / brake light
    [200,   0, 200],  // purple
    [  0, 180, 255],  // ice blue (headlights)
    [  0, 100, 220],  // deep blue
    [255,  50,  30],  // coral red
    [220, 220, 220],  // chrome / silver flash
  ];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildBands();
  }

  function buildBands() {
    bands = [];
    // One band roughly every 2–3px for density
    var count = Math.floor(H / 2.5);

    for (var i = 0; i < count; i++) {
      var col      = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      var baseA    = Math.random() * 0.22 + 0.02;
      bands.push({
        y:           Math.random() * H,
        h:           Math.random() * 5 + 0.5,   // 0.5 – 5.5 px tall
        r: col[0], g: col[1], b: col[2],
        alpha:       baseA,
        alphaTarget: Math.random() * 0.28 + 0.02,
        alphaSpeed:  Math.random() * 0.004 + 0.0008,
        // How wide the band stretches (60 – 100 % of canvas width)
        spread:      Math.random() * 0.4 + 0.6,
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);

    // Solid dark base
    ctx.fillStyle = '#0d0d0d';
    ctx.fillRect(0, 0, W, H);

    // Draw each horizontal band with a center-to-edge fade
    for (var i = 0; i < bands.length; i++) {
      var b  = bands[i];

      // Slowly breathe alpha toward target
      var diff = b.alphaTarget - b.alpha;
      b.alpha += diff * b.alphaSpeed * 12;
      if (Math.abs(diff) < 0.004) {
        b.alphaTarget = Math.random() * 0.28 + 0.02;
      }

      var halfW = W * b.spread * 0.5;
      var cx    = W * 0.5;
      var rgba  = b.r + ',' + b.g + ',' + b.b;

      var grd = ctx.createLinearGradient(cx - halfW, 0, cx + halfW, 0);
      grd.addColorStop(0,    'rgba(' + rgba + ',0)');
      grd.addColorStop(0.12, 'rgba(' + rgba + ',' + b.alpha + ')');
      grd.addColorStop(0.88, 'rgba(' + rgba + ',' + b.alpha + ')');
      grd.addColorStop(1,    'rgba(' + rgba + ',0)');

      ctx.fillStyle = grd;
      ctx.fillRect(cx - halfW, b.y, halfW * 2, b.h);
    }

    // Vignette — darkens edges so text stays crisp
    var vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.05, W / 2, H / 2, H * 0.85);
    vig.addColorStop(0, 'rgba(13,13,13,0.0)');
    vig.addColorStop(1, 'rgba(13,13,13,0.88)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    // Light centre overlay keeps title legible
    ctx.fillStyle = 'rgba(13,13,13,0.30)';
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  resize();
  tick();
}());
