/** Build a safe public URL for files in /public/gift (handles & and spaces). */
export function giftSrc(filename: string): string {
  return `/gift/${encodeURIComponent(filename)}`;
}

export const couplePhotos = {
  hero: "bride&groom.jpeg",
  together: ["bride&groom2.jpeg", "bride&groom3.jpeg"] as const,
};

export const bridePhotos = {
  portrait: "victory-new-1.jpeg",
  more: ["victory-new-2.jpeg", "victory-new-3.jpeg"] as const,
};
