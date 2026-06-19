import {
  getGoogleMapsDirectionsUrl,
  getMapEmbedUrl,
  wedding,
} from "@/lib/wedding-data";

type VenueMapCardProps = {
  title: string;
  address: string;
  time: string;
  mapQuery: string;
};

function VenueMapCard({ title, address, time, mapQuery }: VenueMapCardProps) {
  const embedUrl = getMapEmbedUrl(mapQuery);
  const directionsUrl = getGoogleMapsDirectionsUrl(mapQuery);

  return (
    <div className="card-surface overflow-hidden rounded-3xl">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <p className="font-display text-xl font-semibold">{title}</p>
        <p className="mt-1 text-sm font-semibold text-purple-rich">{time}</p>
        <p className="mt-2 text-sm text-muted-foreground">{address}</p>
      </div>
      <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
        <iframe
          title={`Map for ${title}`}
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="flex justify-end border-t border-border p-4 sm:p-5">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-purple-deep px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-rich"
        >
          Get Directions
        </a>
      </div>
    </div>
  );
}

export function VenueMap() {
  const { ceremony, reception } = wedding.location;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <VenueMapCard
        title={ceremony.name}
        address={ceremony.address}
        time={ceremony.time}
        mapQuery={ceremony.mapQuery}
      />
      <VenueMapCard
        title={reception.name}
        address={reception.address}
        time={reception.time}
        mapQuery={reception.mapQuery}
      />
    </div>
  );
}
