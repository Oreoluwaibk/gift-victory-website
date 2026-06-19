import Link from "next/link";
import { Clock, ExternalLink, MapPin, Navigation2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/PageTransition";
import { VenueMap } from "@/components/VenueMap";
import { getGoogleMapsSearchUrl, wedding } from "@/lib/wedding-data";

export default function LocationPage() {
  const { ceremony, reception } = wedding.location;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-rich">
          Find Us
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
          Location
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          {wedding.eventTitle} · {wedding.dateDisplay} · {wedding.venue}
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <VenueMap />
      </FadeIn>

      <StaggerContainer className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StaggerItem>
          <div className="card-surface h-full rounded-3xl p-6">
            <MapPin className="mb-3 h-6 w-6 text-purple-rich" />
            <h2 className="font-display text-xl font-semibold">White Wedding</h2>
            <p className="mt-2 text-sm font-semibold text-purple-rich">
              {ceremony.time}
            </p>
            <p className="mt-2 text-muted-foreground">{ceremony.address}</p>
            <a
              href={getGoogleMapsSearchUrl(ceremony.mapQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-rich hover:underline"
            >
              Open in Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="card-surface h-full rounded-3xl p-6">
            <Clock className="mb-3 h-6 w-6 text-purple-rich" />
            <h2 className="font-display text-xl font-semibold">Reception</h2>
            <p className="mt-2 text-sm font-semibold text-purple-rich">
              {reception.time}
            </p>
            <p className="mt-2 text-muted-foreground">{reception.address}</p>
            <a
              href={getGoogleMapsSearchUrl(reception.mapQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-rich hover:underline"
            >
              Open in Google Maps
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </StaggerItem>

        <StaggerItem className="sm:col-span-2 lg:col-span-1">
          <div className="card-surface h-full rounded-3xl p-6">
            <Navigation2 className="mb-3 h-6 w-6 text-purple-rich" />
            <h2 className="font-display text-xl font-semibold">Getting There</h2>
            <p className="mt-2 text-muted-foreground">
              {wedding.location.parkingNotes}
            </p>
            <Link
              href="/rsvp"
              className="mt-4 inline-block text-sm font-semibold text-purple-rich hover:underline"
            >
              RSVP to confirm your seat →
            </Link>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </main>
  );
}
