(function () {
  'use strict';

  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  var ctx   = canvas.getContext('2d');
  var W, H;
  var start = null;
  var stars = [];

  // ── 2D rainbow band colors ───────────────────────────────────
  // Ordered so they read like a ribbon: white → red → black → silver → purple → blue
  var COLORS = [
    [255, 255, 255],  // white
    [215,   0,   0],  // red
    [ 28,  28,  33],  // near-black
    [188, 194, 200],  // silver
    [ 78,   0, 168],  // deep purple
    [  0,  22, 182],  // deep blue
  ];

  // Each band is this many px wide; scale with screen so it looks bold on all sizes
  function bandW() { return Math.max(W, H) * 0.028; }

  var STEPS = 220;  // path resolution — higher = smoother bends

  // ── Stars / glitter ─────────────────────────────────────────

  function initStars() {
    stars = [];
    var count = Math.floor((W * H) / 2200);
    for (var i = 0; i < count; i++) {
      var big = Math.random() < 0.07;
      stars.push({
        x:           Math.random() * W,
        y:           Math.random() * H,
        r:           big ? Math.random() * 1.6 + 1.2 : Math.random() * 0.9 + 0.15,
        alpha:       Math.random() * 0.6 + 0.1,
        alphaTarget: Math.random() * 0.6 + 0.1,
        speed:       Math.random() * 0.006 + 0.002,
        sparkle:     big
      });
    }
  }

  function drawStars() {
    for (var i = 0; i < stars.length; i++) {
      var s    = stars[i];
      var diff = s.alphaTarget - s.alpha;
      s.alpha += diff * s.speed * 9;
      if (Math.abs(diff) < 0.015) {
        s.alphaTarget = Math.random() * 0.65 + 0.1;
      }

      if (s.sparkle) {
        // 4-point glitter cross
        var arm = s.r * 3.5;
        ctx.save();
        ctx.strokeStyle = 'rgba(255,255,255,' + (s.alpha * 0.9) + ')';
        ctx.lineWidth   = s.r * 0.55;
        ctx.shadowBlur  = 6;
        ctx.shadowColor = 'rgba(255,255,255,' + s.alpha + ')';
        ctx.beginPath();
        ctx.moveTo(s.x - arm, s.y); ctx.lineTo(s.x + arm, s.y);
        ctx.moveTo(s.x, s.y - arm); ctx.lineTo(s.x, s.y + arm);
        ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + s.alpha + ')';
      ctx.fill();
    }
  }

  // ── Shared wave path (same for every band → no overlapping) ──

  function sharedWave(t, time) {
    // Large amplitude for the dramatic S-curve seen in the reference
    var amp = Math.min(W, H) * 0.28;
    return (
      amp * 0.62 * Math.sin(t * 1.5 * Math.PI - time * 0.36) +
      amp * 0.26 * Math.sin(t * 3.6 * Math.PI - time * 0.70) +
      amp * 0.12 * Math.sin(t * 7.8 * Math.PI - time * 1.25)
    );
  }

  // Draw one flat filled band as a solid polygon
  function drawBand(colorIdx, perpCenter, bw, time) {
    var col  = COLORS[colorIdx];
    var D    = Math.sqrt(W * W + H * H);
    var ux   = W / D,  uy = H / D;   // unit vector: top-left → bottom-right
    var px   = -uy,    py =  ux;     // perpendicular (90° CCW)

    var half = bw * 0.5;

    ctx.beginPath();

    // Forward along left edge of this band
    for (var s = 0; s <= STEPS; s++) {
      var t    = s / STEPS;
      var tExt = t * 1.14 - 0.07;   // 7% bleed past each corner
      var d    = tExt * D;
      var w    = sharedWave(t, time);
      var x    = ux * d + px * (perpCenter - half + w);
      var y    = uy * d + py * (perpCenter - half + w);
      s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    // Back along right edge of this band
    for (var s2 = STEPS; s2 >= 0; s2--) {
      var t2    = s2 / STEPS;
      var tExt2 = t2 * 1.14 - 0.07;
      var d2    = tExt2 * D;
      var w2    = sharedWave(t2, time);
      var x2    = ux * d2 + px * (perpCenter + half + w2);
      var y2    = uy * d2 + py * (perpCenter + half + w2);
      ctx.lineTo(x2, y2);
    }

    ctx.closePath();
    ctx.fillStyle = 'rgb(' + col[0] + ',' + col[1] + ',' + col[2] + ')';
    ctx.fill();
  }

  // ── Resize / init ────────────────────────────────────────────

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    initStars();
  }

  // ── Render loop ──────────────────────────────────────────────

  function tick(ts) {
    if (!start) start = ts;
    var time = (ts - start) / 1000;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0d';
    ctx.fillRect(0, 0, W, H);

    // Stars behind the ribbon
    drawStars();

    // Ribbon bands — all sharing the same wave, spaced side-by-side
    var n   = COLORS.length;
    var mid = (n - 1) / 2;
    var bw  = bandW();

    for (var i = 0; i < n; i++) {
      drawBand(i, (i - mid) * bw, bw, time);
    }

    // Soft centre vignette to keep title text readable
    var vig = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.72);
    vig.addColorStop(0,    'rgba(13,13,13,0.58)');
    vig.addColorStop(0.55, 'rgba(13,13,13,0.18)');
    vig.addColorStop(1,    'rgba(13,13,13,0.70)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(tick);

}());
