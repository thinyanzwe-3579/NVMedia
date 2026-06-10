(function () {
  'use strict';

  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  var ctx   = canvas.getContext('2d');
  var W, H;
  var start = null;

  // Band colors: white, red, near-black, silver, deep purple, deep blue
  var COLORS = [
    [255, 255, 255],  // white
    [220,   0,   0],  // red
    [ 45,  45,  52],  // near-black
    [190, 196, 202],  // silver
    [ 80,   0, 170],  // deep purple
    [  0,  25, 185],  // deep blue
  ];

  var SPACING = 22;   // px gap between each line in the band
  var LW      = 2.0;  // core line width
  var STEPS   = 220;  // path resolution — higher = smoother curves

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  // Three overlaid sines → organic, non-repeating wave feel
  // Each line index gets a different phase so they don't move in unison
  function waveAmt(t, idx, time) {
    var scale = Math.sqrt(W * W + H * H) * 0.42;
    return (
      scale * 0.09 * Math.sin(t * 1.7  * Math.PI - time * 0.48 + idx * 0.55) +
      scale * 0.04 * Math.sin(t * 4.1  * Math.PI - time * 0.82 + idx * 0.90) +
      scale * 0.02 * Math.sin(t * 8.6  * Math.PI - time * 1.35 + idx * 1.30)
    );
  }

  // Draw one pass of a line (called twice per color: bloom layer + core)
  function strokeLine(idx, perpBase, time, lineWidth, opacity, blur) {
    var D  = Math.sqrt(W * W + H * H);
    // Unit vector along diagonal (top-left → bottom-right)
    var ux = W / D,  uy = H / D;
    // Perpendicular (90° CCW from diagonal)
    var px = -uy,    py = ux;

    var col  = COLORS[idx];
    var rgba = col[0] + ',' + col[1] + ',' + col[2];

    ctx.save();
    ctx.shadowBlur  = blur;
    ctx.shadowColor = 'rgba(' + rgba + ',1)';
    ctx.strokeStyle = 'rgba(' + rgba + ',' + opacity + ')';
    ctx.lineWidth   = lineWidth;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';
    ctx.beginPath();

    for (var s = 0; s <= STEPS; s++) {
      var t    = s / STEPS;
      // Extend 8% beyond each edge so lines reach the true corners
      var tExt = t * 1.16 - 0.08;
      var d    = tExt * D;
      var w    = waveAmt(t, idx, time);
      // Fade out near the bottom-right end (last 15%)
      var fade = t > 0.85 ? 1 - (t - 0.85) / 0.15 : 1;

      var x = ux * d + px * (perpBase + w);
      var y = uy * d + py * (perpBase + w);

      if (s === 0) {
        ctx.moveTo(x, y);
      } else {
        // Vary opacity along path for the fade at the end
        if (t > 0.85) {
          ctx.stroke();
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(' + rgba + ',' + (opacity * fade) + ')';
          ctx.shadowColor = 'rgba(' + rgba + ',' + fade + ')';
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    }

    ctx.stroke();
    ctx.restore();
  }

  function tick(ts) {
    if (!start) start = ts;
    var time = (ts - start) / 1000;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0d0d0d';
    ctx.fillRect(0, 0, W, H);

    var n   = COLORS.length;
    var mid = (n - 1) / 2;

    for (var i = 0; i < n; i++) {
      var base = (i - mid) * SPACING;

      // ── Outer bloom halo ──────────────────────────────
      strokeLine(i, base, time, LW * 8,  0.12, 45);

      // ── Inner glow ────────────────────────────────────
      strokeLine(i, base, time, LW * 3,  0.35, 20);

      // ── Core line ─────────────────────────────────────
      strokeLine(i, base, time, LW,      0.88, 10);
    }

    // Centre vignette — softens the glow around the title text
    var vig = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.7);
    vig.addColorStop(0,   'rgba(13,13,13,0.55)');
    vig.addColorStop(0.5, 'rgba(13,13,13,0.20)');
    vig.addColorStop(1,   'rgba(13,13,13,0.70)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    requestAnimationFrame(tick);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(tick);

}());
