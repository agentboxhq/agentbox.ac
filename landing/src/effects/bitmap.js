/* Footer wordmark bitmap: each --px cell of the name and the accent dot is orange or not (grey shows
   under it in CSS). The name is grey above and orange below, mixing through a randomly dithered band
   around SPLIT; the accent dot is a random scatter, DOT of its cells orange. Repaints on resize. */
const SPLIT = 0.54, BAND = 0.14, DOT = 0.7; // em from the top of the name; half-width of the band; dot density

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function paint(el, px, orange, chance) {
  const w = Math.ceil(el.offsetWidth / px), h = Math.ceil(el.offsetHeight / px);
  if (!w || !h) return;
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d'); ctx.fillStyle = orange;
  for (let y = 0; y < h; y++) { const p = chance((y + 0.5) * px); for (let x = 0; x < w; x++) if (Math.random() < p) ctx.fillRect(x, y, 1, 1); }
  el.style.setProperty('--bits', `url(${cv.toDataURL()}) 0 0/${w * px}px ${h * px}px`);
}

export default function startBitmap(wm) {
  const word = wm.querySelector('.wmk+span'), dot = wm.querySelector('.wmk i');
  const draw = () => {
    const cs = getComputedStyle(wm), px = parseFloat(cs.getPropertyValue('--px')) || 2, em = parseFloat(cs.fontSize);
    const orange = cs.getPropertyValue('--orange').trim();
    paint(word, px, orange, y => smooth((SPLIT - BAND) * em, (SPLIT + BAND) * em, y));
    paint(dot, px, orange, () => DOT);
  };
  const ro = new ResizeObserver(draw); ro.observe(wm);
  return () => ro.disconnect();
}
