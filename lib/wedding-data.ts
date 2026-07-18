import { couplePhotos, giftSrc } from "./gift-images";

export const wedding = {
  groom: {
    name: "Gift Oladipo Gureje",
    shortName: "Gift",
  },
  bride: {
    name: "Victory Ngozichukwu Elikwu",
    shortName: "Victory",
  },
  hashtag: "#PerfectLove26",
  date: "2026-11-21",
  dateDisplay: "Saturday, 21 November 2026",
  eventTitle: "White Wedding",
  venue: "Ibadan, Nigeria",
  siteUrl: "https://perfect-love26.netlify.app",
  location: {
    confirmed: true,
    city: "Ibadan",
    state: "Oyo State",
    country: "Nigeria",
    latitude: 7.4166,
    longitude: 3.9006,
    mapQuery: "Orita Challenge, Ibadan, Nigeria",
    ceremony: {
      name: "White Wedding — RCCG Goodnews Zonal Headquarters",
      address:
        "RCCG, Goodnews Zonal Headquarters (Beside Christ High School), Oleyo Road, Tipper garage, Orita Challenge, Ibadan",
      time: "11:00 AM",
      mapQuery: "8RGV+2WG, Idi-Iroko/Ikereku 110115, Oyo, Nigeria",
    },
    reception: {
      name: "Reception — Light Magic Event Centre",
      address:
        "No 65, IDC Primary School, Tipper Garage,Off Akala Express Road, Ibadan",
      time: "2:00 PM",
      mapQuery:
        "Light Magic Event Centre Julius Mojisola Street Odo-Ona Elewe Oluyole Ibadan",
    },
    parkingNotes:
      "Parking is available at both venues. We recommend arriving early for the 10:00 AM ceremony. The reception at Light Magic Event Centre follows at 1:00 PM.",
  },
  story: {
    tagline:
      "A love rooted in faith, friendship, and God's perfect timing.",
    intro:
      "Gift and Victory met in 2023 in Ile-Ife. What began as an academic conversation grew into phone calls, friendship, and a courtship both believe God prepared long before they ever met. On 7 December 2024, Victory said yes. Now, after two years of discovery and growth, they invite you to witness the next chapter of their story.",
    homeIntro:
      "They met in Ile-Ife, grew from friendship into courtship, and now invite you to celebrate their wedding with them.",
    portraits: {
      groom: {
        src: giftSrc("groom1.jpeg"),
        alt: "Gift Oladipo Gureje",
      },
      bride: {
        src: giftSrc("bride.jpg"),
        alt: "Victory Ngozichukwu Elikwu",
      },
      hero: {
        src: giftSrc(couplePhotos.hero),
        alt: "Gift and Victory together",
      },
      together: couplePhotos.together.map((file) => ({
        src: giftSrc(file),
        alt: "Gift and Victory together",
      })),
    },
    verses: [
      {
        reference: "Isaiah 60:22",
        text: "A little one shall become a thousand, and a small one a strong nation: I the Lord will hasten it in his time.",
      },
      {
        reference: "Philippians 1:6",
        text: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.",
      },
    ],
    chapters: [
      {
        title: "How We Met",
        year: "2023 · Ile-Ife",
        content:
          "We met at the Seventh Day Adventist Hospital in Ile-Ife, Osun State. Gift was completing his housemanship, and I was a fifth-year medical student on posting. Our earliest conversations centred on academics — professional, focused, and unremarkable at the time. Yet beneath the surface, a foundation was being laid that we could not yet see.",
      },
      {
        title: "A Friendship Grows",
        year: "2024",
        content:
          "When my posting ended and I left Ile-Ife, we stayed in touch — first occasionally, then more often, until the phone became a bridge between our hearts. In September 2024, Gift travelled to attend my medical induction ceremony — a milestone I will never forget. By October and November, I began to feel something deeper. It was my first relationship, and I was careful, prayerful, and honest with myself about every step.",
      },
      {
        title: "Led by Faith",
        year: "Late 2024",
        content:
          "For Gift, this journey had begun even earlier — in 2020, when he sensed God revealing something about his future marriage. When we met each other, it felt like confirmation of what God had already spoken. I, too, sought the Holy Spirit's guidance and studied Christian teachings on relationships. Gift proposed a courtship with the intention of marriage, on the 30th of November 2024.",
      },
      {
        title: "Courtship Begins",
        year: "7 December 2024",
        content:
          "After speaking with my parents, I gave my reply on 7 December 2024 — yes. With the support of both our families and mentors, our courtship officially began. What followed has been a season of discovery: learning about ourselves, about each other, and about the life we hope to build together under God.",
      },
      // {
      //   title: "Two years of Discovery",
      //   year: "2024 – 2026",
      //   content:
      //     "I know Gift as a man of the Word — generous, wise, goal-oriented, and patient enough to love and teach me even when I feel stubborn or unteachable. Gift sees in me a devoted believer with a gentle, calm spirit; a woman who values peace and has brought that peace into his life. He says I am sweet, homely, caring, and always want the best for him. Together we hold to Philippians 1:6 — confident that He who began this good work in us will carry it through to completion.",
      // },
      {
        title: "Our Wedding Day",
        year: "21 November 2026",
        content:
          "We invite you to join us in Ibadan for our white wedding and reception. Your presence would mean the world to us as we begin this beautiful journey as husband and wife.",
      },
    ],
  },
  gifts: {
    title: "Gift the Couple",
    subtitle:
      "Your presence is our greatest gift. If you wish to bless us further, you may send a gift to either account below.",
    accounts: [
      {
        name: "Gureje Gift",
        bank: "Access Bank",
        accountNumber: "0699940157",
      },
      {
        name: "Elikwu Victory",
        bank: "Access Bank",
        accountNumber: "0101075560",
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

export function getMapEmbedUrl(query: string): string {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}

export function getGoogleMapsDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function getGoogleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
