import { geoMercator, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

// Places Atlas has taken travellers to (from the reports listed in src/trips.js): [lon, lat, size]
const cities = [
  [3.06, 36.75, 12], // Algiers (base, Birkhadem)
  [2.45, 36.6, 7],   // Tipaza
  [4.05, 36.71, 6],  // Kabylie (Tizi Ouzou)
  [5.08, 36.75, 7],  // Bejaia, Gouraya park
  [5.41, 36.19, 6],  // Setif
  [5.74, 36.32, 6],  // Djemila
  [6.61, 36.36, 9],  // Constantine
  [6.17, 35.56, 6],  // Batna
  [6.47, 35.48, 7],  // Timgad
  [6.22, 35.06, 6],  // Ghoufi canyon
  [5.73, 34.85, 7],  // Biskra
  [4.18, 35.21, 6],  // Bou Saada
  [3.67, 32.49, 8],  // Ghardaia, M'Zab
  [0.23, 29.26, 8],  // Timimoun
];

export function drawMap(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const land = feature(world, world.objects.countries);
  const borders = mesh(world, world.objects.countries, (a, b) => a !== b);
  const proj = geoMercator().center([16, 36]).scale(w * 0.5).translate([w * 0.5, h * 0.64]);
  const path = geoPath(proj, ctx);

  // sea
  ctx.fillStyle = '#08191e';
  ctx.fillRect(0, 0, w, h);
  // soft lighter glow behind the land, like haze
  const g = ctx.createRadialGradient(w * 0.62, h * 0.55, 40, w * 0.62, h * 0.55, w * 0.55);
  g.addColorStop(0, 'rgba(22, 44, 50, 0.55)');
  g.addColorStop(1, 'rgba(22, 44, 50, 0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);

  // land
  ctx.beginPath(); path(land);
  ctx.fillStyle = '#10242a'; ctx.fill();
  ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(160, 200, 210, 0.1)'; ctx.stroke();
  ctx.beginPath(); path(borders);
  ctx.lineWidth = 0.8; ctx.strokeStyle = 'rgba(160, 200, 210, 0.1)'; ctx.stroke();

  // fade top and bottom into the page colour
  const fadeTop = ctx.createLinearGradient(0, 0, 0, h * 0.42);
  fadeTop.addColorStop(0, 'rgba(8, 25, 30, 1)'); fadeTop.addColorStop(0.55, 'rgba(8, 25, 30, 0.92)'); fadeTop.addColorStop(1, 'rgba(8, 25, 30, 0)');
  ctx.fillStyle = fadeTop; ctx.fillRect(0, 0, w, h * 0.42);
  const fadeBot = ctx.createLinearGradient(0, h * 0.82, 0, h);
  fadeBot.addColorStop(0, 'rgba(9, 27, 32, 0)'); fadeBot.addColorStop(1, 'rgba(9, 27, 32, 1)');
  ctx.fillStyle = fadeBot; ctx.fillRect(0, h * 0.82, w, h * 0.18);

  // city dots are DOM elements (positioned in % of the canvas) so they can pop in and pulse
  const layer = canvas.parentElement.querySelector('.dest__dots');
  if (layer) {
    layer.innerHTML = cities.map(([lon, lat, s]) => {
      const [x, y] = proj([lon, lat]);
      const r = Math.max(3.5, s * 0.5);
      return `<span class="dot" style="left:${(100 * x / w).toFixed(2)}%;top:${(100 * y / h).toFixed(2)}%;--r:${(2 * r).toFixed(1)}px"><i class="dot__glow"></i><i class="dot__core"></i></span>`;
    }).join('');
  }
}
