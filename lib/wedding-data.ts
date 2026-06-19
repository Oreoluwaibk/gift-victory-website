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
} as const;

export type NavItem = {
  href: string;
  label: string;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
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
