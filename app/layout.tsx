import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteShell } from "@/components/SiteShell";
import { wedding } from "@/lib/wedding-data";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${wedding.groom.shortName} & ${wedding.bride.shortName} | Perfect Love Wedding`,
    template: "%s | Perfect Love Wedding",
  },
  description: `Celebrate the union of ${wedding.groom.name} and ${wedding.bride.name}. RSVP, view our gallery, and find venue details.`,
  openGraph: {
    title: "Perfect Love Wedding",
    description: `${wedding.groom.name} & ${wedding.bride.name}`,
    url: wedding.siteUrl,
    siteName: "Perfect Love Wedding",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
