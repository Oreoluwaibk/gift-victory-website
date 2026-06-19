export const wedding = {
  groom: {
    name: "Dr Gift Gureje",
    shortName: "Gift",
  },
  bride: {
    name: "Dr Victory Elikwu",
    shortName: "Victory",
  },
  hashtag: "#PerfectLove26",
  date: "2026",
  dateDisplay: "Date to be announced",
  venue: "Venue to be announced",
  siteUrl: "https://perfect-love26.netlify.app",
  location: {
    /** Set to true once the final venue address is confirmed */
    confirmed: false,
    address: "",
    city: "Abuja",
    region: "Federal Capital Territory",
    country: "Nigeria",
    latitude: 9.0579,
    longitude: 7.4951,
    /** Used for map search until exact address is set */
    mapQuery: "Abuja, Federal Capital Territory, Nigeria",
    ceremonyTime: "Ceremony & reception times to be announced",
    parkingNotes:
      "Directions and parking details will be shared with confirmed guests once the venue is finalized.",
  },
  story: {
    tagline:
      "A love story written with faith, friendship, and a whole lot of grace.",
    intro:
      "What began as a chance meeting blossomed into a lifelong partnership. Through shared dreams, laughter, and unwavering support, Gift and Victory found in each other a love worth celebrating.",
    portraits: {
      groom: {
        src: "/gift/IMG-20260228-WA0007.jpg",
        alt: "Dr Gift Gureje",
      },
      bride: {
        src: "/gift/IMG-20260228-WA0022.jpg",
        alt: "Dr Victory Elikwu",
      },
      together: {
        src: "/gift/IMG-20260326-WA0017.jpg",
        alt: "Gift and Victory together",
      },
    },
    chapters: [
      {
        title: "How We Met",
        year: "The Beginning",
        content:
          "Gift and Victory's paths crossed at a moment neither expected — yet both would later describe as perfectly timed. A conversation that started casually soon revealed shared values, ambitions, and a warmth that felt instantly familiar.",
      },
      {
        title: "Growing Together",
        year: "Building a Bond",
        content:
          "As doctors dedicated to serving others, they understood the weight of responsibility and the beauty of compassion. Side by side, they navigated demanding careers while nurturing a relationship rooted in respect, encouragement, and genuine friendship.",
      },
      {
        title: "The Proposal",
        year: "Forever Begins",
        content:
          "When Gift asked Victory to spend forever by his side, the answer was yes — spoken with joy, tears, and the certainty of two hearts that had already chosen each other long before the question was asked.",
      },
      {
        title: "Our Wedding Day",
        year: "Perfect Love",
        content:
          "Now they invite you to witness the next chapter of their story — a celebration of love, family, and the promise of forever. Your presence would mean the world to them as they begin this beautiful journey as husband and wife.",
      },
    ],
  },
} as const;

export type NavItem = {
  href: string;
  label: string;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/rsvp", label: "RSVP" },
  { href: "/location", label: "Location" },
];

export function getVenueDisplayAddress(): string {
  const { location, venue } = wedding;
  if (location.confirmed && location.address) {
    return [location.address, location.city, location.region, location.country]
      .filter(Boolean)
      .join(", ");
  }
  return venue;
}

export function getGoogleMapsDirectionsUrl(): string {
  const { location } = wedding;
  const query =
    location.confirmed && location.address
      ? [location.address, location.city, location.country].filter(Boolean).join(", ")
      : location.mapQuery;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function getGoogleMapsSearchUrl(): string {
  const { location } = wedding;
  const query =
    location.confirmed && location.address
      ? [location.address, location.city, location.country].filter(Boolean).join(", ")
      : location.mapQuery;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getMapEmbedUrl(): string {
  const { location } = wedding;
  const query =
    location.confirmed && location.address
      ? [location.address, location.city, location.country].filter(Boolean).join(", ")
      : `${location.latitude},${location.longitude}`;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`;
}
