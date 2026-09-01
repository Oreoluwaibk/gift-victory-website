import QRCode from "qrcode";

type QrPassImageOptions = {
  guestName: string;
  code: string;
  checkInUrl: string;
};

const PURPLE = "#4a148c";
const MUTED = "#5c4a6e";
const LIGHT_BG = "#ffffff";

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function drawLines(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  startY: number,
  lineHeight: number
): number {
  let y = startY;
  for (const line of lines) {
    ctx.fillText(line, x, y);
    y += lineHeight;
  }
  return y;
}

/** Build a downloadable pass image with QR, link, and venue instructions. */
export async function generateQrPassImage(
  options: QrPassImageOptions
): Promise<string> {
  const { guestName, code, checkInUrl } = options;
  const width = 600;
  const padding = 40;
  const contentWidth = width - padding * 2;

  const qrSize = 280;
  const qrDataUrl = await QRCode.toDataURL(checkInUrl, {
    width: qrSize,
    margin: 2,
    color: { dark: PURPLE, light: LIGHT_BG },
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create pass image.");

  const instructions = [
    "1. Save this image on your phone before the wedding day.",
    "2. At the venue, show this QR code to the ushers for check-in.",
    "3. This link works only once — do not share it with anyone else.",
    "4. If you lose this pass, contact the couple before the event.",
  ];

  ctx.font = "16px Georgia, serif";
  const instructionLines = instructions.flatMap((line) =>
    wrapText(ctx, line, contentWidth)
  );

  const height =
    padding +
    80 +
    qrSize +
    120 +
    instructionLines.length * 24 +
    padding;

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = LIGHT_BG;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = PURPLE;
  ctx.font = "bold 26px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("Perfect Love Wedding", width / 2, padding + 28);

  ctx.font = "18px Georgia, serif";
  ctx.fillStyle = MUTED;
  ctx.fillText("Your Entry Pass", width / 2, padding + 58);

  const qrImage = await loadImage(qrDataUrl);
  const qrX = (width - qrSize) / 2;
  const qrY = padding + 80;
  ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

  let y = qrY + qrSize + 36;
  ctx.textAlign = "left";
  ctx.fillStyle = MUTED;
  ctx.font = "14px Georgia, serif";
  ctx.fillText("Guest", padding, y);
  ctx.fillStyle = "#1a1025";
  ctx.font = "bold 18px Georgia, serif";
  ctx.fillText(guestName, padding, y + 24);

  y += 56;
  ctx.fillStyle = MUTED;
  ctx.font = "14px Georgia, serif";
  ctx.fillText("Pass code", padding, y);
  ctx.fillStyle = PURPLE;
  ctx.font = "bold 20px monospace";
  ctx.fillText(code, padding, y + 26);

  y += 56;
  ctx.fillStyle = MUTED;
  ctx.font = "14px Georgia, serif";
  ctx.fillText("Check-in link", padding, y);
  ctx.fillStyle = "#1a1025";
  ctx.font = "13px monospace";
  const linkLines = wrapText(ctx, checkInUrl, contentWidth);
  y = drawLines(ctx, linkLines, padding, y + 22, 18);

  y += 20;
  ctx.fillStyle = PURPLE;
  ctx.font = "bold 16px Georgia, serif";
  ctx.fillText("How to use this pass", padding, y);

  y += 28;
  ctx.fillStyle = MUTED;
  ctx.font = "15px Georgia, serif";
  drawLines(ctx, instructionLines, padding, y, 24);

  return canvas.toDataURL("image/png");
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load QR image."));
    img.src = src;
  });
}
