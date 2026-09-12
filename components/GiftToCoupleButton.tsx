"use client";

import { Gift } from "lucide-react";
import { useGiftModal } from "@/components/GiftModalProvider";
import { wedding } from "@/lib/wedding-data";

type GiftToCoupleButtonProps = {
  className?: string;
  variant?: "primary" | "outline" | "nav";
  onOpen?: () => void;
};

export function GiftToCoupleButton({
  className = "",
  variant = "outline",
  onOpen,
}: GiftToCoupleButtonProps) {
  const { openGiftModal } = useGiftModal();

  const baseClass =
    variant === "primary"
      ? "bg-purple-deep text-white shadow-lg shadow-purple-deep/20 hover:bg-purple-rich"
      : variant === "nav"
        ? ""
        : "border border-border bg-card hover:border-purple-soft hover:text-purple-rich";

  const layoutClass =
    variant === "nav"
      ? "block w-full font-[family-name:var(--font-inter)] transition-colors md:inline md:w-auto text-left"
      : "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors";

  const handleClick = () => {
    openGiftModal();
    onOpen?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${layoutClass} ${baseClass} ${className}`}
    >
      {variant !== "nav" && <Gift className="h-4 w-4" />}
      {wedding.gifts.title}
    </button>
  );
}
