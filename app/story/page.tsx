import Image from "next/image";
import Link from "next/link";
import { BookOpen, Heart } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/PageTransition";
import { wedding } from "@/lib/wedding-data";

export default function StoryPage() {
  const { story, groom, bride } = wedding;
  const { portraits, chapters } = story;

  return (
    <main>
      <section className="hero-gradient border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-rich">
              {wedding.hashtag}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              Our Story
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {story.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-12">
            <div className="relative mx-auto aspect-[21/9] max-w-4xl overflow-hidden rounded-3xl shadow-xl shadow-purple-deep/10">
              <Image
                src={portraits.together.src}
                alt={portraits.together.alt}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
                <p className="font-display text-2xl font-semibold sm:text-3xl">
                  {groom.shortName} & {bride.shortName}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <FadeIn className="mb-12 text-center">
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {story.intro}
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-3">
          <StaggerItem>
            <PortraitCard
              label="The Groom"
              name={groom.name}
              src={portraits.groom.src}
              alt={portraits.groom.alt}
            />
          </StaggerItem>
          <StaggerItem>
            <PortraitCard
              label="Together"
              name={`${groom.shortName} & ${bride.shortName}`}
              src={portraits.together.src}
              alt={portraits.together.alt}
              featured
            />
          </StaggerItem>
          <StaggerItem>
            <PortraitCard
              label="The Bride"
              name={bride.name}
              src={portraits.bride.src}
              alt={portraits.bride.alt}
            />
          </StaggerItem>
        </StaggerContainer>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <FadeIn className="mb-12 flex items-center justify-center gap-3">
            <BookOpen className="h-6 w-6 text-purple-rich" />
            <h2 className="font-display text-3xl font-bold">The Journey</h2>
          </FadeIn>

          <div className="relative space-y-0">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border sm:left-1/2 sm:-translate-x-px" />

            {chapters.map((chapter, index) => (
              <FadeIn key={chapter.title} delay={index * 0.08}>
                <div
                  className={`relative flex flex-col gap-4 pb-12 sm:flex-row sm:gap-8 ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="hidden sm:block sm:w-1/2" />
                  <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-purple-rich bg-background sm:left-1/2 sm:-translate-x-1/2">
                    <Heart className="h-4 w-4 fill-purple-rich text-purple-rich" />
                  </div>
                  <div className="card-surface ml-14 rounded-2xl p-6 sm:ml-0 sm:w-1/2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-purple-rich">
                      {chapter.year}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold">
                      {chapter.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {chapter.content}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <p className="font-display text-2xl font-semibold gradient-text sm:text-3xl">
            And so their story continues…
          </p>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            We would be honoured to have you with us as we begin this new chapter.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/rsvp"
              className="inline-flex items-center justify-center rounded-full bg-purple-deep px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-rich"
            >
              RSVP Now
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center rounded-full border border-border px-8 py-3.5 text-sm font-semibold transition hover:border-purple-soft hover:text-purple-rich"
            >
              View Gallery
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}

function PortraitCard({
  label,
  name,
  src,
  alt,
  featured = false,
}: {
  label: string;
  name: string;
  src: string;
  alt: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`card-surface overflow-hidden rounded-3xl ${
        featured ? "sm:-mt-4 sm:mb-4 ring-2 ring-purple-soft/30" : ""
      }`}
    >
      <div className={`relative ${featured ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-glow">
            {label}
          </p>
          <p className="mt-1 font-display text-lg font-semibold">{name}</p>
        </div>
      </div>
    </div>
  );
}
