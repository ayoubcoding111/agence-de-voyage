# Chouchou Tours site: design system

The single source of truth for how this site looks, moves and is written. Follow it for every change, new section or new page. If something here and the code disagree, the code in `src/style.css` wins; then update this file.

Stack: Vite, vanilla JS, GSAP + ScrollTrigger, Lenis smooth scroll, d3-geo map. Font: Inter (400, 500, 600, 700 via `@fontsource/inter`). Run with `npm run dev` (http://localhost:5173), build with `npm run build`.

The layout, type scale and motion were matched against a reference travel site (a dark editorial travel marketplace). Never name or link that reference anywhere public (code, README, commits).

---

## 1. Brand

- Agency: **Chouchou Tours**, travel agency in Birkhadem, Algiers, with no website of its own. This homepage is a demo made to propose them a site. Real agency, real public facts only.
- Voice: calm, factual, warm. Short sentences. No hype, no exclamation marks except the one existing "Discover your next adventure!".
- Never invent facts, numbers, reviews or staff. Real facts available (checked Nov 2026): Google Maps 4.4 from 137 reviews; Facebook 174.7K followers (page since Apr 2015), 88% recommend from 65 reviews; TikTok 19.7K followers. Offer in their own words: excursions, organised trips, private guided visits, circuits à la carte anywhere in Algeria, national guide, 9-seat vehicle, day visits, guesthouse and seasonal rental in Algiers. Trips reported by visa-algerie.com (Apr 2025, Nov 2025, Feb 2026, Aug 2026) are summarised in `src/trips.js`. The director is known as "Chouchou"; her full name is not published, so never print one. Prices are not published: every price says "On request".
- Contacts: phone and WhatsApp +213 540 27 15 14, chouchoutours@gmail.com, Birkhadem, Algiers (Google Maps place "Chouchou Tours"). Social: facebook.com/chouchoutours, tiktok.com/@chouchoutours. No Instagram or X found.
- No em dashes in copy. No emoji.

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#091b20` | page background (deep teal-black) |
| `--bg-2` | `#0d2e37` | secondary buttons, filled chips |
| `--panel` | `#0a1e24` | hover panels, dialog backgrounds |
| `--line` | `rgba(255,255,255,.1)` | every divider and border, always 1px |
| `--muted` | `rgba(255,255,255,.6)` | secondary text |
| `--dim` | `rgba(255,255,255,.5)` | tertiary text, small labels, "Step" |
| `--accent` | `#fb9826` | hover state of buttons and links, active nav link, itinerary day labels |
| `--star` | `#f6a523` | rating stars |
| `--dot` | `#f7941d` | map city dots |

- Text is white on `--bg`. No other background colours for sections; photos carry the colour.
- Accent orange is for interaction and small highlights only. Never large fills, never gradients of it.
- No purple, no beige blocks, no gradient backgrounds except photo overlays.

## 3. Type

All Inter. Letter-spacing is always in **em** (so it scales with the text; never px).

| Role | Class / element | Desktop size / line-height | Weight | Tracking |
|---|---|---|---|---|
| Hero word | `.hero__title` | 11.875rem / 11.875rem | 600 | -0.052em |
| Hero subline | `.hero__sub` | 1.75rem / 2.275rem | 600 | -0.0714em |
| Section heading | `.h2` | 3.75rem / 4.125rem | 600 | -0.06em |
| Big list (footer links, "+Guide") | | 2.8125rem / 2.8125rem | 600 | -0.0667em |
| Lead paragraph | `.lead` | 1.375rem / 1.65rem | 500 | -0.0455em |
| Card title | `.card__title` | 1.75rem / 2.1rem | 600 | -0.0714em |
| Stat number | | 2.8125rem | 600 | -0.0667em |
| Body / muted | `.muted` | 1rem / 1.3rem | 500 | -0.0313em |
| Section label | `.label` | 1rem / 1.3rem | 500 | -0.0313em, with the asterisk mark |
| Nav, buttons | | 0.875rem | 600 | -0.0357em |
| Card meta rows | `.card__row` | 0.75rem / 0.9375rem | 400 | -0.0417em |

- Headings are sentence or title case, never all caps. No monospace, no decorative serif (the only serif is inside press logos).
- Lead paragraphs use a first-line indent (`.indent`, 3.375rem).
- Headings use `<br />` for the designed line breaks on desktop; on phones `.h2 br` is hidden and text reflows.

## 4. Scale and layout

- **1rem tracks the window** (in `html`): 16px at 1440 wide, linear below 1440, flat 16px from 1440 to 1920, linear again above 1920, x0.875 when the window is 800px tall or less, and on phones 16px at 375 wide capped at 17px. Size everything in rem so it scales; use px only for 1px lines.
- `--u` (100vw/90) is used only for blocks that keep growing with width on big screens: the full-bleed "Build Your Trip" band and the destinations map.
- Side margin `--m`: 2.5rem desktop, 1.262rem phones.
- Desktop grid: 6 columns of 15rem from the 40px margin (x = 40, 280, 520, 760, 1000, 1240 at 1440). Section heads: label at the left (column `19.5625rem`), heading starting on the second column.
- Section rhythm: 5rem top padding on sections, dividers as full-width 1px `--line` rules (`.line-top`), column dividers as 1px vertical rules.
- Images: `object-fit: cover`, no rounded corners, no shadows. Aspect ratios are kept on desktop (`aspect-ratio`), fixed heights on phones.
- Breakpoint: one, at **767px** (phone layout below). Everything else scales.
- Section order: hero, Tours (3 tiles), About (photo, lead, 2 stats, press row), As Featured In band, Featured Trips (6 cards), Build Your Trip (full-bleed photo + 4 steps), Explore by Destination (map), How It Works (4 icons), People of Algeria (4 photos), footer (panorama, logo, links, contacts), copyright bar.

## 5. Components

- **Logo mark**: 8 rounded arms (`#mark` symbol in `index.html`), always next to "Chouchou Tours" in 600 weight, also used as the section-label bullet and as the separator in the footer bar.
- **Nav**: fixed, 4.5rem tall, transparent with backdrop blur, 1px bottom rule and vertical rules beside the logo cell and "Explore" cell. Links 0.875rem/600. The link of the section in view turns accent orange (scroll-spy). Phones: logo + two-line burger (19px and 12px lines).
- **Buttons**: pill (`border-radius: 5rem`). Primary white with `--bg-2` text, 3.3125rem tall; secondary `--bg-2` with white text, 2.5625rem tall, full width in cards. Label left, the small pinched-square icon (`#pinch`) right. Hover: background turns `--accent` in 0.2s.
- **Section label**: asterisk mark + text, top-left of a section.
- **Trip card**: text column (title, "price On request", 3 meta rows with thin line icons, "Show Details" button) beside a photo, 2 cards per row on desktop with 1px dividers. Phones: title, price, photo, meta, button, stacked.
- **Trip details panel** (`.trip`): slides in from the right (0.6s power3.out), scrim with blur, gallery (main photo + 3), title, place, intro, price strip, route (stop label in accent, hidden when a trip has no route), included (orange dots), notes (outlined dots), Book by Email + WhatsApp buttons. Closes with the round x, the scrim, or Escape. Data in `src/trips.js`.
- **People photos**: hovering reveals a `--panel` overlay with the place, a sentence, and the Chouchou Tours trip that goes there (0.2s linear fade). Portraits are stock photos captioned by place, never presented as staff.
- **Press**: removed. The "As Featured In" band and the press logos in About were the previous client's own coverage. Do not bring them back unless the agency has its own press. The logo files stay in `public/photos/press/` for now.
- **Map** (destinations): d3-geo canvas, land `#10242a` on the page colour, faint borders, orange city dots that pop in and pulse.

## 6. Photography

- Real Algerian places only, free licence (Unsplash or Pexels), every photo credited in `CREDITS.md` (file, photographer, source, page URL, place). Never use the reference site's photos.
- No grade: photos are shown exactly as shot, with no CSS filters, tints, colour blends or hover effects on any photo. The only effects allowed on photos are the hero bottom blur (a pre-blurred copy masked to the bottom) and neutral dark gradients behind white text where it needs them (build-your-trip band, footer).
- Sizes: content photos live in `public/photos/web/` at about 1.5x display size (800 to 2000px wide, JPEG q4); trip galleries in `public/photos/trips/` (1400px). Never ship full-size originals in content slots (it causes scroll lag).
- Hero: Hoggar sunset photo (`hero-hoggar*.jpg`, 3200x2045: the original 3200x1800 with the sky continued 245px upward) drawn twice. The front copy is masked with a matte of the mountains (`public/photos/hero-hoggar-mask.png`, white = mountains, same 3200x2045 frame, alpha PNG, edge snapped to the photo's real silhouette; a mask from an image model came out about 8% too low and had to be refitted), set to the photo size and offset in `fitFront()` in `src/main.js`, so the pinnacle tips sit in front of the bottom of "Algeria". Keep this depth effect if the hero photo changes (new photo = new matte, same frame). Originals live in `cook/` (`hero-hoggar-source.jpg`, `hero-hoggar-mask.png`, git-ignored).
- No image zoom on hover.

## 7. Motion

All with GSAP + ScrollTrigger; Lenis smooth scroll (lerp 0.1) on the GSAP ticker. Default trigger `start: 'top 88%'`, play once.

| What | How |
|---|---|
| Intro | near-black until 0.25s, page teal until about 1.1s, then the whole hero fades in together (0.2s); nav lines draw (scaleX 0.5s at +0.3, verticals at +0.4) |
| Section labels | type on: chars 0 to 0.4 to 1 opacity, 0.03s apart |
| Headings | lines rise from masks, yPercent 105 to 0, 0.8s power3.out, 0.08s stagger |
| Lead paragraphs | rise 30px, then letters brighten from 32% to 100% white, 0.008s per char |
| Dividers | draw across, scaleX 0 to 1, 0.8s power2.inOut |
| Images | slide in from x -40 with opacity, 0.8s power3.out |
| Text blocks | rise y 30, 0.7s power3.out |
| Trip cards | title, price, photo, meta rows (0.08s stagger), then button scales in |
| Hero scroll | none: photo and headline scroll together as one block, no parallax |
| Hover | 0.2s colour or opacity changes only; no movement, no zoom |

Respect `prefers-reduced-motion` (no reveals, no marquee). Keep everything at 60fps: no live `backdrop-filter` or `filter: blur()` on scrolling layers (use pre-blurred images), keep grade layers inside the moving group.

## 8. Do and don't

Do:
- Size in rem, track in em, divide with 1px `--line`.
- Reuse existing classes (`.h2`, `.lead`, `.muted`, `.label`, `.btn--primary`, `.btn--secondary`, `.line-top`) before adding new ones.
- Check every change at 1440x900, 1024x768, 1920x1080, 390x844 and 360x740.
- Keep the `?clean` variant working (it hides counters, labels and divider lines).

Don't:
- No glowing orbs, decorative particles, purple gradients, beige blocks, emoji, em dashes, all-caps headings, monospace text.
- No rounded image corners or drop shadows.
- No invented content, fake reviews or fake staff.
- No new fonts or colours outside the tables above.

## 9. Files

- `index.html` markup and SVG symbols (`#mark`, `#pinch`, icon set).
- `src/style.css` all styles; mobile overrides in the `@media (max-width: 767px)` blocks.
- `src/main.js` trips grid, trip panel, hero framing, all animation.
- `src/trips.js` trip details (itinerary, prices, inclusions, gallery).
- `src/map.js` destination map.
- `public/photos/` images (`web/`, `trips/`, `press/white/`).
- `CREDITS.md` photo credits. `README.md` run instructions and open questions for the client.
- `cook/` local working notes and reference captures (git-ignored, never published).
