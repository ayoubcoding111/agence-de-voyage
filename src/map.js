import { geoMercator, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

// Cities Fancyellow runs tours to: [lon, lat, size]
const cities = [
  [3.06, 36.75, 12], // Algiers
  [6.61, 36.36, 10], // Constantine
  [-0.64, 35.7, 7],  // Oran
  [-1.32, 34.88, 6], // Tlemcen
  [5.08, 36.75, 6],  // Bejaia
  [7.77, 36.9, 6],   // Annaba
  [6.47, 35.48, 7],  // Timgad
  [5.74, 36.32, 6],  // Djemila
  [2.45, 36.6, 6],   // Tipasa
  [3.67, 32.49, 9],  // Ghardaia
  [-1.64, 30.12, 7], // Taghit
  [0.23, 29.26, 7],  // Timimoun
  [9.48, 24.55, 9],  // Djanet
  [5.52, 22.79, 8],  // Tamanrasset
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
