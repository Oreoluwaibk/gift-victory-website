import { giftSrc } from "./gift-images";

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  caption: string;
  type: "image" | "video";
};

const captions = [
  "Our engagement",
  "Pure joy",
  "Together forever",
  "Celebrating love",
  "Elegant moments",
  "Hand in hand",
  "A beautiful beginning",
  "Love in bloom",
  "Forever starts here",
  "Two hearts, one love",
  "Captured memories",
  "Perfect together",
  "Our favorite moment",
  "Smiles & laughter",
  "Built on love",
  "The journey so far",
  "Unforgettable day",
  "Blessed union",
  "Radiant joy",
  "Our story",
  "Precious moments",
  "Love always wins",
  "Grateful hearts",
  "Perfect Love",
  "Our celebration",
];

const files: { file: string; type: GalleryItem["type"] }[] = [
  { file: "20251122_123807.jpg", type: "image" },
  { file: "20251122_122709.jpg", type: "image" },
  { file: "20251122_123745.jpg", type: "image" },
  { file: "20251122_123755.jpg", type: "image" },
  { file: "20251122_123819.jpg", type: "image" },
  { file: "20251122_123826.mp4", type: "video" },
  { file: "20251122_124133.jpg", type: "image" },
  { file: "20251122_124222.jpg", type: "image" },
  { file: "20251122_145732.jpg", type: "image" },
  { file: "20251122_145736.jpg", type: "image" },
  { file: "20251123_095927.jpg", type: "image" },
  { file: "20251123_095928.jpg", type: "image" },
  { file: "20251123_100033.jpg", type: "image" },
  { file: "bride&groom.jpeg", type: "image" },
  { file: "bride&groom2.jpeg", type: "image" },
  { file: "bride&groom3.jpeg", type: "image" },
  { file: "bride.jpg", type: "image" },
  { file: "groom1.jpeg", type: "image" },
  { file: "groom2.jpeg", type: "image" },
  { file: "IMG-20260215-WA0003.jpg", type: "image" },
  { file: "IMG-20260228-WA0007.jpg", type: "image" },
  { file: "IMG-20260228-WA0022.jpg", type: "image" },
  { file: "IMG-20260228-WA0030.jpg", type: "image" },
  { file: "IMG-20260326-WA0017.jpg", type: "image" },
  { file: "IMG-20260326-WA0018.jpg", type: "image" },
];

function getCaption(file: string, index: number): string {
  if (file === "groom1.jpeg" || file === "groom2.jpeg") return "The Groom";
  if (file === "bride.jpg") return "The Bride";
  if (
    file === "bride&groom.jpeg" ||
    file === "bride&groom2.jpeg" ||
    file === "bride&groom3.jpeg"
  ) {
    return "Together";
  }
  return captions[index % captions.length];
}

function getAlt(file: string, caption: string): string {
  if (file === "groom1.jpeg" || file === "groom2.jpeg") {
    return `Dr Gift Oladipo Gureje — ${caption}`;
  }
  if (file === "bride.jpg") {
    return `Dr Victory Ngozichukwu Elikwu — ${caption}`;
  }
  if (
    file === "bride&groom.jpeg" ||
    file === "bride&groom2.jpeg" ||
    file === "bride&groom3.jpeg"
  ) {
    return `Gift & Victory — ${caption}`;
  }
  return `Gift & Victory — ${caption}`;
}

export const gallery: GalleryItem[] = files.map(({ file, type }, index) => {
  const caption =
    type === "video" ? "Our story in motion" : getCaption(file, index);
  return {
    id: index + 1,
    src: giftSrc(file),
    alt: getAlt(file, caption),
    caption,
    type,
  };
});

export const featuredGalleryImage = gallery[0];
