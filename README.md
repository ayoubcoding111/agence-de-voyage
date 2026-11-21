# Fancyellow homepage

Homepage for Fancyellow, an Algiers travel agency and tour operator running private tours across Algeria.

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

Trips, prices, contact details and the 4.8 / 58 reviews Trustpilot figure come from Fancyellow's own site and Trustpilot profile (November 2026). Prices marked "on request" were not published.

To check with the client before launch:
- Which office address is current (the site and Trustpilot show different ones). The map and maps links search for "20 avenue Abdelkader, Algiers", which Google places at 20 Av. Ziar Abdelkader, Bologhine; replace the query in index.html with the client's own Google Maps link once confirmed.
- Real photos of the team and guides. The portraits in the "People of Algeria" section are stock photos captioned by place, not staff.
- Djanet trip details and price.

## Photos

All photos are free-licensed (Unsplash and Pexels). Photographers and sources are listed in [CREDITS.md](CREDITS.md).
