import { Heart } from "lucide-react";
import { wedding } from "@/lib/wedding-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center sm:px-6">
        <Heart className="h-5 w-5 text-purple-rich" />
        <p className="font-display text-xl font-semibold gradient-text">
          {wedding.groom.shortName} & {wedding.bride.shortName}
        </p>
        <p className="text-sm text-muted-foreground">
          {wedding.hashtag} · With love, forever
        </p>
        <p className="text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Perfect Love Wedding
        </p>
      </div>
    </footer>
  );
}
