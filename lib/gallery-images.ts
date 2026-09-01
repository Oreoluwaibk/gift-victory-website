import { giftSrc } from "./gift-images";

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  caption: string;
  type: "image" | "video";
};

const groomFiles = new Set(["groom1.jpeg"]);
const brideFiles = new Set(["victory-new-2.jpeg"]);

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

function getCaption(file: string): string {
  if (groomFiles.has(file)) return "The Groom";
  if (brideFiles.has(file)) return "The Bride";
  return "";
}

function getAlt(file: string, caption: string): string {
  if (groomFiles.has(file)) {
    return `Gift Oladipo Gureje — ${caption}`;
  }
  if (brideFiles.has(file)) {
    return `Victory Ngozichukwu Elikwu — ${caption}`;
  }
  return "Wedding gallery photo";
}

export const gallery: GalleryItem[] = files.map(({ file, type }, index) => {
  const caption = getCaption(file);
  return {
    id: index + 1,
    src: giftSrc(file),
    alt: getAlt(file, caption),
    caption,
    type,
  };
});

export const featuredGalleryImage = gallery[0];
