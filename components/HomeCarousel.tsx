"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/lib/gallery-images";

const carouselImages = gallery.filter((item) => item.type === "image").slice(0, 8);

export function HomeCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slide = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }, [index]);

  const next = useCallback(() => {
    slide((index + 1) % carouselImages.length);
  }, [index, slide]);

  const prev = useCallback(() => {
    slide((index - 1 + carouselImages.length) % carouselImages.length);
  }, [index, slide]);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  const current = carouselImages[index];

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.96 }),
  };

  return (
    <div className="relative w-full">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-purple-deep/15 sm:aspect-[3/4] lg:aspect-[4/5]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep/20 via-transparent to-purple-soft/10" />

        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-lg font-semibold text-white sm:text-xl"
              >
                {current.caption}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-purple-deep shadow-md transition hover:bg-white sm:h-10 sm:w-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-purple-deep shadow-md transition hover:bg-white sm:h-10 sm:w-10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {carouselImages.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => slide(i)}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-purple-rich"
                  : "w-2 bg-purple-soft/40 hover:bg-purple-soft/70"
              }`}
            />
          ))}
        </div>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-1 text-sm font-semibold text-purple-rich transition hover:gap-2"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-glow/20 blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function HomePhotoStrip() {
  const strip = gallery.filter((item) => item.type === "image").slice(0, 6);
  const doubled = [...strip, ...strip];

  return (
    <div className="relative mt-16 overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="relative h-28 w-20 shrink-0 overflow-hidden rounded-2xl sm:h-36 sm:w-28"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
