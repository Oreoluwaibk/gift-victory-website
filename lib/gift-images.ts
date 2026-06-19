/** Build a safe public URL for files in /public/gift (handles & and spaces). */
export function giftSrc(filename: string): string {
  return `/gift/${encodeURIComponent(filename)}`;
}

export const couplePhotos = {
  hero: "bride&groom.jpeg",
  together: ["bride&groom2.jpeg", "bride&groom3.jpeg"] as const,
};
