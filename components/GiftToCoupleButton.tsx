"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Gift, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const openModal = () => {
    setOpen(true);
    onOpen?.();
  };

  const baseClass =
    variant === "primary"
      ? "bg-purple-deep text-white shadow-lg shadow-purple-deep/20 hover:bg-purple-rich"
      : variant === "nav"
        ? "text-muted-foreground hover:text-purple-rich"
        : "border border-border bg-card hover:border-purple-soft hover:text-purple-rich";

  const shapeClass =
    variant === "nav"
      ? "rounded-full px-4 py-2 text-sm font-medium"
      : "rounded-full px-7 py-3.5 text-sm font-semibold";

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`inline-flex items-center justify-center gap-2 transition ${shapeClass} ${baseClass} ${className}`}
      >
        {variant !== "nav" && <Gift className="h-4 w-4" />}
        {wedding.gifts.title}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
                onClick={() => setOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="card-surface relative my-auto w-full max-w-md rounded-3xl p-6 sm:p-8"
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="gift-modal-title"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition hover:border-purple-soft"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="mb-6 flex items-center gap-3 text-purple-rich">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-deep/10">
                      <Gift className="h-5 w-5" />
                    </span>
                    <div>
                      <h2
                        id="gift-modal-title"
                        className="font-display text-2xl font-semibold text-foreground"
                      >
                        {wedding.gifts.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Bank transfer details
                      </p>
                    </div>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {wedding.gifts.subtitle}
                  </p>

                  <div className="space-y-4">
                    {wedding.gifts.accounts.map((account) => (
                      <AccountCard
                        key={`${account.bank}-${account.accountNumber}`}
                        account={account}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

function AccountCard({
  account,
}: {
  account: (typeof wedding.gifts.accounts)[number];
}) {
  const [copiedField, setCopiedField] = useState<"number" | "all" | null>(null);

  const copy = async (text: string, field: "number" | "all") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const allDetails = `${account.accountNumber}\n${account.bank}\n${account.name}`;

  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-4">
      <p className="font-medium text-foreground">{account.name}</p>
      <p className="mt-1 text-sm text-muted-foreground">{account.bank}</p>

      <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-background px-4 py-3">
        <p className="font-mono text-lg font-semibold tracking-wide text-purple-rich">
          {account.accountNumber}
        </p>
        <button
          type="button"
          onClick={() => copy(account.accountNumber, "number")}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition hover:border-purple-soft hover:text-purple-rich"
        >
          {copiedField === "number" ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={() => copy(allDetails, "all")}
        className="mt-3 text-xs font-semibold text-purple-rich hover:underline"
      >
        {copiedField === "all" ? "All details copied!" : "Copy all details"}
      </button>
    </div>
  );
}
