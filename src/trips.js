// Trip details for Chouchou Tours, in the same order as `trips` in main.js.
// Sources (checked November 2026): the agency's Facebook page (facebook.com/chouchoutours), its TikTok bio
// (tiktok.com/@chouchoutours) and visa-algerie.com reports on her trips (Apr 2025, Nov 2025, Feb 2026, Aug 2026).
// Prices are not published, so every trip is "On request". Never add a stop, price or service that is not in a source.
// gallery: photos in /photos/trips/ (free licence, credited in CREDITS.md); missing files are skipped at runtime.
const ON_REQUEST = [['Price', 'On request']];

export const tripDetails = [
  {
    id: 'tour-of-algeria',
    intro: 'The big one: a three-week road trip across Algeria, through 10 cities and 5 UNESCO World Heritage sites, driven by Chouchou herself, more than 5,000 km.',
    prices: ON_REQUEST,
    days: [
      ['North', 'The Casbah of Algiers, the Roman ruins of Tipaza and villages in Kabylie.'],
      ['Coast', 'Gouraya National Park, Béjaïa.'],
      ['East', 'Djemila, Timgad and Constantine.'],
      ['Aures', 'The Ghoufi canyon.'],
      ['South', 'The M\'Zab valley, Biskra and the desert at Timimoun.'],
    ],
    included: ['A national guide who drives the whole route', 'A 9-seat vehicle', 'Guesthouse stays and home cooking'],
    notes: ['Chouchou ran this trip in 2024 for four travellers from France.', 'She calls her trips cultural and solidarity tourism.', 'Dates and stops are planned with you.'],
    gallery: ['roman-3', 'constantine-1', 'ghardaia-1'],
  },
  {
    id: 'algiers-tipaza',
    intro: 'A first taste of Algeria: the capital and its Casbah, then the Roman ruins of Tipaza and the Royal Mausoleum of Mauretania.',
    prices: ON_REQUEST,
    days: [
      ['Arrival', 'Airport pickup, then the guesthouse and a meal with the family.'],
      ['Algiers', 'The Casbah and the city museums.'],
      ['Tipaza', 'The Roman ruins by the sea and the Royal Mausoleum of Mauretania.'],
    ],
    included: ['Airport pickup', 'Guesthouse stay with a family meal', 'Guided visits'],
    notes: ['Based on a stay Chouchou ran in 2025. The length is planned with you.'],
    gallery: ['algiers-2', 'tipasa-1', 'tipasa-2'],
  },
  {
    id: 'family-trip',
    intro: 'A made-to-measure family trip from the coast to the edge of the Sahara, ending with a 4x4 desert safari.',
    prices: ON_REQUEST,
    days: [
      ['Coast', 'Algiers, Tipaza and Béjaïa.'],
      ['High plains', 'Sétif and Constantine.'],
      ['Aures', 'Batna.'],
      ['Desert gates', 'Biskra and Bou Saâda, with a 4x4 desert safari.'],
    ],
    included: ['A national guide and driver', 'A 9-seat vehicle', 'A 4x4 desert safari'],
    notes: ['Chouchou ran this route for a family from France in early 2026.'],
    gallery: ['constantine-2', 'tipasa-3', 'algiers-1'],
  },
  {
    id: 'day-visits',
    intro: 'Day visits with a national guide and a 9-seat vehicle, for a family or a small group.',
    prices: ON_REQUEST,
    days: [
      ['Morning', 'Pickup in Algiers.'],
      ['Day', 'Places and pace chosen with you.'],
    ],
    included: ['A national guide', 'A 9-seat vehicle'],
    notes: ['Ask on WhatsApp for dates and prices.'],
    gallery: ['algiers-1', 'algiers-3'],
  },
  {
    id: 'a-la-carte',
    intro: 'Tell Chouchou where you want to go and she builds the circuit: cities, Roman sites, mountains or desert, anywhere in Algeria.',
    prices: ON_REQUEST,
    days: [
      ['01', 'You send the places, the dates and the pace.'],
      ['02', 'Chouchou plans the route and the stops.'],
      ['03', 'She guides and drives you in a 9-seat vehicle.'],
    ],
    included: ['A national guide', 'A 9-seat vehicle', 'A route planned with you'],
    notes: ['Ask on WhatsApp for dates and prices.'],
    gallery: ['ghardaia-2', 'roman-2', 'constantine-3'],
  },
  {
    id: 'guesthouse',
    intro: 'A guesthouse and seasonal rental in Algiers, a base for your visits, with home cooking.',
    prices: ON_REQUEST,
    days: [],
    included: ['Guesthouse or seasonal rental in Algiers', 'Airport pickup on request'],
    notes: ['Ask on WhatsApp for dates and prices.'],
    gallery: ['algiers-1', 'algiers-2'],
  },
];
