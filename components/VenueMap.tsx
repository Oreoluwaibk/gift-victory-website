import {
  getGoogleMapsDirectionsUrl,
  getMapEmbedUrl,
  getVenueDisplayAddress,
  wedding,
} from "@/lib/wedding-data";

export function VenueMap() {
  const embedUrl = getMapEmbedUrl();
  const address = getVenueDisplayAddress();
  const directionsUrl = getGoogleMapsDirectionsUrl();

  return (
    <div className="card-surface overflow-hidden rounded-3xl">
      <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
        <iframe
          title={`Map showing ${address}`}
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="font-display text-lg font-semibold">{wedding.venue}</p>
          <p className="mt-1 text-sm text-muted-foreground">{address}</p>
          {!wedding.location.confirmed && (
            <p className="mt-1 text-xs text-purple-rich">
              Approximate area — exact venue pin will be updated soon
            </p>
          )}
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-purple-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-rich"
        >
          Get Directions
        </a>
      </div>
    </div>
  );
}
