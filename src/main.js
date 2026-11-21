import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { drawMap } from './map.js';

gsap.registerPlugin(ScrollTrigger);

/* eased smooth scroll like the reference; driven by the GSAP ticker so scroll and parallax stay in step */
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const el = document.querySelector(a.getAttribute('href'));
    if (el) { e.preventDefault(); lenis.scrollTo(el); }
  }));
}

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
      <a class="btn btn--secondary" href="#contact">Explore Trip <svg class="btn__dot" viewBox="0 0 10 10"><use href="#pinch" /></svg></a>
    </div>
    <div class="card__img"><img src="/photos/web/${t.img}.jpg" alt="" loading="lazy" decoding="async" /></div>
  </article>`).join('');

/* ---------- hero framing + depth ---------- */
// Photo: Assekrem road, Hoggar, 3200x2323: two granite pinnacles (apexes at photo rows 772 / 780) under a
// blue sky, stony valley in front. The photo is drawn twice: the back copy shows the sky behind the
// headline, the front copy is clipped along the traced skyline, so the pinnacle tips sit in front of
// the bottom of the letters (the reference does the same with its hill and "Travel").
const hero = document.querySelector('.hero');
const heroImgs = [...document.querySelectorAll('.hero__img')];
const front = document.querySelector('.hero__front');
const HERO = { iw: 3200, ih: 2323, apexY: 776 };
// traced with cook/harness/skyline.mjs (photo px)
const SKYLINE = [[0,1004],[80,1036],[160,1040],[240,1068],[320,1096],[400,1120],[480,1160],[560,1148],[600,1076],[680,1088],[760,1116],[800,1112],[840,1072],[880,996],[920,940],[960,848],[1000,788],[1040,772],[1080,772],[1120,796],[1160,832],[1200,868],[1240,900],[1280,928],[1360,940],[1400,948],[1440,984],[1480,1028],[1520,1068],[1560,1084],[1600,1076],[1636,964],[1676,896],[1716,816],[1756,780],[1796,780],[1836,816],[1876,876],[1916,924],[1956,1064],[1996,1140],[2036,1231],[2116,1271],[2196,1299],[2276,1263],[2356,1215],[2436,1152],[2476,1104],[2516,1088],[2556,1100],[2636,1163],[2716,1235],[2796,1267],[2876,1255],[2956,1219],[3036,1171],[3116,1124],[3200,1072]];
function fitFront() {
  const mobile = innerWidth < 768;
  const w = hero.clientWidth, h = hero.clientHeight;
  const cover = Math.max(w / HERO.iw, h / HERO.ih);
  // desktop: zoom 1.22 over width fit, apexes at 44% of the hero height (just above the headline baseline)
  // mobile: scale so the apexes land at 40% with the photo top at the hero top
  const apexFrac = mobile ? 0.42 : 0.455;
  const s = mobile ? Math.max(cover, (apexFrac * h) / HERO.apexY) : Math.max(cover, (w / HERO.iw) * 1.22);
  const iw = HERO.iw * s, ih = HERO.ih * s;
  const ox = (iw - w) * 0.5;
  const oy = Math.min(Math.max(HERO.apexY * s - apexFrac * h, 0), ih - h);
  for (const img of heroImgs) Object.assign(img.style, { width: `${iw}px`, height: `${ih}px`, left: `${-ox}px`, top: `${-oy}px` });
  const pts = SKYLINE.map(([x, y]) => `L${(x * s - ox).toFixed(1)} ${(y * s - oy).toFixed(1)}`).join(' ');
  front.style.clipPath = `path('M${(-ox).toFixed(1)} ${(ih - oy + 50).toFixed(1)} ${pts} L${(iw - ox).toFixed(1)} ${(ih - oy + 50).toFixed(1)} Z')`;
  hero.style.setProperty('--sky-bot', `${(HERO.apexY * s - oy).toFixed(1)}px`);
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
  // each line is a mask; each word rises inside it, left to right
  el.innerHTML = lines.map((l) => `<span class="ln">${l.map((w) => `<span class="wd">${w}</span>`).join(' ')}</span>`).join('');
  return [...el.querySelectorAll('.wd')];
}

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* intro, timed to the reference from navigation start: near-black until 0.25 s, page teal until
   1.25 s, then the whole hero (photo, nav, type, button) appears together in one short fade */
const sinceNav = () => performance.now() / 1000;
if (!reduce) {
  gsap.set('.hero__title, .hero__sub, .hero__cta, .nav .nav__logo, .nav__links a, .nav__cta', { autoAlpha: 0 });
  gsap.to('.intro-curtain', { backgroundColor: '#091b20', duration: 0.1, ease: 'none', delay: Math.max(0, 0.25 - sinceNav()) });
  const atRevealTime = new Promise((r) => setTimeout(r, Math.max(0, 1.1 - sinceNav()) * 1000));
  // hero photo ready (load event, not decode(): decode() can stay pending on a script-sized srcset image)
  const heroReady = new Promise((r) => {
    const img = heroImgs[0];
    if (img.complete) r(); else { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); }
  });
  const safety = new Promise((r) => setTimeout(r, 3000));
  Promise.all([atRevealTime, Promise.race([Promise.all([document.fonts.ready, heroReady]), safety])]).then(() => {
    gsap.to('.intro-curtain', { autoAlpha: 0, duration: 0.2, ease: 'power1.out' });
    gsap.to('.hero__title, .hero__sub, .hero__cta, .nav .nav__logo, .nav__links a, .nav__cta', { autoAlpha: 1, duration: 0.2, ease: 'power1.out' });
  });
} else gsap.set('.intro-curtain', { autoAlpha: 0 });

document.fonts.ready.then(() => {
  const heads = [...document.querySelectorAll('.split, .featured__head .h2, .combine .h2')];
  const lineSets = heads.map((h) => ({ h, words: splitLines(h) }));

  if (reduce) return;

  /* hero parallax: photo drifts, headline lifts away */
  gsap.to('.hero__back, .hero__front', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__title, .hero__sub', { y: -140, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* headings: words rise inside their line masks, left to right, starting as the heading enters */
  for (const { h, words } of lineSets) {
    if (h.closest('.hero')) continue;
    gsap.from(words, { yPercent: 110, autoAlpha: 0, duration: 0.85, ease: 'power3.out', stagger: 0.05, scrollTrigger: { trigger: h, start: 'top 97%', once: true } });
  }

  /* images and blocks slide up */
  const ups = '.stat__item, .about__img, .about__body > *, .card, .combine__list li, .step, .combine__steps .lead, .dest__copy, .how__item, .guide, .guides__foot > *, .footer__img, .footer__main > *, .featured__head .muted, .dest__card';
  gsap.utils.toArray(ups).forEach((el) => {
    gsap.from(el, { y: 50, autoAlpha: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
  /* image zoom-out inside its frame */
  gsap.utils.toArray('.stat__img img, .about__img img, .footer__img img').forEach((img) => {
    gsap.from(img, { scale: 1.18, duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: img, start: 'top 92%', once: true } });
  });
  /* nav: the link of the section in view turns orange */
  document.querySelectorAll('.nav__links a').forEach((a) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    ScrollTrigger.create({ trigger: target, start: 'top 50%', end: 'bottom 50%', toggleClass: { targets: a, className: 'is-active' } });
  });
  /* combine background parallax */
  gsap.fromTo('.combine__bg img', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.combine', start: 'top bottom', end: 'bottom top', scrub: true } });
});
