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
];

const togetherFiles = new Set([
  "20251122_123807.jpg",
  "20251123_100033.jpg",
  "IMG-20260326-WA0017.jpg",
  "IMG-20260326-WA0018.jpg",
]);

const files: { file: string; type: GalleryItem["type"] }[] = [
  { file: "20251122_123807.jpg", type: "image" },
  { file: "20251123_100033.jpg", type: "image" },
  { file: "groom1.jpeg", type: "image" },
  { file: "groom2.jpeg", type: "image" },
  { file: "victory-new-1.jpeg", type: "image" },
  { file: "victory-new-2.jpeg", type: "image" },
  { file: "victory-new-3.jpeg", type: "image" },
  { file: "IMG-20260326-WA0017.jpg", type: "image" },
  { file: "IMG-20260326-WA0018.jpg", type: "image" },
];

function getCaption(file: string, index: number): string {
  if (file === "groom1.jpeg" || file === "groom2.jpeg") return "The Groom";
  if (
    file === "victory-new-1.jpeg" ||
    file === "victory-new-2.jpeg" ||
    file === "victory-new-3.jpeg"
  ) {
    return "The Bride";
  }
  if (togetherFiles.has(file)) return "Together";
  return captions[index % captions.length];
}

function getAlt(file: string, caption: string): string {
  if (file === "groom1.jpeg" || file === "groom2.jpeg") {
    return `Gift Oladipo Gureje — ${caption}`;
  }
  if (
    file === "victory-new-1.jpeg" ||
    file === "victory-new-2.jpeg" ||
    file === "victory-new-3.jpeg"
  ) {
    return `Victory Ngozichukwu Elikwu — ${caption}`;
  }
  if (togetherFiles.has(file)) {
    return `Gift & Victory — ${caption}`;
  }
  return `Gift & Victory — ${caption}`;
}

export const gallery: GalleryItem[] = files.map(({ file, type }, index) => {
  const caption = getCaption(file, index);
  return {
    id: index + 1,
    src: giftSrc(file),
    alt: getAlt(file, caption),
    caption,
    type,
  };
});

export const featuredGalleryImage = gallery[0];
