"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ZoomIn } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/PageTransition";
import { gallery, type GalleryItem } from "@/lib/gallery-images";
import { wedding } from "@/lib/wedding-data";

function GalleryMedia({
  item,
  priority = false,
  className = "",
}: {
  item: GalleryItem;
  priority?: boolean;
  className?: string;
}) {
  if (item.type === "video") {
    return (
      <div
        className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-black ${className}`}
      >
        <video
          src={item.src}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-purple-deep shadow-lg">
            <Play className="h-6 w-6 fill-current pl-0.5" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl ${className}`}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
        priority={priority}
      />
    </div>
  );
}

export default function GalleryPage() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

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
        {gallery.map((item, index) => (
          <StaggerItem key={item.id}>
            <button
              type="button"
              onClick={() => setSelected(item)}
              className="group relative w-full overflow-hidden rounded-2xl text-left"
            >
              <GalleryMedia item={item} priority={index < 3} />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <div className="flex w-full items-center justify-between text-white">
                  <span className="text-sm font-medium">{item.caption}</span>
                  {item.type === "video" ? (
                    <Play className="h-4 w-4 fill-current" />
                  ) : (
                    <ZoomIn className="h-4 w-4" />
                  )}
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
              className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl"
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

              {selected.type === "video" ? (
                <video
                  src={selected.src}
                  controls
                  autoPlay
                  className="max-h-[70vh] w-full bg-black object-contain"
                />
              ) : (
                <div className="relative aspect-[4/5] max-h-[70vh] w-full sm:aspect-auto sm:min-h-[50vh]">
                  <Image
                    src={selected.src}
                    alt={selected.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-contain"
                    priority
                  />
                </div>
              )}

              <div className="bg-card px-6 py-4">
                <p className="font-display text-xl font-semibold">
                  {selected.caption}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{selected.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
