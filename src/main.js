import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { drawMap } from './map.js';

gsap.registerPlugin(ScrollTrigger);

/* ---------- featured trips (real Fancyellow offer, EUR per person) ---------- */
const trips = [
  { title: '4 Days & 3 Nights in<br>Algiers & Constantine', price: '€450', place: 'Algiers, Constantine', when: 'Any dates', len: '(4 days, 3 nights)', who: '1 to 3 guests, private', img: 'card-4' },
  { title: '10 Days: Roman Algeria<br>& the M\'Zab Valley', price: '€1,300', place: 'Djemila, Timgad, Tipasa, Ghardaia', when: 'Book 1 week ahead', len: '(10 days, 9 nights)', who: '1 to 3 guests, private', img: 'card-3' },
  { title: 'Tipasa & Cherchell<br>Roman Coast Tour', price: '€120', place: 'Tipasa, Cherchell', when: 'Day tour', len: '(8 hours)', who: 'Private guide and driver', img: 'card-5' },
  { title: 'Timimoun, the Red<br>Oasis of the Sahara', price: '€150', place: 'Timimoun, Adrar', when: 'Day tour', len: '(8 hours)', who: 'Private guide and driver', img: 'card-2' },
  { title: 'Algiers City Tour:<br>Casbah & the Bay', price: '€120', place: 'Algiers', when: 'Saturday to Thursday', len: '(8 hours)', who: 'Private guide and driver', img: 'card-6' },
  { title: 'Djanet & the Tassili<br>n\'Ajjer Plateau', price: 'on request', place: 'Djanet, Illizi', when: 'Multi-day trip', len: '(5 days)', who: 'With a local Sahara operator', img: 'card-1', from: false },
];

const ico = {
  pin: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1"><path d="M7 13s4.2-4 4.2-7.2A4.2 4.2 0 0 0 2.8 5.8C2.8 9 7 13 7 13z"/><circle cx="7" cy="5.8" r="1.5"/></svg>',
  cal: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1"><rect x="1.8" y="2.6" width="10.4" height="9.6" rx="1.4"/><path d="M1.8 5.6h10.4M4.6 1.4v2.4M9.4 1.4v2.4"/></svg>',
  ppl: '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1"><circle cx="5.2" cy="4.6" r="2.2"/><path d="M1.4 12c.4-2.4 2-3.6 3.8-3.6S8.6 9.6 9 12"/><path d="M9.2 2.6a2 2 0 0 1 0 4M10.6 8.6c1.2.4 1.9 1.6 2 3.4"/></svg>',
  star: '<svg viewBox="0 0 10 10"><path d="M5 .4l1.4 3 3.2.3-2.4 2.1.7 3.2L5 7.4 2.1 9l.7-3.2L.4 3.7l3.2-.3z"/></svg>',
};

const grid = document.querySelector('.featured__grid');
grid.innerHTML = trips.map((t) => `
  <article class="card">
    <div class="card__text">
      <h3 class="card__title">${t.title}</h3>
      <p class="card__price">${t.from === false ? '<small>price</small>' : '<small>from</small>'}<b>${t.price}</b></p>
      <div class="card__meta">
        <div class="card__row"><span>${t.place}</span>${ico.pin}</div>
        <div class="card__row"><span>${t.when} <em>${t.len}</em></span>${ico.cal}</div>
        <div class="card__row"><span>${t.who}</span>${ico.ppl}</div>
        <div class="card__row"><span>Rated 4.8 <em>on Trustpilot</em></span><span class="stars">${ico.star.repeat(5)}</span></div>
      </div>
      <a class="btn btn--secondary" href="#contact">Explore Trip <i class="btn__dot"></i></a>
    </div>
    <div class="card__img"><img src="/photos/${t.img}.jpg" alt="" loading="lazy" /></div>
  </article>`).join('');

/* ---------- hero depth layer: keep the clipped front copy aligned with the cover-fitted photo ---------- */
const hero = document.querySelector('.hero');
const frontImg = document.querySelector('.hero__front img');
const POS_X = 0.7, POS_Y = 0.5, IW = 3200, IH = 1800;
// ridge silhouette of the photo, in photo pixels: everything below it is drawn in front of the headline
const RIDGE = [[0, 1500], [1300, 1500], [1440, 1280], [1600, 1200], [1664, 1120], [1776, 1040], [1936, 960], [2080, 870], [2152, 826], [2200, 790], [2240, 768], [2300, 748], [2352, 739], [2460, 742], [2560, 752], [2720, 756], [2880, 755], [3020, 728], [3136, 704], [3200, 688], [3200, 1800], [0, 1800]];
function fitFront() {
  const w = hero.clientWidth, h = hero.clientHeight;
  const s = Math.max(w / IW, h / IH);
  const ox = (IW * s - w) * POS_X, oy = (IH * s - h) * POS_Y;
  const d = RIDGE.map(([x, y], i) => `${i ? 'L' : 'M'}${(x * s - ox).toFixed(1)} ${(y * s - oy).toFixed(1)}`).join(' ') + ' Z';
  frontImg.style.clipPath = `path('${d}')`;
}
fitFront();
addEventListener('resize', fitFront);

/* ---------- map ---------- */
const mapCanvas = document.querySelector('.dest__map');
if (mapCanvas && getComputedStyle(mapCanvas).display !== 'none') drawMap(mapCanvas);

/* ---------- split headings into masked lines ---------- */
function splitLines(el) {
  const html = el.innerHTML.replace(/<br\s*\/?>/gi, ' @@BR@@ ');
  const words = html.split(/\s+/).filter(Boolean);
  el.innerHTML = words.map((w) => (w === '@@BR@@' ? '<br>' : `<span class="w">${w}</span>`)).join(' ');
  const spans = [...el.querySelectorAll('.w')];
  const lines = [];
  let top = null;
  for (const s of spans) {
    const t = s.offsetTop;
    if (top === null || Math.abs(t - top) > 4) { lines.push([]); top = t; }
    lines[lines.length - 1].push(s.innerHTML);
  }
  el.innerHTML = lines.map((l) => `<span class="ln"><span class="ln__i">${l.join(' ')}</span></span>`).join('');
  return [...el.querySelectorAll('.ln__i')];
}

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

document.fonts.ready.then(() => {
  const heads = [...document.querySelectorAll('.split, .featured__head .h2, .combine .h2')];
  const lineSets = heads.map((h) => ({ h, lines: splitLines(h) }));

  if (reduce) { gsap.set('.intro-curtain', { autoAlpha: 0 }); return; }

  /* intro */
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  const GRADE = 'saturate(0.8) hue-rotate(10deg) brightness(0.97)';
  gsap.set('.hero__img', { scale: 1.12, filter: `blur(18px) ${GRADE}` });
  gsap.set('.hero__title, .hero__sub', { yPercent: 40, autoAlpha: 0 });
  gsap.set('.hero__cta', { autoAlpha: 0, y: 20 });
  gsap.set('.nav .nav__logo, .nav__links a, .nav__cta', { autoAlpha: 0, y: -10 });
  tl.to('.intro-curtain', { backgroundColor: '#091b20', duration: 0.35, ease: 'none' })
    .to('.intro-curtain', { autoAlpha: 0, duration: 0.6 }, '+=0.05')
    .to('.hero__img', { scale: 1, filter: `blur(0px) ${GRADE}`, duration: 1.6, ease: 'power2.out' }, '<')
    .to('.hero__title', { yPercent: 0, autoAlpha: 1, duration: 1.1 }, '-=1.15')
    .to('.hero__sub', { yPercent: 0, autoAlpha: 1, duration: 1 }, '-=0.85')
    .to('.nav .nav__logo, .nav__links a, .nav__cta', { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, '-=0.9')
    .to('.hero__cta', { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.6')
    .set('.hero__img', { clearProps: 'filter' });

  /* hero parallax: photo drifts, headline lifts away */
  gsap.to('.hero__back, .hero__front', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__title, .hero__sub', { y: -200, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* headings: line by line behind a mask */
  for (const { h, lines } of lineSets) {
    if (h.closest('.hero')) continue;
    gsap.from(lines, { yPercent: 105, duration: 0.9, ease: 'power3.out', stagger: 0.09, scrollTrigger: { trigger: h, start: 'top 88%', once: true } });
  }

  /* images and blocks slide up */
  const ups = '.stat__item, .about__img, .about__body > *, .card, .combine__list li, .step, .combine__steps .lead, .dest__copy, .how__item, .guide, .guides__foot > *, .footer__img, .footer__main > *, .featured__head .muted, .dest__card';
  gsap.utils.toArray(ups).forEach((el) => {
    gsap.from(el, { y: 50, autoAlpha: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
  /* image zoom-out inside its frame */
  gsap.utils.toArray('.stat__img img, .about__img img, .card__img img, .guide img, .footer__img img').forEach((img) => {
    gsap.from(img, { scale: 1.18, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: img, start: 'top 92%', once: true } });
  });
  /* combine background parallax */
  gsap.fromTo('.combine__bg img', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.combine', start: 'top bottom', end: 'bottom top', scrub: true } });
});
