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
// From fancyalgeria.com trip pages (Nov 2026). Price = solo; `who` = price per person when travelling in two.
const trips = [
  { title: '5 Days: Algiers,<br>Constantine & Tipasa', price: '€580', place: 'Algiers, Constantine, Cherchell, Tipasa', when: 'No Algiers tour on Fridays', len: '(5 days, 4 nights)', who: '€425 each for two travellers', img: 'card-4' },
  { title: '7 Days: Roman Algeria,<br>Djemila & Timgad', price: '€880', place: 'Algiers, Djemila, Timgad, Constantine', when: 'Book 1 week ahead', len: '(7 days, 6 nights)', who: '€635 each for two travellers', img: 'card-5' },
  { title: 'Ghardaia & the<br>M\'Zab Valley', price: '€650', place: 'Ghardaia, Beni Isguen, Sebseb oasis', when: 'Flight, hotel and guide', len: '(4 days)', who: '€420 each for two travellers', img: 'card-3' },
  { title: 'Tamanrasset &<br>the Assekrem', price: '€680', place: 'Tamanrasset, Assekrem, Hoggar', when: 'Departs Saturday or Tuesday', len: '(3 days)', who: '€550 each for two travellers', img: 'card-7' },
  { title: 'Djanet: the<br>Tadrart Rouge', price: '€1,050', place: 'Djanet, Tadrart, Tin Merzouga', when: 'Camping and 4x4, book 5 days ahead', len: '(7 days)', who: '€850 each for two travellers', img: 'card-1' },
  { title: 'Algiers City Tour:<br>Casbah & the Bay', price: '€120', place: 'Algiers', when: 'Saturday to Thursday', len: '(8 hours)', who: 'Private guide and driver', img: 'card-6' },
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
  // foreground depth of field in hero pixels: sharp to 64% of the hero height, fully soft from 84%
  // (the image is taller than the hero, so a percentage mask on the image itself would start off-screen)
  const blur = document.querySelector('.hero__blur');
  if (blur) {
    const m = `linear-gradient(180deg, transparent ${(0.64 * h + oy).toFixed(0)}px, #000 ${(0.84 * h + oy).toFixed(0)}px)`;
    blur.style.webkitMaskImage = m; blur.style.maskImage = m;
  }
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
  // each line is a mask with one inner block that rises (the reference animates lines: y 100% -> 0)
  el.innerHTML = lines.map((l) => `<span class="ln"><span class="ln__i">${l.join(' ')}</span></span>`).join('');
  return [...el.querySelectorAll('.ln__i')];
}
/* split into chars (keeping words together) for the label type-on and the lead colour wave */
function splitChars(el) {
  // only text nodes are split, so icons and <br> inside the element stay intact
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const texts = [];
  while (walker.nextNode()) if (walker.currentNode.textContent.trim()) texts.push(walker.currentNode);
  for (const node of texts) {
    const frag = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) { frag.append(' '); return; }
      const word = document.createElement('span'); word.className = 'wch';
      for (const ch of part) { const s = document.createElement('span'); s.className = 'ch'; s.textContent = ch; word.append(s); }
      frag.append(word);
    });
    node.replaceWith(frag);
  }
  return [...el.querySelectorAll('.ch')];
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
    // header lines draw in (reference: bottom line scaleX 0.5 s at +0.3, verticals scaleY at +0.4 / +0.5)
    const nav = document.querySelector('.nav');
    gsap.fromTo(nav, { '--draw-x': 0 }, { '--draw-x': 1, duration: 0.5, delay: 0.3, ease: 'power2.inOut' });
    gsap.fromTo(nav, { '--draw-y': 0 }, { '--draw-y': 1, duration: 0.5, delay: 0.4, ease: 'power2.inOut' });
  });
} else gsap.set('.intro-curtain', { autoAlpha: 0 });

document.fonts.ready.then(() => {
  const heads = [...document.querySelectorAll('.split, .featured__head .h2, .combine .h2')];
  const lineSets = heads.map((h) => ({ h, words: splitLines(h) }));

  if (reduce) return;

  /* hero parallax: photo drifts, headline lifts away */
  gsap.to('.hero__back, .hero__front', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__title, .hero__sub', { y: -140, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* timings below follow the reference's own script: power3.out reveals, power2.inOut lines, start "top 88%" */
  const once = (trigger, start = 'top 88%') => ({ trigger, start, once: true });

  /* section labels type on: chars 0 -> 0.4 -> 1, 0.03 s apart */
  gsap.utils.toArray('.label').forEach((el) => {
    const chars = splitChars(el);
    gsap.set(chars, { opacity: 0 });
    gsap.to(chars, { keyframes: [{ opacity: 0.4, duration: 0.06, ease: 'none' }, { opacity: 1, duration: 0.18, ease: 'power1.out' }], stagger: 0.03, scrollTrigger: once(el) });
  });

  /* headings: lines rise from their masks, 0.8 s, 0.08 s apart */
  for (const { h, words: lines } of lineSets) {
    if (h.closest('.hero')) continue;
    gsap.fromTo(lines, { yPercent: 105 }, { yPercent: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, scrollTrigger: once(h) });
  }

  /* lead paragraphs: rise, then the letters brighten from grey to white in a wave (0.008 s per char) */
  gsap.utils.toArray('.about__body .lead, .combine__steps .lead, .dest__copy, .guides__foot .lead').forEach((el) => {
    const chars = splitChars(el);
    gsap.set(chars, { color: 'rgba(255, 255, 255, 0.32)' });
    const tl = gsap.timeline({ scrollTrigger: once(el) });
    tl.from(el, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .to(chars, { color: 'rgba(255, 255, 255, 1)', duration: 0.08, ease: 'none', stagger: 0.008 }, 0.3);
  });

  /* dividers draw across */
  gsap.utils.toArray('.line-top').forEach((el) => {
    gsap.fromTo(el, { '--draw': 0 }, { '--draw': 1, duration: 0.8, ease: 'power2.inOut', scrollTrigger: once(el, 'top 92%') });
  });

  /* images slide in from the left (x -40), text blocks rise 30 */
  gsap.utils.toArray('.stat__img, .about__img, .guide, .footer__img, .dest__card img').forEach((el, i) => {
    gsap.from(el, { x: -40, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: once(el) });
  });
  gsap.utils.toArray('.stat__top, .about__stats > *, .about__foot > *, .combine__list li, .step, .how__item, .guides__foot > * > *, .footer__main > *, .featured__head .muted, .dest__card span, .dest__card small, .footer__bar p').forEach((el) => {
    gsap.from(el, { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: once(el, 'top 92%') });
  });

  /* trip cards: title, price, image from the left, details one by one, then the button scales in */
  gsap.utils.toArray('.card').forEach((card) => {
    const props = card.querySelectorAll('.card__row');
    gsap.set(card.querySelector('.btn'), { scale: 0.85, opacity: 0 });
    const tl = gsap.timeline({ scrollTrigger: once(card) });
    tl.from(card.querySelector('.card__title'), { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0)
      .from(card.querySelector('.card__price'), { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, 0.1)
      .from(card.querySelector('.card__img'), { x: -40, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.1)
      .from(props, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }, 0.2)
      .to(card.querySelector('.btn'), { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.2 + 0.08 * props.length);
  });

  /* people section: plus markers spin in */
  gsap.from('.guides__plus i', { rotation: -180, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.5, scrollTrigger: once('.guides__plus') });

  /* map dots: elastic pop, then a slow breathing pulse */
  const dots = gsap.utils.toArray('.dot');
  if (dots.length) {
    gsap.set(dots.map((d) => d.querySelector('.dot__core')), { scale: 0 });
    gsap.set(dots.map((d) => d.querySelector('.dot__glow')), { scale: 0, opacity: 0 });
    const tl = gsap.timeline({ scrollTrigger: once('.dest', 'top 60%') });
    dots.forEach((d, i) => {
      const core = d.querySelector('.dot__core'), glow = d.querySelector('.dot__glow');
      tl.to(glow, { scale: 0.6, opacity: 0.6, duration: 0.6, ease: 'elastic.out(1, 0.5)' }, i * 0.08)
        .to(core, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }, i * 0.08)
        .call(() => {
          const dur = 1.6 + (i % 4) * 0.3;
          gsap.to(core, { scale: 1.2, duration: dur, ease: 'sine.inOut', repeat: -1, yoyo: true });
          gsap.to(glow, { scale: 1.1, opacity: 0.35, duration: dur, ease: 'sine.inOut', repeat: -1, yoyo: true });
        }, null, i * 0.08 + 0.6);
    });
  }
  /* nav: the link of the section in view turns orange */
  document.querySelectorAll('.nav__links a').forEach((a) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    ScrollTrigger.create({ trigger: target, start: 'top 50%', end: 'bottom 50%', toggleClass: { targets: a, className: 'is-active' } });
  });
  /* combine background parallax */
  gsap.fromTo('.combine__bg img', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.combine', start: 'top bottom', end: 'bottom top', scrub: true } });
});
