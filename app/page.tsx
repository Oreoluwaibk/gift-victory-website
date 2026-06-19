import Link from "next/link";
import { BookHeart, Calendar, MapPin, Sparkles } from "lucide-react";
import { HomeCarousel, HomePhotoStrip } from "@/components/HomeCarousel";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/PageTransition";
import { wedding } from "@/lib/wedding-data";

export default function HomePage() {
  return (
    <main className="hero-gradient">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <FadeIn>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-purple-rich">
                {wedding.hashtag}
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-display text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                <span className="gradient-text">{wedding.groom.shortName}</span>
                <span className="mx-2 font-light text-purple-glow sm:mx-3">&</span>
                <span className="gradient-text">{wedding.bride.shortName}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-5 font-display text-xl text-muted-foreground sm:text-2xl">
                {wedding.groom.name} & {wedding.bride.name}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
                {wedding.story.intro} Join us as we celebrate a union built on
                faith, friendship, and perfect love — an unforgettable day surrounded
                by the people who mean the most to us.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/rsvp"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-deep px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-deep/20 transition hover:bg-purple-rich"
                >
                  <Sparkles className="h-4 w-4" />
                  RSVP & Reserve Your Seat
                </Link>
                <Link
                  href="/story"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold transition hover:border-purple-soft hover:text-purple-rich"
                >
                  <BookHeart className="h-4 w-4" />
                  Read Our Story
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="mx-auto w-full max-w-md lg:max-w-none">
            <HomeCarousel />
          </FadeIn>
        </div>

        <HomePhotoStrip />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem>
            <div className="card-surface h-full rounded-3xl p-6 sm:p-8">
              <BookHeart className="mb-4 h-8 w-8 text-purple-rich" />
              <h2 className="font-display text-2xl font-semibold">Our Story</h2>
              <p className="mt-2 text-muted-foreground">
                Discover how Gift & Victory met and fell in love.
              </p>
              <Link
                href="/story"
                className="mt-4 inline-block text-sm font-semibold text-purple-rich hover:underline"
              >
                Read the journey →
              </Link>
            </div>
          </StaggerItem>

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

          <StaggerItem>
            <div className="card-surface h-full rounded-3xl p-6 sm:p-8">
              <Sparkles className="mb-4 h-8 w-8 text-purple-rich" />
              <h2 className="font-display text-2xl font-semibold">RSVP</h2>
              <p className="mt-2 text-muted-foreground">
                Confirm your attendance and receive a personal QR pass for entry.
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
