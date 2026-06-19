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
  { file: "20251122_122617.jpg", type: "image" },
  { file: "20251122_122644.jpg", type: "image" },
  { file: "20251122_122649.jpg", type: "image" },
  { file: "20251122_122706.jpg", type: "image" },
  { file: "20251122_122709.jpg", type: "image" },
  { file: "20251122_123745.jpg", type: "image" },
  { file: "20251122_123747.jpg", type: "image" },
  { file: "20251122_123755.jpg", type: "image" },
  { file: "20251122_123807.jpg", type: "image" },
  { file: "20251122_123819.jpg", type: "image" },
  { file: "20251122_123826.mp4", type: "video" },
  { file: "20251122_124133.jpg", type: "image" },
  { file: "20251122_124211.jpg", type: "image" },
  { file: "20251122_124222.jpg", type: "image" },
  { file: "20251122_145732.jpg", type: "image" },
  { file: "20251122_145736.jpg", type: "image" },
  { file: "20251123_095927.jpg", type: "image" },
  { file: "20251123_095928.jpg", type: "image" },
  { file: "20251123_100029.jpg", type: "image" },
  { file: "20251123_100033.jpg", type: "image" },
  { file: "IMG-20260215-WA0003.jpg", type: "image" },
  { file: "IMG-20260228-WA0007.jpg", type: "image" },
  { file: "IMG-20260228-WA0022.jpg", type: "image" },
  { file: "IMG-20260228-WA0030.jpg", type: "image" },
  { file: "IMG-20260326-WA0017.jpg", type: "image" },
  { file: "IMG-20260326-WA0018.jpg", type: "image" },
];

export const gallery: GalleryItem[] = files.map(({ file, type }, index) => {
  const caption = captions[index % captions.length];
  return {
    id: index + 1,
    src: `/gift/${file}`,
    alt: `Gift & Victory — ${caption}`,
    caption: type === "video" ? "Our story in motion" : caption,
    type,
  };
});
