"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { PageTransition } from "./PageTransition";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <AnimatePresence mode="wait">
        <PageTransition key={pathname}>{children}</PageTransition>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
