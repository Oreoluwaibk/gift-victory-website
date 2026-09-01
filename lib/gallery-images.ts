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

const groomFiles = new Set(["groom1.jpeg"]);
const brideFiles = new Set(["victory-new-2.jpeg"]);
const togetherFiles = new Set([
  "20251122_123807.jpg",
  "20251123_100033.jpg",
  "IMG-20260326-WA0017.jpg",
  "t1.jpeg",
  "t2.jpeg",
  "t3.jpeg",
  "t5.jpeg",
]);

const files: { file: string; type: GalleryItem["type"] }[] = [
  { file: "20251122_123807.jpg", type: "image" },
  { file: "20251123_100033.jpg", type: "image" },
  { file: "groom1.jpeg", type: "image" },
  { file: "victory-new-2.jpeg", type: "image" },
  { file: "t1.jpeg", type: "image" },
  { file: "t2.jpeg", type: "image" },
  { file: "t3.jpeg", type: "image" },
  { file: "t5.jpeg", type: "image" },
  { file: "IMG-20260326-WA0017.jpg", type: "image" },
];

function getCaption(file: string, index: number): string {
  if (groomFiles.has(file)) return "The Groom";
  if (brideFiles.has(file)) return "The Bride";
  if (togetherFiles.has(file)) return "Together";
  return captions[index % captions.length];
}

function getAlt(file: string, caption: string): string {
  if (groomFiles.has(file)) {
    return `Gift Oladipo Gureje — ${caption}`;
  }
  if (brideFiles.has(file)) {
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
