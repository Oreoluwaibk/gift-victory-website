/** Build a safe public URL for files in /public/gift (handles & and spaces). */
export function giftSrc(filename: string): string {
  return `/gift/${encodeURIComponent(filename)}`;
}

/** Build a safe public URL for files in /public root. */
export function publicSrc(filename: string): string {
  return `/${encodeURIComponent(filename)}`;
}

export const couplePhotos = {
  hero: "20251122_123807.jpg",
  together: ["20251123_100033.jpg", "IMG-20260326-WA0017.jpg"] as const,
};

export const groomPhotos = {
  portrait: publicSrc("t32.jpeg"),
};

export const bridePhotos = {
  portrait: "victory-new-2.jpeg",
  more: [] as const,
};
