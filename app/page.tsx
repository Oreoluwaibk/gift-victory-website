import Link from "next/link";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/PageTransition";
import { wedding } from "@/lib/wedding-data";

export default function HomePage() {
  return (
    <main className="hero-gradient">
      <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-purple-rich">
            {wedding.hashtag}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-display text-5xl font-bold leading-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="gradient-text">{wedding.groom.shortName}</span>
            <span className="mx-3 font-light text-purple-glow">&</span>
            <span className="gradient-text">{wedding.bride.shortName}</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-6 max-w-2xl font-display text-xl text-muted-foreground sm:text-2xl">
            {wedding.groom.name} & {wedding.bride.name}
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Two hearts, one perfect love. Join us as we celebrate the beginning of
            forever — an elegant union of grace, joy, and devotion.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/rsvp"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-deep px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-deep/20 transition hover:bg-purple-rich"
            >
              <Sparkles className="h-4 w-4" />
              RSVP & Reserve Your Seat
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-sm font-semibold transition hover:border-purple-soft hover:text-purple-rich"
            >
              View Gallery
            </Link>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StaggerItem>
            <div className="card-surface h-full rounded-3xl p-6 sm:p-8">
              <Calendar className="mb-4 h-8 w-8 text-purple-rich" />
              <h2 className="font-display text-2xl font-semibold">When</h2>
              <p className="mt-2 text-muted-foreground">{wedding.dateDisplay}</p>
              <p className="mt-1 text-sm text-muted-foreground/80">
                Full date & time coming soon
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="card-surface h-full rounded-3xl p-6 sm:p-8">
              <MapPin className="mb-4 h-8 w-8 text-purple-rich" />
              <h2 className="font-display text-2xl font-semibold">Where</h2>
              <p className="mt-2 text-muted-foreground">{wedding.venue}</p>
              <Link
                href="/location"
                className="mt-4 inline-block text-sm font-semibold text-purple-rich hover:underline"
              >
                View location details →
              </Link>
            </div>
          </StaggerItem>

          <StaggerItem className="sm:col-span-2 lg:col-span-1">
            <div className="card-surface h-full rounded-3xl p-6 sm:p-8">
              <Sparkles className="mb-4 h-8 w-8 text-purple-rich" />
              <h2 className="font-display text-2xl font-semibold">Your Invitation</h2>
              <p className="mt-2 text-muted-foreground">
                RSVP to confirm your attendance and receive a personal QR pass for
                seamless entry on the day.
              </p>
              <Link
                href="/rsvp"
                className="mt-4 inline-block text-sm font-semibold text-purple-rich hover:underline"
              >
                Confirm your seat →
              </Link>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </main>
  );
}
