# Gift & Victory

Wedding website for Gift and Victory. Guests can read the story, see the venue, browse the gallery, RSVP, and check in with a guest code. A private admin desk manages the guest list. Wedding copy and dates live in `lib/wedding-data`.

## Stack

Next.js (App Router), React, TypeScript, and Tailwind CSS. Guests and RSVPs use Supabase. Email uses Resend. QR codes are generated for check-in. The app is set up to deploy on Netlify (`netlify.toml`).

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home |
| `/story` | How they met |
| `/location` | Ceremony and reception |
| `/gallery` | Photos |
| `/rsvp` | RSVP form |
| `/check-in/[code]` | Guest check-in |
| `/admin/login`, `/admin` | Admin sign-in and the guest desk |

API routes under `app/api` handle RSVP, admin login, the guest list, and check-in.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill in the values in `.env.local` from `.env.example`. Do not commit real keys.

Open [http://localhost:3000](http://localhost:3000).
