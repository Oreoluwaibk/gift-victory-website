import { couplePhotos, giftSrc } from "./gift-images";

export const wedding = {
  groom: {
    name: "Dr Gift Oladipo Gureje",
    shortName: "Gift",
  },
  bride: {
    name: "Dr Victory Ngozichukwu Elikwu",
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
      name: "White Wedding — RCCG Goodnews Arena",
      address:
        "RCCG Goodnews Arena (Beside Christ High School), Oleyo Road, Orita Challenge, Ibadan",
      time: "10:00 AM",
      mapQuery:
        "RCCG Goodnews Arena Oleyo Road Orita Challenge Ibadan",
    },
    reception: {
      name: "Reception — Light Magic Event Centre",
      address:
        "No 65, IDC, Julius Mojisola Street, Odo-Ona Elewe, Oluyole, Ibadan",
      time: "1:00 PM",
      mapQuery:
        "Light Magic Event Centre Julius Mojisola Street Odo-Ona Elewe Oluyole Ibadan",
    },
    parkingNotes:
      "Parking is available at both venues. We recommend arriving early for the 10:00 AM ceremony. The reception at Light Magic Event Centre follows at 1:00 PM.",
  },
  story: {
    tagline:
      "From a hospital posting in Ile-Ife to forever — a love rooted in faith, friendship, and God's perfect timing.",
    intro:
      "Gift and Victory met in 2023 at the Seventh Day Adventist Hospital in Ile-Ife — he a house officer, she a medical student on posting. What began with academic conversations grew into phone calls, friendship, and a courtship both believe God prepared long before they ever met. On 7 December 2024, Victory said yes. Now, after sixteen months of discovery and growth, they invite you to witness the next chapter of their story.",
    homeIntro:
      "They met as doctor and medical student in Ile-Ife, grew from friendship into faith-filled courtship, and now invite you to celebrate their wedding with them.",
    portraits: {
      groom: {
        src: giftSrc("groom1.jpeg"),
        alt: "Dr Gift Oladipo Gureje",
      },
      bride: {
        src: giftSrc("bride.jpg"),
        alt: "Dr Victory Ngozichukwu Elikwu",
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
          "Their paths crossed at the Seventh Day Adventist Hospital in Ile-Ife, Osun State. Gift was completing his housemanship; Victory was a fifth-year medical student on posting. Their earliest conversations centred on academics — professional, focused, and unremarkable at the time. Yet beneath the surface, a foundation was being laid that neither of them could yet see.",
      },
      {
        title: "A Friendship Grows",
        year: "2024",
        content:
          "When Victory's posting ended and she left Ile-Ife, they stayed in touch — first occasionally, then more often, until the phone became a bridge between two hearts learning to know each other. In September 2024, Gift travelled to attend her medical induction ceremony — a milestone she would never forget. By October and November, Victory began to feel something deeper. It was her first relationship, and she was careful, prayerful, and honest with herself about every step.",
      },
      {
        title: "Led by Faith",
        year: "Late 2024",
        content:
          "For Gift, the journey had begun even earlier — in 2020, when he sensed God revealing something about his future marriage. Scriptures such as Psalm 66:8–12, Genesis 26:17–22, and the story of Rebekah in Genesis 24 became reference points along the way. When Victory entered his life, it felt like confirmation of what God had already spoken. Victory, too, sought the Holy Spirit's guidance and studied Christian teachings on relationships. When Gift proposed a courtship with the intention of marriage, she received Isaiah 60:22 — a promise that a small one would become a strong nation, in God's time.",
      },
      {
        title: "Courtship Begins",
        year: "7 December 2024",
        content:
          "After speaking with her parents, Victory gave her reply on 7 December 2024 — yes. With the support of both families and mentors, their courtship officially began. What followed has been a season of discovery: learning about themselves, about each other, and about the life they hope to build together under God.",
      },
      {
        title: "Sixteen Months of Discovery",
        year: "2024 – 2026",
        content:
          "Victory describes Gift as a man of the Word — generous, wise, goal-oriented, and patient enough to love and teach her even when she feels stubborn or unteachable. Gift sees in Victory a devoted believer with a gentle, calm spirit; a woman who values peace and has brought that peace into his life. She is sweet, homely, caring, and always wants the best for him. Together they hold to Philippians 1:6 — confident that He who began this good work will carry it through to completion.",
      },
      {
        title: "Our Wedding Day",
        year: "21 November 2026",
        content:
          "Join us in Ibadan for our white wedding and a reception. Your presence would mean the world to us as we begin this beautiful journey as husband and wife.",
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
