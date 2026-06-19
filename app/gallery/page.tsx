"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/PageTransition";
import { wedding } from "@/lib/wedding-data";

function PlaceholderImage({ id, alt }: { id: number; alt: string }) {
  const hues = [280, 290, 270, 300, 285, 275];
  const hue = hues[(id - 1) % hues.length];

  return (
    <div
      className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(145deg, hsl(${hue} 45% 22%) 0%, hsl(${hue + 15} 55% 38%) 50%, hsl(${hue} 30% 18%) 100%)`,
      }}
      aria-label={alt}
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-purple-glow/20 blur-3xl" />
      </div>
      <div className="relative text-center text-white/90">
        <p className="font-display text-3xl font-semibold">G & V</p>
        <p className="mt-1 text-xs uppercase tracking-widest opacity-70">
          Photo {id}
        </p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [selected, setSelected] = useState<(typeof wedding.gallery)[number] | null>(
    null
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-rich">
          Our Story in Pictures
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
          Gallery
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Moments of laughter, love, and joy — a glimpse into the journey of{" "}
          {wedding.groom.shortName} & {wedding.bride.shortName}.
        </p>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {wedding.gallery.map((item) => (
          <StaggerItem key={item.id}>
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="group relative w-full overflow-hidden rounded-2xl text-left"
            >
              <PlaceholderImage id={item.id} alt={item.alt} />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <div className="flex w-full items-center justify-between text-white">
                  <span className="text-sm font-medium">{item.caption}</span>
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>
            </button>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <PlaceholderImage id={selected.id} alt={selected.alt} />
              <div className="bg-card px-6 py-4">
                <p className="font-display text-xl font-semibold">{selected.caption}</p>
                <p className="mt-1 text-sm text-muted-foreground">{selected.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
