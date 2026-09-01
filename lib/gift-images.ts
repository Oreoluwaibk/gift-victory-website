/** Build a safe public URL for files in /public/gift (handles & and spaces). */
export function giftSrc(filename: string): string {
  return `/gift/${encodeURIComponent(filename)}`;
}

export const couplePhotos = {
  hero: "20251122_123807.jpg",
  together: [
    "20251123_100033.jpg",
    "IMG-20260326-WA0017.jpg",
    "t1.jpeg",
    "t2.jpeg",
    "t3.jpeg",
    "t5.jpeg",
  ] as const,
};

export const bridePhotos = {
  portrait: "victory-new-2.jpeg",
  more: [] as const,
};
