# Agence de voyage: Chouchou Tours homepage

Demo homepage for **Chouchou Tours**, a travel agency in Birkhadem, Algiers, that runs private guided visits, day trips and circuits à la carte across Algeria. The agency has no website; this page is a proposal made for them. It is not their official site and is not affiliated with them.

Stack: Vite, vanilla JS, GSAP with ScrollTrigger, d3-geo for the map. Font: Inter.

## Run

```
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

Add `?clean` to the URL for the variant without step counters, small section labels and divider lines.

## What is in code

- Layout, type, icons, buttons, all motion (intro, line-by-line heading reveals, parallax).
- Hero depth effect: the photo is drawn twice and the front copy is clipped along the ridge line, so the headline sits between the mountains and the foreground.
- Photo colour grade (CSS filters and blend layers), the foreground depth-of-field blur, the misty band's golden tint.
- The map of tour cities (d3-geo with world-atlas outline data).

## Content

Every fact comes from a public source, checked in November 2026:
- The agency's Facebook page (facebook.com/chouchoutours) and TikTok bio (tiktok.com/@chouchoutours): the offer, the 9-seat vehicle, the guesthouse and rental, follower counts.
- Its Google Maps listing: the Birkhadem address and the 4.4 rating from 137 reviews.
- visa-algerie.com reports on her trips (April 2025, November 2025, February 2026, August 2026): the trips and routes in `src/main.js` and `src/trips.js`.

Prices are not published, so every trip says "On request". Ratings and follower counts change; update them before showing the page.

To check with the agency before launch:
- Prices, trip lengths and what each trip includes.
- Whether they want English, French or both (their clients and posts are mostly French).
- Real photos of their trips and of Chouchou. The portraits in the "People of Algeria" section are stock photos captioned by place, not staff.

## Photos

All photos are free-licensed (Unsplash and Pexels). Photographers and sources are listed in [CREDITS.md](CREDITS.md).
