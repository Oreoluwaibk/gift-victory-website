import { giftSrc, publicSrc } from "./gift-images";

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  caption: string;
  type: "image" | "video";
};

type GalleryFile = {
  src: string;
  type: GalleryItem["type"];
};

const files: GalleryFile[] = [
  { src: giftSrc("20251122_123807.jpg"), type: "image" },
  { src: giftSrc("20251123_100033.jpg"), type: "image" },
  { src: publicSrc("t12.jpeg"), type: "image" },
  { src: publicSrc("t22.jpeg"), type: "image" },
  { src: giftSrc("groom1.jpeg"), type: "image" },
  { src: giftSrc("t5.jpeg"), type: "image" },
  { src: giftSrc("victory-new-2.jpeg"), type: "image" },
  { src: giftSrc("IMG-20260326-WA0017.jpg"), type: "image" },
];

function getCaption(src: string): string {
  if (src.includes("victory-new-2.jpeg")) return "The Bride";
  return "";
}

function getAlt(src: string, caption: string): string {
  if (caption === "The Bride") {
    return `Victory Ngozichukwu Elikwu — ${caption}`;
  }
  return "Wedding gallery photo";
}

export const gallery: GalleryItem[] = files.map(({ src, type }, index) => {
  const caption = getCaption(src);
  return {
    id: index + 1,
    src,
    alt: getAlt(src, caption),
    caption,
    type,
  };
});

export const featuredGalleryImage = gallery[0];
